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

// TODO: Add as part of JudoKit_iOS on the native side
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

@implementation RNJudo

RCT_EXPORT_MODULE();

//----------------------------------------------
// MARK: - SDK Methods
//----------------------------------------------

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

- (void)invokeSDKWithType:(JudoSDKInvocationType)invocationType
           withProperties:(NSDictionary *)properties
                 resolver:(RCTPromiseResolveBlock)resolve
              andRejecter:(RCTPromiseRejectBlock)reject {
    @try {
        JudoKit *judoKit = [RNWrappers judoSessionFromProperties:properties];
        JPConfiguration *configuration = [RNWrappers configurationFromProperties:properties];
        JPCompletionBlock completion = ^(JPResponse *response, NSError *error) {
            if (error) {
                
                if (error.code == JPError.judoUserDidCancelError.code) {
                    reject(kJudoPromiseRejectionCode, @"Transaction cancelled",  error);
                    return;
                }
                
                reject(kJudoPromiseRejectionCode, @"Transaction failed",  error);
            } else {
                NSDictionary *mappedResponse = [self dictionaryFromResponse:response];
                resolve(mappedResponse);
            }
        };

        switch (invocationType) {
            case JudoSDKInvocationTypeTransaction: {
                JPTransactionType type = [RNWrappers transactionTypeFromProperties:properties];
                [judoKit invokeTransactionWithType:type configuration:configuration completion:completion];
                break;
            }
                
            case JudoSDKInvocationTypeApplePay: {
                JPTransactionMode mode = [RNWrappers transactionModeFromProperties:properties];
                [judoKit invokeApplePayWithMode:mode configuration:configuration completion:completion];
                break;
            }

            case JudoSDKInvocationTypePBBA: {
                [judoKit invokePBBAWithConfiguration:configuration completion:completion];
                break;
            }
                
            case JudoSDKInvocationTypePaymentMethods: {
                JPTransactionMode mode = [RNWrappers transactionModeFromProperties:properties];
                [judoKit invokePaymentMethodScreenWithMode:mode configuration:configuration completion:completion];
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

- (NSDictionary *)dictionaryFromResponse:(JPResponse *)response {
    
    JPTransactionData *data = response.items.firstObject;
    
    return @{
        @"receiptId": data.receiptId,
        @"yourPaymentReference": data.paymentReference,
        @"createdAt": data.createdAt,
        @"merchantName": data.merchantName,
        @"appearsOnStatementAs": data.appearsOnStatementAs,
        @"originalAmount": data.originalAmount,
        @"netAmount": data.netAmount,
        @"amount": data.amount.amount,
        @"currency": data.amount.currency,
        @"cardDetails": @{
                @"cardLastFour": data.cardDetails.cardLastFour,
                @"endDate": data.cardDetails.endDate,
                @"cardToken": data.cardDetails.cardToken,
                @"cardCountry": data.cardDetails.cardCountry,
                @"bank": data.cardDetails.bank,
                @"cardScheme": data.cardDetails.cardScheme
        },
        @"consumer": @{
                @"consumerToken": data.consumer.consumerToken,
                @"consumerReference": data.consumer.consumerReference,
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
