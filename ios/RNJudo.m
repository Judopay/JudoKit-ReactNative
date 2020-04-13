//
//  RNJudo.m
//  JudoPay
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

#import "RNJudo.h"
#import "RNWrappers.h"
#import "RNApplePayWrappers.h"

#import <React/RCTConvert.h>
#import <JudoKitObjC/JudoKitObjC.h>

@implementation RNJudo

RCT_EXPORT_MODULE();

//----------------------------------------------
// MARK: - SDK Methods
//----------------------------------------------

RCT_REMAP_METHOD(invokeTransaction,
                 properties:(NSDictionary *)properties
                 invokePaymentWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
    
    JudoKit *judoKit = [RNWrappers judoSessionFromProperties:properties];
    TransactionType type = [RNWrappers transactionTypeFromProperties:properties];
    JPConfiguration *configuration = [RNWrappers configurationFromProperties:properties];
    
    [judoKit invokeTransactionWithType:type
                         configuration:configuration
                            completion:^(JPResponse *response, NSError *error) {
        if (error) {
            reject(@"JUDO_ERROR", @"Transaction failed", error);
            return;
        }
        resolve(response);
    }];
}

RCT_REMAP_METHOD(invokeApplePay,
                 properties:(NSDictionary *)properties
                 invokeApplePayWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
    
    JudoKit *judoKit = [RNWrappers judoSessionFromProperties:properties];
    TransactionMode mode = [RNWrappers transactionModeFromProperties:properties];
    JPConfiguration *configuration = [RNWrappers configurationFromProperties:properties];
    
    [judoKit invokeApplePayWithMode:mode
                      configuration:configuration
                         completion:^(JPResponse *response, NSError *error) {
        if (error) {
            reject(@"JUDO_ERROR", @"Transaction failed", error);
            return;
        }
        resolve(response);
    }];
}

RCT_REMAP_METHOD(invokePaymentMethodScreen,
                 properties:(NSDictionary *)properties
                 invokePaymentMethodScreenWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
    
    JudoKit *judoKit = [RNWrappers judoSessionFromProperties:properties];
    TransactionMode mode = [RNWrappers transactionModeFromProperties:properties];
    JPConfiguration *configuration = [RNWrappers configurationFromProperties:properties];
    
    [judoKit invokePaymentMethodScreenWithMode:mode
                                 configuration:configuration
                                    completion:^(JPResponse *response, NSError *error) {
        if (error) {
            reject(@"JUDO_ERROR", @"Transaction failed", error);
            return;
        }
        resolve(response);
    }];
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
