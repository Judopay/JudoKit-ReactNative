//
//  JudoKitReactNative.m
//  JudoKitReactNative
//
//  Copyright (c) 2024 Alternative Payments Ltd
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

#import "JudoKitReactNative.h"
#import "RNApplePayWrappers.h"
#import "RNWrappers.h"
#import <JudoKit-iOS/JPError+Additions.h>
#import <JudoKit-iOS/JudoKit_iOS.h>

static NSString *kJudoPromiseRejectionCode = @"JUDO_ERROR";

typedef NS_ENUM(NSUInteger, JudoSDKInvocationType) {
    JudoSDKInvocationTypeTransaction,
    JudoSDKInvocationTypeApplePay,
    JudoSDKInvocationTypePaymentMethods,
    JudoSDKInvocationTypeTokenTransaction
};

@interface JudoKitReactNative ()

@property (nonatomic, strong) JudoKit *judoKit;
@property (nonatomic, strong) JPApiService *apiService;
@property (nonatomic, strong) JPCompletionBlock completionBlock;

@end

@implementation JudoKitReactNative
RCT_EXPORT_MODULE()

//----------------------------------------------
// MARK: - SDK Methods
//----------------------------------------------

RCT_REMAP_METHOD(isApplePayAvailableWithConfiguration,
                 properties : (NSDictionary *)properties
                     isApplePayAvailableWithResolver : (RCTPromiseResolveBlock)resolve
                         rejecter : (RCTPromiseRejectBlock)reject) {
    JPConfiguration *configuration = [RNWrappers configurationFromProperties:properties];
    NSNumber *boolValue = [NSNumber numberWithBool:[JudoKit isApplePayAvailableWithConfiguration:configuration]];
    resolve(boolValue);
}

RCT_REMAP_METHOD(invokeTransaction,
                 properties : (NSDictionary *)properties
                     invokePaymentWithResolver : (RCTPromiseResolveBlock)resolve
                         rejecter : (RCTPromiseRejectBlock)reject) {
    [self invokeSDKWithType:JudoSDKInvocationTypeTransaction
             withProperties:properties
                   resolver:resolve
                andRejecter:reject];
}

RCT_REMAP_METHOD(invokeApplePay,
                 properties : (NSDictionary *)properties
                     invokeApplePayWithResolver : (RCTPromiseResolveBlock)resolve
                         rejecter : (RCTPromiseRejectBlock)reject) {
    [self invokeSDKWithType:JudoSDKInvocationTypeApplePay
             withProperties:properties
                   resolver:resolve
                andRejecter:reject];
}

RCT_REMAP_METHOD(invokePaymentMethodScreen,
                 properties : (NSDictionary *)properties
                     invokePaymentMethodScreenWithResolver : (RCTPromiseResolveBlock)resolve
                         rejecter : (RCTPromiseRejectBlock)reject) {
    [self invokeSDKWithType:JudoSDKInvocationTypePaymentMethods
             withProperties:properties
                   resolver:resolve
                andRejecter:reject];
}

RCT_REMAP_METHOD(performTokenTransaction,
                 properties : (NSDictionary *)properties
                     performTokenTransactionWithResolver : (RCTPromiseResolveBlock)resolve
                         rejecter : (RCTPromiseRejectBlock)reject) {
    [self invokeSDKWithType:JudoSDKInvocationTypeTokenTransaction
             withProperties:properties
                   resolver:resolve
                andRejecter:reject];
}

RCT_REMAP_METHOD(fetchTransactionDetails,
                 properties : (NSDictionary *)properties
                     fetchTransactionDetailsWithResolver : (RCTPromiseResolveBlock)resolve
                         rejecter : (RCTPromiseRejectBlock)reject) {
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
        self.completionBlock = [self completionBlockWithResolve:resolve andReject:reject];

        JPConfiguration *configuration = [RNWrappers configurationFromProperties:properties];

        switch (invocationType) {
            case JudoSDKInvocationTypeTransaction: {
                JPTransactionType type = [RNWrappers transactionTypeFromProperties:properties];
                [self.judoKit invokeTransactionWithType:type
                                          configuration:configuration
                                             completion:self.completionBlock];
                break;
            }

            case JudoSDKInvocationTypeApplePay: {
                JPTransactionMode mode = [RNWrappers transactionModeFromProperties:properties];
                [self.judoKit invokeApplePayWithMode:mode
                                       configuration:configuration
                                          completion:self.completionBlock];
                break;
            }

            case JudoSDKInvocationTypePaymentMethods: {
                JPTransactionMode mode = [RNWrappers transactionModeFromProperties:properties];
                [self.judoKit invokePaymentMethodScreenWithMode:mode
                                                  configuration:configuration
                                                     completion:self.completionBlock];
                break;
            }

            case JudoSDKInvocationTypeTokenTransaction: {
                JPCardTransactionDetails *details = [self transactionDetailsFromProperties:properties];
                JPTransactionMode mode = [RNWrappers transactionModeFromProperties:properties];
                JPTransactionType type = mode == JPTransactionModePayment ? JPTransactionTypePayment : JPTransactionTypePreAuth;

                [self.judoKit invokeTokenTransactionWithType:type
                                               configuration:configuration
                                                     details:details
                                                  completion:self.completionBlock];
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

- (JPCardTransactionDetails *)transactionDetailsFromProperties:(NSDictionary *)properties {
    JPConfiguration *configuration = [RNWrappers configurationFromProperties:properties];

    JPCardTransactionDetails *details = [[JPCardTransactionDetails new] initWithConfiguration:configuration];

    details.cardToken = [RNWrappers cardTokenFromProperties:properties];
    details.securityCode = [RNWrappers securityCodeFromProperties:properties];
    details.cardholderName = [RNWrappers cardholderNameFromProperties:properties];
    details.cardType = [RNWrappers cardTypeFromProperties:properties];

    return details;
}

- (JPCompletionBlock)completionBlockWithResolve:(RCTPromiseResolveBlock)resolve
                                      andReject:(RCTPromiseRejectBlock)reject {
    return ^(JPResponse *response, NSError *error) {
        if (error) {
            if (error.code == JPError.userDidCancelError.code) {
                reject(kJudoPromiseRejectionCode, @"Transaction cancelled", error);
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

//----------------------------------------------
// MARK: - New arch turbomodule implementation
//----------------------------------------------

#ifdef RCT_NEW_ARCH_ENABLED
#import <JudoKitReactNativeSpec/JudoKitReactNativeSpec.h>
#import <React/RCTUtils.h>

@implementation JudoKitReactNative (TurboModule)

NSDictionary *buildConfigurationDict(const JS::NativeJudoKitReactNativeModule::JudoConfiguration &config) {
    NSDictionary *amount = @{
        @"value" : config.amount().value(),
        @"currency" : config.amount().currency(),
    };
    NSDictionary *reference = @{
        @"consumerReference" : config.reference().consumerReference(),
        @"paymentReference" : config.reference().paymentReference() ?: [NSNull null],
    };
    NSDictionary *cardAddress = @{
        @"line1" : config.cardAddress()->line1() ?: [NSNull null],
        @"line2" : config.cardAddress()->line2() ?: [NSNull null],
        @"line3" : config.cardAddress()->line3() ?: [NSNull null],
        @"postCode" : config.cardAddress()->postCode() ?: [NSNull null],
        @"town" : config.cardAddress()->town() ?: [NSNull null],
        @"state" : config.cardAddress()->state() ?: [NSNull null],
    };
    return @{
        @"judoId" : config.judoId(),
        @"amount" : amount,
        @"reference" : reference,
        @"cardAddress" : cardAddress,
        @"mobileNumber" : config.mobileNumber() ?: [NSNull null],
        @"phoneCountryCode" : config.phoneCountryCode() ?: [NSNull null],
        @"emailAddress" : config.emailAddress() ?: [NSNull null],
    };
}

NSDictionary *buildAuthorizationDict(const JS::NativeJudoKitReactNativeModule::JudoAuthorization &auth) {
    return @{
        @"token" : auth.token(),
        @"secret" : auth.secret() ?: [NSNull null],
        @"paymentSession" : auth.paymentSession() ?: [NSNull null],
    };
}

- (void)invokeTransaction:(JS::NativeJudoKitReactNativeModule::SpecInvokeTransactionParams &)params
                  resolve:(RCTPromiseResolveBlock)resolve
                   reject:(RCTPromiseRejectBlock)reject {
    NSDictionary *props = @{
        @"configuration" : buildConfigurationDict(params.configuration()),
        @"transactionType" : @(params.transactionType()),
        @"authorization" : buildAuthorizationDict(params.authorization()),
        @"sandboxed" : @(params.sandboxed()),
        @"packageVersion" : params.packageVersion() ?: [NSNull null],
    };
    [self invokeSDKWithType:JudoSDKInvocationTypeTransaction
             withProperties:props
                   resolver:resolve
                andRejecter:reject];
}

- (void)invokeApplePay:(JS::NativeJudoKitReactNativeModule::SpecInvokeApplePayParams &)params
               resolve:(RCTPromiseResolveBlock)resolve
                reject:(RCTPromiseRejectBlock)reject {
    NSDictionary *props = @{
        @"configuration" : buildConfigurationDict(params.configuration()),
        @"transactionMode" : @(params.transactionMode()),
        @"authorization" : buildAuthorizationDict(params.authorization()),
        @"sandboxed" : @(params.sandboxed()),
        @"packageVersion" : params.packageVersion() ?: [NSNull null],
    };
    [self invokeSDKWithType:JudoSDKInvocationTypeApplePay
             withProperties:props
                   resolver:resolve
                andRejecter:reject];
}

- (void)invokePaymentMethodScreen:(JS::NativeJudoKitReactNativeModule::SpecInvokePaymentMethodScreenParams &)params
                          resolve:(RCTPromiseResolveBlock)resolve
                           reject:(RCTPromiseRejectBlock)reject {
    NSDictionary *props = @{
        @"configuration" : buildConfigurationDict(params.configuration()),
        @"transactionMode" : @(params.transactionMode()),
        @"authorization" : buildAuthorizationDict(params.authorization()),
        @"sandboxed" : @(params.sandboxed()),
        @"packageVersion" : params.packageVersion() ?: [NSNull null],
    };
    [self invokeSDKWithType:JudoSDKInvocationTypePaymentMethods
             withProperties:props
                   resolver:resolve
                andRejecter:reject];
}

- (void)performTokenTransaction:(JS::NativeJudoKitReactNativeModule::SpecPerformTokenTransactionParams &)params
                        resolve:(RCTPromiseResolveBlock)resolve
                         reject:(RCTPromiseRejectBlock)reject {
    NSDictionary *props = @{
        @"configuration" : buildConfigurationDict(params.configuration()),
        @"transactionMode" : @(params.transactionMode()),
        @"authorization" : buildAuthorizationDict(params.authorization()),
        @"sandboxed" : @(params.sandboxed()),
        @"cardToken" : params.cardToken(),
        @"securityCode" : params.securityCode() ?: [NSNull null],
        @"cardholderName" : params.cardholderName() ?: [NSNull null],
        @"cardScheme" : params.cardScheme(),
        @"packageVersion" : params.packageVersion() ?: [NSNull null],
    };
    [self invokeSDKWithType:JudoSDKInvocationTypeTokenTransaction
             withProperties:props
                   resolver:resolve
                andRejecter:reject];
}

- (void)invokeGooglePay:(JS::NativeJudoKitReactNativeModule::SpecInvokeGooglePayParams &)params
                resolve:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject {
    NSError *error = [NSError errorWithDomain:@"JudoKitReactNative"
                                         code:0
                                     userInfo:@{NSLocalizedDescriptionKey : @"Google Pay is not supported on iOS"}];
    reject(kJudoPromiseRejectionCode, @"GOOGLE_PAY_UNSUPPORTED", error);
}

// TODO
- (void)isApplePayAvailableWithConfiguration:()
                                     resolve:(RCTPromiseResolveBlock)resolve
                                      reject:(RCTPromiseRejectBlock)reject {
    // JPConfiguration *config = [RNWrappers configurationFromProperties:configuration];
    // BOOL available = [JudoKit isApplePayAvailableWithConfiguration:config];
    BOOL available = false;
    resolve(@(available));
}

// TODO
- (void)fetchTransactionDetails:(JS::NativeJudoKitReactNativeModule::SpecFetchTransactionDetailsParams &)params
                        resolve:(RCTPromiseResolveBlock)resolve
                         reject:(RCTPromiseRejectBlock)reject {
    //    NSDictionary *props = (__bridge_transfer NSDictionary *)params.propsDict();
    //    [self fetchTransactionDetails:props
    // fetchTransactionDetailsWithResolver:resolve
    //                         rejecter:reject];
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params {
    return std::make_shared<facebook::react::NativeJudoKitReactNativeModuleSpecJSI>(params);
}

#endif
@end
