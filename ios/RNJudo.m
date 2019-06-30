#import "RNJudo.h"
#import "JudoKitObjC.h"
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

RCT_REMAP_METHOD(makeApplePayPayment,
                 options:(NSDictionary *)options
                 makeApplePayPaymentWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    [self initWithOptions:options];

    NSString *merchantIdentifier = [RCTConvert NSString:options[@"merchantId"]];
    NSString *countryCode = [RCTConvert NSString:options[@"countryCode"]];
    NSString *summaryLabel = [RCTConvert NSString:options[@"summaryLabel"]];
    self.isApplePayPayment = [RCTConvert BOOL:options[@"isPayment"]];

    PKPaymentRequest *paymentRequest = [PKPaymentRequest new];
    paymentRequest.merchantIdentifier = merchantIdentifier;
    paymentRequest.countryCode = countryCode;
    paymentRequest.currencyCode = self.currency;
    paymentRequest.supportedNetworks = @[PKPaymentNetworkAmex, PKPaymentNetworkMasterCard, PKPaymentNetworkVisa];
    paymentRequest.merchantCapabilities = PKMerchantCapability3DS;
    paymentRequest.paymentSummaryItems = @[[PKPaymentSummaryItem summaryItemWithLabel:summaryLabel amount:[NSDecimalNumber decimalNumberWithString:self.amount]]];

    PKPaymentAuthorizationViewController *paymentAuthorizationViewController = [[PKPaymentAuthorizationViewController alloc] initWithPaymentRequest:paymentRequest];
    paymentAuthorizationViewController.delegate = self;

    self.applePayResolve = resolve;
    self.applePayReject = reject;

    UIViewController *rootViewController = UIApplication.sharedApplication.keyWindow.rootViewController;
    [rootViewController presentViewController:paymentAuthorizationViewController animated:YES completion:nil];
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

#pragma mark - PKPaymentAuthorizationViewControllerDelegate

- (void)paymentAuthorizationViewController:(PKPaymentAuthorizationViewController *)controller didAuthorizePayment:(PKPayment *)payment handler:(nonnull void (^)(PKPaymentAuthorizationResult * _Nonnull))completion {
    JudoKit *judoKit = [[JudoKit alloc] initWithToken:self.token secret:self.secret];
    judoKit.apiSession.sandboxed = self.isSandbox;
    JPAmount *judoAmount = [[JPAmount alloc] initWithAmount:self.amount currency:self.currency];
    JPReference *judoReference = [[JPReference alloc] initWithConsumerReference:self.consumerReference];
    JPTransaction *transaction = nil;

    if (self.isApplePayPayment) {
        transaction = [judoKit paymentWithJudoId:self.judoId amount:judoAmount reference:judoReference];
    } else {
        transaction = [judoKit preAuthWithJudoId:self.judoId amount:judoAmount reference:judoReference];
    }

    NSError *error;
    [transaction setPkPayment:payment error:&error];
    [transaction sendWithCompletion:^(JPResponse * response, NSError * error) {
        if (error || response.items.count == 0) {
            completion([[PKPaymentAuthorizationResult alloc] initWithStatus:PKPaymentAuthorizationStatusFailure errors:@[error]]);
            self.applePayReject(@"JUDO_ERROR", error.localizedDescription, error);
        } else {
            completion([[PKPaymentAuthorizationResult alloc] initWithStatus:PKPaymentAuthorizationStatusSuccess errors:nil]);
            self.applePayResolve(response.items[0].rawData);
        }
        self.applePayResolve = nil;
        self.applePayReject = nil;
        [controller dismissViewControllerAnimated:YES completion:nil];
    }];
}

- (void)paymentAuthorizationViewControllerDidFinish:(PKPaymentAuthorizationViewController *)controller {
    [controller dismissViewControllerAnimated:YES completion:nil];
}

@end
