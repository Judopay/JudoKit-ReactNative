#import "RNJudo.h"
#import "JudoKitObjC.h"

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
    NSString *token = options[@"token"];
    NSString *secret = options[@"secret"];
    NSString *judoId = options[@"judoId"];
    BOOL isSandbox = options[@"isSandbox"];
    NSString *amount = options[@"amount"];
    NSString *currency = options[@"currency"];
    NSString *consumerReference = options[@"consumerReference"];

    JudoKit *judoKit = [[JudoKit alloc] initWithToken:token secret:secret];
    judoKit.apiSession.sandboxed = isSandbox;
    JPAmount *judoAmount = [[JPAmount alloc] initWithAmount:amount currency:currency];
    JPReference *judoReference = [[JPReference alloc] initWithConsumerReference:consumerReference];

    [judoKit invokePayment:judoId amount:judoAmount reference:judoReference cardDetails:nil completion:[self paymentCompletion:judoKit reject:reject resolve:resolve]];
}

RCT_REMAP_METHOD(makePreAuth,
                 options:(NSDictionary *)options
                 makePreAuthWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    NSString *token = options[@"token"];
    NSString *secret = options[@"secret"];
    NSString *judoId = options[@"judoId"];
    BOOL isSandbox = options[@"isSandbox"];
    NSString *amount = options[@"amount"];
    NSString *currency = options[@"currency"];
    NSString *consumerReference = options[@"consumerReference"];

    JudoKit *judoKit = [[JudoKit alloc] initWithToken:token secret:secret];
    judoKit.apiSession.sandboxed = isSandbox;
    JPAmount *judoAmount = [[JPAmount alloc] initWithAmount:amount currency:currency];
    JPReference *judoReference = [[JPReference alloc] initWithConsumerReference:consumerReference];

    [judoKit invokePreAuth:judoId amount:judoAmount reference:judoReference cardDetails:nil completion:[self paymentCompletion:judoKit reject:reject resolve:resolve]];
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
