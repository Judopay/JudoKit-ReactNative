#import "RNJudo.h"
#import "JudoKitObjC.h"
#import <PassKit/PassKit.h>
#import <React/RCTConvert.h>

@interface RNJudo()

@property (nonatomic, strong) NSString *token;
@property (nonatomic, strong) NSString *secret;
@property (nonatomic, strong) NSString *judoId;
@property (nonatomic, strong) NSString *siteId;
@property BOOL isSandbox;
@property (nonatomic, strong) NSString *amount;
@property (nonatomic, strong) NSString *currency;
@property (nonatomic, strong) NSString *consumerReference;
@property (nonatomic, strong) NSString *paymentReference;
@property (nonatomic, strong) NSDictionary *metaData;
@property (nonatomic, strong) JPTheme *theme;

@property (nonatomic, strong) RCTPromiseResolveBlock applePayResolve;
@property (nonatomic, strong) RCTPromiseRejectBlock applePayReject;

@end

@implementation RNJudo

RCT_EXPORT_MODULE();

+ (BOOL)requiresMainQueueSetup
{
    return YES;
}

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}

RCT_REMAP_METHOD(makePayment,
                 options:(NSDictionary *)options
                 makePaymentWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
    if (![self initWithOptions:options reject:reject]) {
        return;
    }

    JudoKit *judoKit = [self judoKit];
    JPAmount *judoAmount = [[JPAmount alloc] initWithAmount:self.amount currency:self.currency];
    JPReference *judoReference = [self generateReferenceWith:self.consumerReference
                                            paymentReference:self.paymentReference
                                                    metaData:self.metaData];

    [judoKit invokePayment:self.judoId
                    amount:judoAmount
                 reference:judoReference
               cardDetails:nil
                completion:[self paymentCompletion:judoKit reject:reject resolve:resolve]];
}

RCT_REMAP_METHOD(makePreAuth,
                 options:(NSDictionary *)options
                 makePreAuthWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
    if (![self initWithOptions:options reject:reject]) {
        return;
    }

    JudoKit *judoKit = [self judoKit];
    JPAmount *judoAmount = [[JPAmount alloc] initWithAmount:self.amount currency:self.currency];
    JPReference *judoReference = [self generateReferenceWith:self.consumerReference
                                            paymentReference:self.paymentReference
                                                    metaData:self.metaData];

    [judoKit invokePreAuth:self.judoId
                    amount:judoAmount
                 reference:judoReference
               cardDetails:nil
                completion:[self paymentCompletion:judoKit reject:reject resolve:resolve]];
}

RCT_REMAP_METHOD(canUseApplePay,
                 canUseApplePayResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
    BOOL canUse = [PKPaymentAuthorizationViewController canMakePaymentsUsingNetworks:@[PKPaymentNetworkAmex, PKPaymentNetworkMasterCard, PKPaymentNetworkVisa]];
    resolve([NSNumber numberWithBool:canUse]);
}

RCT_REMAP_METHOD(makeApplePayPayment,
                 options:(NSDictionary *)options
                 makeApplePayPaymentWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
    if (![self initWithOptions:options reject:reject]) {
        return;
    }

    JudoKit *judoKit = [self judoKit];
    PaymentMethods paymentMethod = PaymentMethodApplePay;
    ApplePayConfiguration *applePayConfiguration = [self appleConfigWith:paymentMethod
                                                                     and:options];

    [judoKit invokeApplePayWithConfiguration: applePayConfiguration
                                  completion: [self paymentCompletion:judoKit reject:reject resolve:resolve]];
}

RCT_REMAP_METHOD(showPaymentMethods,
                 options:(NSDictionary *)options
                 showPaymentMethodsResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
    if (![self initWithOptions:options reject:reject]) {
        return;
    }

    JudoKit *judoKit = [self judoKit];
    JPAmount *judoAmount = [[JPAmount alloc] initWithAmount:self.amount currency:self.currency];
    PaymentMethods paymentMethods = [RCTConvert NSInteger:options[@"paymentMethods"]];
    ApplePayConfiguration *applePayConfiguration = [self appleConfigWith:paymentMethods and:options];

    [judoKit invokePayment:self.judoId
                    siteId:self.siteId
                    amount:judoAmount
         consumerReference:self.consumerReference
            paymentMethods:paymentMethods
   applePayConfiguratation:applePayConfiguration
               cardDetails:nil
                completion:[self paymentCompletion:judoKit reject:reject resolve:resolve]];
}

RCT_REMAP_METHOD(makeIDEALPayment,
                 options:(NSDictionary *)options
                 makeIDEALPaymentResolver:(RCTPromiseResolveBlock)resolve
                 erejecter:(RCTPromiseRejectBlock)reject) {
    if (![self initWithOptions:options reject:reject]) {
        return;
    }

    JudoKit *judoKit = [self judoKit];
    JPAmount *judoAmount = [[JPAmount alloc] initWithAmount:self.amount currency:self.currency];
    JPReference *judoReference = [self generateReferenceWith:self.consumerReference
                                            paymentReference:self.paymentReference
                                                    metaData:self.metaData];

    [judoKit invokeIDEALPaymentWithSiteId:self.siteId
                                   amount:judoAmount
                                reference:judoReference
                               completion:^(JPResponse *response, NSError *error) {
        [judoKit.activeViewController dismissViewControllerAnimated:true completion:nil];
        if (error) {
            if (error.domain == JudoErrorDomain && error.code == JudoErrorUserDidCancel) {
                reject(@"JUDO_USER_CANCELLED", @"User cancelled", nil);
            } else {
                reject(@"JUDO_ERROR", error.localizedDescription, error);
            }
        } else if (response.items.count == 1) {
            NSDictionary *orderDetails = response.items[0].rawData[@"orderDetails"];
            resolve(orderDetails);
        } else {
            resolve([NSNull null]);
        }
    }];
}

- (JudoKit *)judoKit {
    JudoKit *judoKit = [[JudoKit alloc] initWithToken:self.token secret:self.secret];
    judoKit.apiSession.sandboxed = self.isSandbox;
    judoKit.theme = self.theme;
    return judoKit;
}

- (JPReference *)generateReferenceWith:(NSString *)consumerReference
                      paymentReference:(NSString *)paymentReference
                              metaData:(NSDictionary *)metaData {
    JPReference *judoReference = [[JPReference alloc] initWithConsumerReference:consumerReference
                                                               paymentReference:paymentReference];
    [judoReference setMetaData:metaData];
    return judoReference;
}

- (ApplePayConfiguration *)appleConfigWith:(PaymentMethods)paymentMethod
                                       and:(NSDictionary *)options {
    ApplePayConfiguration *applePayConfiguration = nil;
    if (paymentMethod == PaymentMethodApplePay || paymentMethod == PaymentMethodsAll) {
        NSMutableArray<PaymentSummaryItem *> *paymentSummaryItems = [NSMutableArray new];
        for (NSDictionary *dict in options[@"summaryItems"]) {
            [paymentSummaryItems addObject: [[PaymentSummaryItem alloc] initWithLabel:dict[@"label"]
                                                                               amount:[NSDecimalNumber decimalNumberWithString: dict[@"amount"]]]];
        }

        NSMutableArray<PaymentShippingMethod *> *shippingMethods = [NSMutableArray new];
        for (NSDictionary *dict in options[@"shippingMethods"]) {
            PaymentSummaryItemType itemType = [RCTConvert NSInteger:options[@"paymentSummaryItemType"]];
            [shippingMethods addObject: [[PaymentShippingMethod alloc] initWithIdentifier:dict[@"identifier"]
                                                                                   detail:dict[@"detail"]
                                                                                    label:dict[@"label"]
                                                                                   amount:[NSDecimalNumber decimalNumberWithString: dict[@"amount"]]
                                                                                     type:itemType]];
        }

        JPReference *judoReference = [self generateReferenceWith:self.consumerReference
                                                paymentReference:self.paymentReference
                                                        metaData:self.metaData];

        applePayConfiguration = [[ApplePayConfiguration alloc] initWithJudoId:self.judoId
                                                                    reference:judoReference
                                                                   merchantId:[RCTConvert NSString:options[@"merchantId"]]
                                                                     currency:self.currency
                                                                  countryCode:[RCTConvert NSString:options[@"countryCode"]]
                                                          paymentSummaryItems:paymentSummaryItems];
        applePayConfiguration.transactionType = [RCTConvert NSInteger:options[@"transactionType"]];
        applePayConfiguration.shippingMethods = shippingMethods;
        applePayConfiguration.shippingType = [RCTConvert NSInteger:options[@"shippingType"]];

        BOOL requireBillingDetails = [RCTConvert BOOL:options[@"requireBillingDetails"]];
        if (requireBillingDetails) {
            applePayConfiguration.requiredBillingContactFields = ContactFieldAll;
            applePayConfiguration.returnedContactInfo = ReturnedInfoBillingContacts;
        }
        BOOL requireShippingDetails = [RCTConvert BOOL:options[@"requireShippingDetails"]];
        if (requireShippingDetails) {
            applePayConfiguration.requiredShippingContactFields = ContactFieldAll;
            applePayConfiguration.returnedContactInfo += ReturnedInfoShippingContacts;
        }
    }
    return applePayConfiguration;
}

- (BOOL)initWithOptions:(NSDictionary *)options
                 reject:(RCTPromiseRejectBlock)reject {
    self.token = [RCTConvert NSString:options[@"token"]];
    self.secret = [RCTConvert NSString:options[@"secret"]];
    self.judoId = [RCTConvert NSString:options[@"judoId"]];
    self.siteId = [RCTConvert NSString:options[@"siteId"]];
    self.isSandbox = [RCTConvert BOOL:options[@"isSandbox"]];
    self.amount = [RCTConvert NSString:options[@"amount"]];
    self.currency = [RCTConvert NSString:options[@"currency"]];
    self.consumerReference = [RCTConvert NSString:options[@"consumerReference"]];
    self.paymentReference = [RCTConvert NSString:options[@"paymentReference"]];
    self.metaData = [RCTConvert NSDictionary:options[@"metaData"]];

    if ([self.token length] == 0 || [self.secret length] == 0 || [self.judoId length] < 9 || [self.amount length] == 0 || [self.currency length] == 0 || [self.consumerReference length] == 0 || [self.paymentReference length] == 0) {
        reject(@"JUDO_ERROR", @"Configuration error", nil);
        return NO;
    }

    NSDictionary *themeDict = [RCTConvert NSDictionary:options[@"theme"]];
    if (themeDict) {
        JPTheme *theme = [[JPTheme alloc] init];
        // acceptedCardNetworks
        theme.tintColor = [RCTConvert UIColor:themeDict[@"tintColor"]];
        theme.avsEnabled = [RCTConvert BOOL:themeDict[@"avsEnabled"]];
        theme.showSecurityMessage = [RCTConvert BOOL:themeDict[@"showSecurityMessage"]];
        theme.paymentButtonTitle = [RCTConvert NSString:themeDict[@"paymentButtonTitle"]];
        // registerCardButtonTitle
        // registerCardNavBarButtonTitle
        theme.backButtonTitle = [RCTConvert NSString:themeDict[@"backButtonTitle"]];
        theme.paymentTitle = [RCTConvert NSString:themeDict[@"paymentTitle"]];
        // registerCardTitle
        // checkCardTitle
        // refundTitle
        // authenticationTitle
        // loadingIndicatorRegisterCardTitle
        theme.loadingIndicatorProcessingTitle = [RCTConvert NSString:themeDict[@"loadingIndicatorProcessingTitle"]];
        // redirecting3DSTitle
        // verifying3DSPaymentTitle
        // verifying3DSRegisterCardTitle
        theme.inputFieldHeight = [RCTConvert CGFloat:themeDict[@"inputFieldHeight"]];
        theme.securityMessageString = [RCTConvert NSString:themeDict[@"securityMessageString"]];
        theme.securityMessageTextSize = [RCTConvert CGFloat:themeDict[@"securityMessageTextSize"]];
        theme.judoTextColor = [RCTConvert UIColor:themeDict[@"textColor"]];
        theme.judoNavigationBarTitleColor = [RCTConvert UIColor:themeDict[@"navigationBarTitleColor"]];
        theme.judoInputFieldTextColor = [RCTConvert UIColor:themeDict[@"inputFieldTextColor"]];
        //theme.judoPlaceholderTextColor = [RCTConvert UIColor:themeDict[@"placeholderTextColor"]]; // Doesn't seem to work
        //theme.judoInputFieldBorderColor = [RCTConvert UIColor:themeDict[@"inputFieldBorderColor"]]; // Doesn't seem to work
        theme.judoContentViewBackgroundColor = [RCTConvert UIColor:themeDict[@"contentViewBackgroundColor"]];
        theme.judoButtonColor = [RCTConvert UIColor:themeDict[@"buttonColor"]];
        theme.judoButtonTitleColor = [RCTConvert UIColor:themeDict[@"buttonTitleColor"]];
        theme.judoLoadingBackgroundColor = [RCTConvert UIColor:themeDict[@"loadingBackgroundColor"]];
        theme.judoErrorColor = [RCTConvert UIColor:themeDict[@"errorColor"]];
        theme.judoLoadingBlockViewColor = [RCTConvert UIColor:themeDict[@"loadingBlockViewColor"]];
        theme.judoInputFieldBackgroundColor = [RCTConvert UIColor:themeDict[@"inputFieldBackgroundColor"]];
        theme.buttonCornerRadius = [RCTConvert CGFloat:themeDict[@"buttonCornerRadius"]]; // Only on "Payment Method" screen
        theme.buttonHeight = [RCTConvert CGFloat:themeDict[@"buttonHeight"]];
        theme.buttonsSpacing = [RCTConvert CGFloat:themeDict[@"buttonSpacing"]]; // Only on "Payment Method" screen
        self.theme = theme;
    }
    return YES;
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
