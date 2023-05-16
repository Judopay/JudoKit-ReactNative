//
//  RNJudo.m
//  RNJudo
//
//  Copyright (c) 2020 Alternative Payments Ltd
//
//  Permission is hereby granted, free of charge, to any person obtaining a copy
//  of this software and associated documentation files (the "Software"), to deal
//  in the Software without restriction, including without limitation the rights
//  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
//  copies of the Software, and to permit persons to whom the Software is
//  furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in all
//  copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
//  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
//  SOFTWARE.

#import <JudoKit-iOS/JudoKit_iOS.h>
#import <JudoKit-iOS/JPError+Additions.h>

#import "RNJudo.h"
#import "RNWrappers.h"
#import "RNApplePayWrappers.h"

static NSString *kJudoPromiseRejectionCode = @"JUDO_ERROR";

typedef NS_ENUM(NSUInteger, JudoSDKInvocationType) {
    JudoSDKInvocationTypeTransaction,
    JudoSDKInvocationTypeApplePay,
    JudoSDKInvocationTypePBBA,
    JudoSDKInvocationTypePaymentMethods
};

@interface RNJudo ()

@property (nonatomic, strong) JudoKit *judoKit;
@property (nonatomic, strong) JPApiService *apiService;
@property (nonatomic, strong) JPCardTransactionService *transactionService;
@property (nonatomic, strong) JPCompletionBlock completionBlock;

@end

@implementation RNJudo

RCT_EXPORT_MODULE();

//----------------------------------------------
// MARK: - SDK Methods
//----------------------------------------------

RCT_REMAP_METHOD(isBankingAppAvailable,
                 isBankingAppAvailableWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
    NSNumber *boolValue = [NSNumber numberWithBool:[JudoKit isBankingAppAvailable]];
    resolve(boolValue);
}

RCT_REMAP_METHOD(isApplePayAvailableWithConfiguration,
                 properties:(NSDictionary *)properties
                 isApplePayAvailableWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
    JPConfiguration *configuration = [RNWrappers configurationFromProperties:properties];
    NSNumber *boolValue = [NSNumber numberWithBool:[JudoKit isApplePayAvailableWithConfiguration:configuration]];
    resolve(boolValue);
}

RCT_REMAP_METHOD(invokeTransaction,
                 properties:(NSDictionary *)properties
                 invokePaymentWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
    [self invokeSDKWithType:JudoSDKInvocationTypeTransaction withProperties:properties resolver:resolve andRejecter:reject];
}

RCT_REMAP_METHOD(invokeApplePay,
                 properties:(NSDictionary *)properties
                 invokeApplePayWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
    [self invokeSDKWithType:JudoSDKInvocationTypeApplePay withProperties:properties resolver:resolve andRejecter:reject];
}

RCT_REMAP_METHOD(invokePayByBankApp,
                 properties:(NSDictionary *)properties
                 invokePayByBankAppWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
    [self invokeSDKWithType:JudoSDKInvocationTypePBBA withProperties:properties resolver:resolve andRejecter:reject];
}

RCT_REMAP_METHOD(invokePaymentMethodScreen,
                 properties:(NSDictionary *)properties
                 invokePaymentMethodScreenWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
    [self invokeSDKWithType:JudoSDKInvocationTypePaymentMethods withProperties:properties resolver:resolve andRejecter:reject];
}

RCT_REMAP_METHOD(performTokenTransaction,
                 properties:(NSDictionary *)properties
                 performTokenTransactionWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {

    self.transactionService = [RNWrappers cardTransactionServiceFromProperties:properties];
    self.completionBlock = [self completionBlockWithResolve:resolve andReject:reject];

    JPTransactionMode transactionMode = [RNWrappers transactionModeFromProperties:properties];
    JPConfiguration *configuration = [RNWrappers configurationFromProperties:properties];
    
    JPCardTransactionDetails *details = [[JPCardTransactionDetails new] initWithConfiguration:configuration];
    details.cardToken = [RNWrappers cardTokenFromProperties:properties];
    details.secureCode = [RNWrappers securityCodeFromProperties:properties];
    details.cardholderName = [RNWrappers cardholderNameFromProperties:properties];
    details.cardType = [RNWrappers cardTypeFromProperties:properties];
    
    if (transactionMode == JPTransactionModePreAuth) {
        [self.transactionService invokePreAuthTokenPaymentWithDetails:details andCompletion:self.completionBlock];
        return;
    }

    [self.transactionService invokeTokenPaymentWithDetails:details andCompletion:self.completionBlock];
}

RCT_REMAP_METHOD(fetchTransactionDetails,
                 properties:(NSDictionary *)properties
                 fetchTransactionDetailsWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
    @try {
        self.apiService = [RNWrappers apiServiceFromProperties:properties];
        self.completionBlock = [self completionBlockWithResolve:resolve andReject:reject];

        NSString *receiptId = [RNWrappers receiptIdFromProperties:properties];

        [self.apiService fetchTransactionWithReceiptId:receiptId completion:self.completionBlock];
    } @catch (NSException *exception) {
        NSError *error = [[NSError alloc] initWithDomain:RNJudoErrorDomain
                                                    code:0
                                                userInfo:exception.userInfo];
        reject(kJudoPromiseRejectionCode, exception.reason, error);
    }
}

//----------------------------------------------
// MARK: - Helper methods
//----------------------------------------------

- (void)invokeSDKWithType:(JudoSDKInvocationType)invocationType
           withProperties:(NSDictionary *)properties
                 resolver:(RCTPromiseResolveBlock)resolve
              andRejecter:(RCTPromiseRejectBlock)reject {
    @try {
        self.judoKit = [RNWrappers judoSessionFromProperties:properties];
        JPSubProductInfo *subProductInfo = [JPSubProductInfo initWithSubProductType:JPSubProductTypeReactNative andVersion:RNJudoKitVersion];
        [self.judoKit setSubProductInfo:subProductInfo];
        self.completionBlock = [self completionBlockWithResolve:resolve andReject:reject];

        JPConfiguration *configuration = [RNWrappers configurationFromProperties:properties];

        switch (invocationType) {
            case JudoSDKInvocationTypeTransaction: {
                JPTransactionType type = [RNWrappers transactionTypeFromProperties:properties];
                [self.judoKit invokeTransactionWithType:type configuration:configuration completion:self.completionBlock];
                break;
            }

            case JudoSDKInvocationTypeApplePay: {
                JPTransactionMode mode = [RNWrappers transactionModeFromProperties:properties];
                [self.judoKit invokeApplePayWithMode:mode configuration:configuration completion:self.completionBlock];
                break;
            }

            case JudoSDKInvocationTypePBBA: {
                [self.judoKit invokePBBAWithConfiguration:configuration completion:self.completionBlock];
                break;
            }

            case JudoSDKInvocationTypePaymentMethods: {
                JPTransactionMode mode = [RNWrappers transactionModeFromProperties:properties];
                [self.judoKit invokePaymentMethodScreenWithMode:mode configuration:configuration completion:self.completionBlock];
                break;
            }

            default:
                @throw [NSException exceptionWithName:NSInvalidArgumentException
                                               reason:@"Unsupported invocation type."
                                             userInfo:nil];
        }
    } @catch (NSException *exception) {
        NSError *error = [[NSError alloc] initWithDomain:RNJudoErrorDomain
                                                    code:0
                                                userInfo:exception.userInfo];
        reject(kJudoPromiseRejectionCode, exception.reason, error);
    }
}

- (JPCompletionBlock)completionBlockWithResolve:(RCTPromiseResolveBlock)resolve
                                      andReject:(RCTPromiseRejectBlock)reject {
    return ^(JPResponse *response, NSError *error) {
        if (error) {
            if (error.code == JPError.userDidCancelError.code) {
                reject(kJudoPromiseRejectionCode, @"Transaction cancelled",  error);
                return;
            }
            
            NSString *description = error.userInfo[NSLocalizedDescriptionKey];
            NSString *message = @"Transaction failed";
            
            if (description && description.length > 0) {
                message = description;
            }
            
            // TODO: RCTJSErrorFromCodeMessageAndNSError expects an NSError instane in userInfo[NSUnderlyingErrorKey]
            // which in case of a 3DS SDK error is a NSString ('JP3DSSDKRuntimeException') - so it crashes
            // ! this should be fixed in JudoKit-iOS, and the folowing workaround removed ASAP
            NSMutableDictionary *userInfo = [NSMutableDictionary dictionaryWithDictionary:error.userInfo];
            [userInfo removeObjectForKey:NSUnderlyingErrorKey];
            NSError *myError = [[NSError alloc] initWithDomain:error.domain
                                                          code:error.code
                                                      userInfo:[NSDictionary dictionaryWithDictionary:userInfo]];
            
            
            reject(kJudoPromiseRejectionCode, message, myError);
        } else {
            NSDictionary *mappedResponse = [RNWrappers dictionaryFromResponse:response];
            resolve(mappedResponse);
        }
    };
}

//----------------------------------------------
// MARK: - React Native methods
//----------------------------------------------

- (dispatch_queue_t)methodQueue {
    return dispatch_get_main_queue();
}

+ (BOOL)requiresMainQueueSetup {
    return YES;
}

@end
