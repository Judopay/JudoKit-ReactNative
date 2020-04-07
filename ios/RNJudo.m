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
#import <React/RCTConvert.h>
#import <JudoKitObjC/JudoKitObjC.h>

@implementation RNJudo

RCT_EXPORT_MODULE();

// MARK: - SDK Methods

RCT_REMAP_METHOD(invokeTransaction,
                 properties:(NSDictionary *)properties
                 invokePaymentWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {

  JudoKit *judoKit = [self judoSessionFromProperties:properties];
  JPConfiguration *configuration = [self configurationFromProperties:properties];

  [judoKit invokeTransactionWithType:TransactionTypePayment
                       configuration:configuration
                          completion:^(JPResponse *response, NSError *error) {
    if (error) {
      reject(@"JUDO_ERROR", @"Transaction failed", error);
      return;
    }
    resolve(response);
  }];
}

// MARK: - Getters

- (JudoKit *)judoSessionFromProperties:(NSDictionary *)properties {
  NSString *token = [RCTConvert NSString:properties[@"token"]];
  NSString *secret = [RCTConvert NSString:properties[@"secret"]];
  BOOL isSandboxed = [RCTConvert BOOL:properties[@"sandboxed"]];

  JudoKit *judoKit = [[JudoKit alloc] initWithToken:token secret:secret];
  judoKit.isSandboxed = isSandboxed;

  return judoKit;
}

- (JPAmount *)amountFromProperties:(NSDictionary *)properties {
  NSDictionary *amountDictionary = [RCTConvert NSDictionary:properties[@"amount"]];
  NSString *amount = amountDictionary[@"value"];
  NSString *currency = amountDictionary[@"currency"];
  return [JPAmount amount:amount currency:currency];
}

- (JPReference *)referenceFromProperties:(NSDictionary *)properties {
  NSDictionary *referenceDictionary = [RCTConvert NSDictionary:properties[@"reference"]];
  NSString *consumerReference = referenceDictionary[@"consumerReference"];
  NSString *paymentReference = referenceDictionary[@"paymentReference"];
  NSDictionary *metadata = referenceDictionary[@"metadata"];

  JPReference *reference = [[JPReference alloc] initWithConsumerReference:consumerReference
                                                 paymentReference:paymentReference];
  reference.metaData = metadata;
  return reference;
}

- (JPConfiguration *)configurationFromProperties:(NSDictionary *)properties {

  NSDictionary *configurationDict = properties[@"configuration"];

  NSString *judoId = [RCTConvert NSString:configurationDict[@"judoId"]];
  NSString *siteId = [RCTConvert NSString:configurationDict[@"siteId"]];
  
  JPAmount *amount = [self amountFromProperties:configurationDict];
  JPReference *reference = [self referenceFromProperties:configurationDict];

  JPConfiguration *configuration = [[JPConfiguration alloc] initWithJudoID:judoId
                                                                    amount:amount
                                                                 reference:reference];

  configuration.siteId = siteId;

  // TODO: Map optional configuration properties

  return configuration;
}

// MARK: - React Native methods

- (dispatch_queue_t)methodQueue {
  return dispatch_get_main_queue();
}

+ (BOOL)requiresMainQueueSetup {
  return YES;
}

@end
