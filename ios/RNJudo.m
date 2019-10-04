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
@property (nonatomic, strong) NSString *paymentReference;
@property (nonatomic, strong) NSDictionary *metaData;

@property (nonatomic, strong) RCTPromiseResolveBlock applePayResolve;
@property (nonatomic, strong) RCTPromiseRejectBlock applePayReject;

typedef enum PaymentType : NSUInteger {
   Payment,
   PreAuth,
} PaymentType;

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

    JudoKit *judoKit = [self judoKit];
    JPAmount *judoAmount = [[JPAmount alloc] initWithAmount:self.amount currency:self.currency];
    JPReference *judoReference = [self generateReferenceWith:self.consumerReference
                                            paymentReference:self.paymentReference
                                                    metaData:self.metaData];

    [judoKit invokePayment:self.judoId amount:judoAmount
                 reference:judoReference
               cardDetails:nil completion:[self paymentCompletion:judoKit reject:reject resolve:resolve]];
}

RCT_REMAP_METHOD(makePreAuth,
                 options:(NSDictionary *)options
                 makePreAuthWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    [self initWithOptions:options];

    JudoKit *judoKit = [self judoKit];
    JPAmount *judoAmount = [[JPAmount alloc] initWithAmount:self.amount currency:self.currency];
    JPReference *judoReference = [self generateReferenceWith:self.consumerReference
                                            paymentReference:self.paymentReference
                                                    metaData:self.metaData];

    [judoKit invokePreAuth:self.judoId
                    amount:judoAmount reference:judoReference
               cardDetails:nil
                completion:[self paymentCompletion:judoKit reject:reject resolve:resolve]];
}

RCT_REMAP_METHOD(canUseApplePay,
                 canUseApplePayResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    BOOL canUse = [PKPaymentAuthorizationViewController canMakePaymentsUsingNetworks:@[PKPaymentNetworkAmex, PKPaymentNetworkMasterCard, PKPaymentNetworkVisa]];
    resolve([NSNumber numberWithBool:canUse]);
}

RCT_REMAP_METHOD(makeNativePayment,
                 options:(NSDictionary *)options
                 makeNativePaymentWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    [self initWithOptions:options];

    JudoKit *judoKit = [self judoKit];
    PaymentMethods paymentMethod = PaymentMethodApplePay;
    ApplePayConfiguration *applePayConfiguration = [self appleConfigWith: paymentMethod and: options];

    [judoKit invokeApplePayWithConfiguration: applePayConfiguration
                                  completion: [self paymentCompletion:judoKit reject:reject resolve:resolve]];
}

RCT_REMAP_METHOD(showPaymentMethods,
                 options:(NSDictionary *)options
                 showPaymentMethodsResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    [self initWithOptions:options];

    PaymentMethods paymentMethod = [RCTConvert NSUInteger:options[@"paymentMethods"]];
    JudoKit *judoKit = [self judoKit];
    ApplePayConfiguration *applePayConfiguration = [self appleConfigWith: paymentMethod and: options];
    JPAmount *judoAmount = [[JPAmount alloc] initWithAmount:self.amount currency:self.currency];
    
    [judoKit invokePayment:self.judoId
                    amount:judoAmount
         consumerReference:self.consumerReference
            paymentMethods:paymentMethod
   applePayConfiguratation:applePayConfiguration
               cardDetails:nil
                completion:[self paymentCompletion:judoKit reject:reject resolve:resolve]];
}

- (JudoKit *) judoKit
{
    JudoKit *judoKit = [[JudoKit alloc] initWithToken:self.token secret:self.secret];
    judoKit.apiSession.sandboxed = self.isSandbox;
    return judoKit;
}

- (JPReference *) generateReferenceWith:(NSString *) consumerReference
                       paymentReference:(NSString *) paymentReference
                               metaData:(NSDictionary *) metaData
{
    JPReference *judoReference = [[JPReference alloc] initWithConsumerReference:consumerReference
                                                               paymentReference:paymentReference];
    [judoReference setMetaData:metaData];
    return judoReference;
}

- (ApplePayConfiguration *) appleConfigWith:(PaymentMethods) paymentMethod
                                        and:(NSDictionary *)options
{
    ApplePayConfiguration *applePayConfiguration = nil;
    if (paymentMethod == PaymentMethodApplePay || paymentMethod == PaymentMethodsAll) {
      PaymentShippingType paymentShippingType = [RCTConvert NSInteger:options[@"paymentShippingType"]];
      TransactionType transactionType = [RCTConvert NSInteger:options[@"transactionType"]];
      NSString *countryCode = [RCTConvert NSString:options[@"countryCode"]];
      NSString *merchantIdentifier = [RCTConvert NSString:options[@"merchantId"]];

      NSMutableArray<PaymentSummaryItem *> * paymentSummaryItems = [NSMutableArray new];
      for (NSDictionary *dict in options[@"paymentSummaryItems"]) {
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

      applePayConfiguration = [[ApplePayConfiguration alloc] initWithJudoId:self.judoId
                                                                  reference:self.consumerReference
                                                                 merchantId:merchantIdentifier
                                                                   currency:self.currency
                                                                countryCode:countryCode
                                                        paymentSummaryItems:paymentSummaryItems];
      applePayConfiguration.transactionType = transactionType;
      applePayConfiguration.shippingType = paymentShippingType;
      applePayConfiguration.requiredShippingContactFields = ContactFieldAll;
      applePayConfiguration.requiredBillingContactFields = ContactFieldAll;
      applePayConfiguration.returnedContactInfo = ReturnedInfoAll;
      applePayConfiguration.shippingMethods = shippingMethods;
    }
    return applePayConfiguration;
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
    self.paymentReference = [RCTConvert NSString:options[@"paymentReference"]];
    self.metaData = [RCTConvert NSDictionary:options[@"metaData"]];
}

- (void (^)(JPResponse *, NSError *))paymentCompletion:(JudoKit *)judoKit
                                                reject:(RCTPromiseRejectBlock)reject
                                               resolve:(RCTPromiseResolveBlock)resolve {
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
