#import "RNJudo.h"
#import "JudoKitObjC.h"
#import <PassKit/PassKit.h>
#import <React/RCTConvert.h>

@interface RNJudo() <PKPaymentAuthorizationViewControllerDelegate>

@property (nonatomic, strong) NSString *token;
@property (nonatomic, strong) NSString *secret;
@property (nonatomic, strong) NSString *judoId;
@property BOOL isSandbox;
@property (nonatomic, strong) NSString *amount;
@property (nonatomic, strong) NSString *currency;
@property (nonatomic, strong) NSString *consumerReference;

@property BOOL isApplePayPayment;
@property (nonatomic, strong) RCTPromiseResolveBlock applePayResolve;
@property (nonatomic, strong) RCTPromiseRejectBlock applePayReject;

@end

@implementation RNJudo

RCT_EXPORT_MODULE();

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}

RCT_REMAP_METHOD(makePayment,
                 options:(NSDictionary *)options
                 makePaymentWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    [self initWithOptions:options];

    JudoKit *judoKit = [[JudoKit alloc] initWithToken:self.token secret:self.secret];
    judoKit.apiSession.sandboxed = self.isSandbox;
    JPAmount *judoAmount = [[JPAmount alloc] initWithAmount:self.amount currency:self.currency];
    JPReference *judoReference = [[JPReference alloc] initWithConsumerReference:self.consumerReference];

    [judoKit invokePayment:self.judoId amount:judoAmount reference:judoReference cardDetails:nil completion:[self paymentCompletion:judoKit reject:reject resolve:resolve]];
}

RCT_REMAP_METHOD(makePreAuth,
                 options:(NSDictionary *)options
                 makePreAuthWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    [self initWithOptions:options];

    JudoKit *judoKit = [[JudoKit alloc] initWithToken:self.token secret:self.secret];
    judoKit.apiSession.sandboxed = self.isSandbox;
    JPAmount *judoAmount = [[JPAmount alloc] initWithAmount:self.amount currency:self.currency];
    JPReference *judoReference = [[JPReference alloc] initWithConsumerReference:self.consumerReference];

    [judoKit invokePreAuth:self.judoId amount:judoAmount reference:judoReference cardDetails:nil completion:[self paymentCompletion:judoKit reject:reject resolve:resolve]];
}

RCT_REMAP_METHOD(canUseApplePay,
                 canUseApplePayResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    BOOL canUse = [PKPaymentAuthorizationViewController canMakePaymentsUsingNetworks:@[PKPaymentNetworkAmex, PKPaymentNetworkMasterCard, PKPaymentNetworkVisa]];
    resolve([NSNumber numberWithBool:canUse]);
}

RCT_REMAP_METHOD(makeNativePayPayment,
                 options:(NSDictionary *)options
                 makeNativeApplePayPaymentWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
  [self initWithOptions:options];

  NSString *merchantIdentifier = [RCTConvert NSString:options[@"merchantId"]];
  NSString *countryCode = [RCTConvert NSString:options[@"countryCode"]];
  TransactionType transactionType = [RCTConvert NSInteger:options[@"transactionType"]];
  PaymentShippingType paymentShippingType = [RCTConvert NSInteger:options[@"paymentShippingType"]];

  NSMutableArray<PaymentSummaryItem *> * paymentSummaryItems = [NSMutableArray new];
  for (NSDictionary *dict in options[@"paymentSummaryItems"]) {
    [paymentSummaryItems addObject: [[PaymentSummaryItem alloc] initWithLabel:dict[@"label"]
                                                                       amount: [NSDecimalNumber decimalNumberWithString: dict[@"amount"]]]];
  }

  NSMutableArray<PaymentShippingMethod *> * shippingMethods = [NSMutableArray new];
  for (NSDictionary *dict in options[@"paymentShippingMethods"]) {
    PaymentSummaryItemType itemType = [RCTConvert NSInteger:options[@"paymentSummaryItemType"]];
    [shippingMethods addObject: [[PaymentShippingMethod alloc] initWithIdentifier:dict[@"identifier"]
                                                                           detail:dict[@"detail"]
                                                                            label:dict[@"label"]
                                                                           amount:[NSDecimalNumber decimalNumberWithString: dict[@"amount"]]
                                                                             type:itemType]];
  }

  JudoKit *judoKit = [[JudoKit alloc] initWithToken:self.token secret:self.secret];
  ApplePayConfiguration *applePayConfiguration = [[ApplePayConfiguration alloc] initWithJudoId: self.judoId
                                                                                     reference: self.consumerReference
                                                                                    merchantId: merchantIdentifier
                                                                                      currency: self.currency
                                                                                   countryCode: countryCode
                                                                           paymentSummaryItems: paymentSummaryItems];
  applePayConfiguration.transactionType = transactionType;
  applePayConfiguration.shippingType = paymentShippingType;
  applePayConfiguration.requiredShippingContactFields = ContactFieldAll;
  applePayConfiguration.requiredBillingContactFields = ContactFieldAll;
  applePayConfiguration.returnedContactInfo = ReturnedInfoAll;
  applePayConfiguration.shippingMethods = shippingMethods;

  [judoKit invokeApplePayWithConfiguration: applePayConfiguration
                                completion: [self paymentCompletion:judoKit reject:reject resolve:resolve]];
}

RCT_REMAP_METHOD(makeApplePayPayment,
                 options:(NSDictionary *)options
                 makeApplePayPaymentWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
  [self initWithOptions:options];

  NSString *merchantIdentifier = [RCTConvert NSString:options[@"merchantId"]];
  NSString *countryCode = [RCTConvert NSString:options[@"countryCode"]];
  TransactionType transactionType = [RCTConvert NSInteger:options[@"transactionType"]];
  PaymentShippingType paymentShippingType = [RCTConvert NSInteger:options[@"paymentShippingType"]];
  NSMutableArray<PaymentSummaryItem *> * paymentSummaryItems = [NSMutableArray new];
  for (NSDictionary *dict in options[@"paymentShippingMethods"]) {
    [paymentSummaryItems addObject: [[PaymentSummaryItem alloc] initWithLabel:dict[@"label"]
                                                                       amount:[NSDecimalNumber decimalNumberWithString: dict[@"amount"]]]];
  }

  NSMutableArray<PaymentShippingMethod *> * shippingMethods = [NSMutableArray new];
  for (NSDictionary *dict in options[@"paymentShippingMethods"]) {
    PaymentSummaryItemType itemType = [RCTConvert NSInteger:options[@"paymentSummaryItemType"]];
    [shippingMethods addObject: [[PaymentShippingMethod alloc] initWithIdentifier:dict[@"identifier"]
                                                                           detail:dict[@"detail"]
                                                                            label:dict[@"label"]
                                                                           amount:[NSDecimalNumber decimalNumberWithString: dict[@"amount"]]
                                                                             type:itemType]];
  }

  JudoKit *judoKit = [[JudoKit alloc] initWithToken:self.token secret:self.secret];
  judoKit.apiSession.sandboxed = self.isSandbox;
  JPAmount *judoAmount = [[JPAmount alloc] initWithAmount:self.amount currency:self.currency];
  JPReference *judoReference = [[JPReference alloc] initWithConsumerReference:self.consumerReference];
  ApplePayConfiguration *applePayConfiguration = [[ApplePayConfiguration alloc] initWithJudoId: self.judoId
                                                                                     reference: self.consumerReference
                                                                                    merchantId: merchantIdentifier
                                                                                      currency: self.currency
                                                                                   countryCode: countryCode
                                                                           paymentSummaryItems: paymentSummaryItems];
  applePayConfiguration.transactionType = transactionType;
  applePayConfiguration.shippingType = paymentShippingType;
  applePayConfiguration.requiredShippingContactFields = ContactFieldAll;
  applePayConfiguration.requiredBillingContactFields = ContactFieldAll;
  applePayConfiguration.returnedContactInfo = ReturnedInfoAll;
  applePayConfiguration.shippingMethods = shippingMethods;

  [judoKit invokePayment: self.judoId
           amount: judoAmount
           consumerReference: judoReference
           paymentMethods: PaymentMethodApplePay
           applePayConfiguratation: applePayConfiguration
           cardDetails: nil
           completion:[self paymentCompletion:judoKit reject:reject resolve:resolve]];
}

- (void)initWithOptions:(NSDictionary *)options
{
    self.token = [RCTConvert NSString:options[@"token"]];
    self.secret = [RCTConvert NSString:options[@"secret"]];
    self.judoId = [RCTConvert NSString:options[@"judoId"]];
    self.isSandbox = [RCTConvert BOOL:options[@"isSandbox"]];
    self.amount = [RCTConvert NSString:options[@"amount"]];
    self.currency = [RCTConvert NSString:options[@"currency"]];
    self.consumerReference = [RCTConvert NSString:options[@"consumerReference"]];
}

- (void (^)(JPResponse *, NSError *))paymentCompletion:(JudoKit *)judoKit reject:(RCTPromiseRejectBlock)reject resolve:(RCTPromiseResolveBlock)resolve {
    return ^(JPResponse *response, NSError *error) {
        [judoKit.activeViewController dismissViewControllerAnimated:true completion:nil];
        if (error) {
            if (error.domain == JudoErrorDomain && error.code == JudoErrorUserDidCancel) {
                reject(@"JUDO_USER_CANCELLED", @"User cancelled", nil);
            } else {
                reject(@"JUDO_ERROR", error.localizedDescription, error);
            }
        } else if (response.items.count == 1) {
            resolve(response.items[0].rawData);
        } else {
            resolve([NSNull null]);
        }
    };
}
@end
