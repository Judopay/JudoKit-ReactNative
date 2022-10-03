//
//  RNWrappers.m
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

#import "RNWrappers.h"
#import "RNApplePayWrappers.h"
#import "RNPBBAWrappers.h"
#import "RNTypes.h"
#import "NSDictionary+JudoConvert.h"
#import "UIColor+RNAdditions.h"

static NSString *const kCardSchemeVISA = @"visa";
static NSString *const kCardSchemeMasterCard = @"mastercard";
static NSString *const kCardSchemeAMEX = @"amex";

@implementation RNWrappers

//---------------------------------------------------
// MARK: - Public methods
//---------------------------------------------------

+ (JudoKit *)judoSessionFromProperties:(NSDictionary *)properties {
    id<JPAuthorization> authorization = [RNWrappers authorizationFromProperties:properties];
    JudoKit *judoKit = [[JudoKit alloc] initWithAuthorization:authorization];
    judoKit.isSandboxed = [RNWrappers isSandboxedFromProperties:properties];
    return judoKit;
}

+ (JPApiService *)apiServiceFromProperties:(NSDictionary *)properties {
    BOOL isSandboxed = [RNWrappers isSandboxedFromProperties:properties];
    id<JPAuthorization> authorization = [RNWrappers authorizationFromProperties:properties];

    return [[JPApiService alloc] initWithAuthorization:authorization isSandboxed:isSandboxed];
}

+ (id<JPAuthorization>)authorizationFromProperties:(NSDictionary *)properties {
    NSDictionary *authorizationDict = [properties dictionaryForKey:@"authorization"];

    NSString *token = [authorizationDict stringForKey:@"token"];
    NSString *secret = [authorizationDict optionalStringForKey:@"secret"];
    NSString *paymentSession = [authorizationDict optionalStringForKey:@"paymentSession"];
    
    if (secret) {
        return [JPBasicAuthorization authorizationWithToken:token andSecret:secret];
    }

    return [JPSessionAuthorization authorizationWithToken:token andPaymentSession:paymentSession];
}

+ (BOOL)isSandboxedFromProperties:(NSDictionary *)properties {
    NSNumber *isSandboxed = [properties boolForKey:@"sandboxed"];
    return isSandboxed.boolValue;
}

+ (JPCardTransactionService *)cardTransactionServiceFromProperties:(NSDictionary *)properties {
    BOOL isSandboxed = [RNWrappers isSandboxedFromProperties:properties];
    id<JPAuthorization> authorization = [RNWrappers authorizationFromProperties:properties];
    JPConfiguration *configuration = [RNWrappers configurationFromProperties:properties];

    return [[JPCardTransactionService alloc] initWithAuthorization:authorization
                                                       isSandboxed:isSandboxed
                                                  andConfiguration:configuration];
}

+ (JPTransactionType)transactionTypeFromProperties:(NSDictionary *)properties {
    int type = [properties numberForKey:@"transactionType"].intValue;

    NSArray<NSNumber *> *availableTypes = @[
        @(JPTransactionTypePayment),
        @(JPTransactionTypePreAuth),
        @(JPTransactionTypeRegisterCard),
        @(JPTransactionTypeCheckCard),
        @(JPTransactionTypeSaveCard)
    ];

    return availableTypes[type].intValue;
}

+ (JPTransactionMode)transactionModeFromProperties:(NSDictionary *)properties {
    int intType = [properties numberForKey:@"transactionMode"].intValue;
    NSArray<NSNumber *> *availableModes = @[
        @(JPTransactionModePayment),
        @(JPTransactionModePreAuth),
        @(JPTransactionModeServerToServer)
    ];

    return availableModes[intType].intValue;
}

+ (JPNetworkTimeout *)networkTimeoutFromProperties:(NSDictionary *)properties {
    NSDictionary *networkTimeout = [properties optionalDictionaryForKey:@"networkTimeout"];

    if (!networkTimeout) {
        return nil;
    }

    NSTimeInterval connectTimeout = [networkTimeout numberForKey:@"connectTimeout"].doubleValue;
    NSTimeInterval readTimeout = [networkTimeout numberForKey:@"readTimeout"].doubleValue;
    NSTimeInterval writeTimeout = [networkTimeout numberForKey:@"writeTimeout"].doubleValue;

    return [[JPNetworkTimeout alloc] initWithConnectTimeout:connectTimeout
                                             andReadTimeout:readTimeout
                                            andWriteTimeout:writeTimeout];
}

+ (JPConfiguration *)configurationFromProperties:(NSDictionary *)properties {

    NSDictionary *configurationDict = [properties dictionaryForKey:@"configuration"];

    NSString *judoId = [configurationDict stringForKey:@"judoId"];
    NSNumber *isInitialRecurringPayment = [configurationDict optionalBoolForKey:@"isInitialRecurringPayment"];

    JPAmount *amount = [RNWrappers amountFromConfiguration:configurationDict];
    JPReference *reference = [RNWrappers referenceFromConfiguration:configurationDict];

    JPConfiguration *configuration = [[JPConfiguration alloc] initWithJudoID:judoId
                                                                      amount:amount
                                                                   reference:reference];

    configuration.isInitialRecurringPayment = isInitialRecurringPayment;
    configuration.uiConfiguration = [RNWrappers uiConfigurationFromConfiguration:configurationDict];
    configuration.supportedCardNetworks = [RNWrappers cardNetworksFromConfiguration:configurationDict];
    configuration.primaryAccountDetails = [RNWrappers accountDetailsFromConfiguration:configurationDict];
    configuration.cardAddress = [RNWrappers cardAddressFromConfiguration:configurationDict];
    configuration.paymentMethods = [RNWrappers paymentMethodsFromConfiguration:configurationDict];
    configuration.applePayConfiguration = [RNApplePayWrappers applePayConfigurationFromConfiguration:configurationDict];
    configuration.pbbaConfiguration = [RNPBBAWrappers pbbaConfigurationFromConfiguration:configurationDict];
    configuration.networkTimeout = [RNWrappers networkTimeoutFromProperties:configurationDict];
        
    NSString *scaExemption = [configurationDict optionalStringForKey:@"scaExemption"];
    NSString *challengeRequestIndicator = [configurationDict optionalStringForKey:@"challengeRequestIndicator"];
    NSString *mobileNumber = [configurationDict optionalStringForKey:@"mobileNumber"];
    NSString *emailAddress = [configurationDict optionalStringForKey:@"emailAddress"];
    NSString *threeDSTwoMessageVersion = [configurationDict optionalStringForKey:@"threeDSTwoMessageVersion"];
    NSNumber *threeDSTwoMaxTimeout = [configurationDict optionalNumberForKey:@"threeDSTwoMaxTimeout"];
    NSString *phoneCountryCode = [configurationDict optionalStringForKey:@"phoneCountryCode"];

    configuration.mobileNumber = mobileNumber;
    configuration.emailAddress = emailAddress;
    configuration.phoneCountryCode = phoneCountryCode;

    if (scaExemption) {
        configuration.scaExemption = scaExemption;
    }

    if (challengeRequestIndicator) {
        configuration.challengeRequestIndicator = challengeRequestIndicator;
    }
    
    if (threeDSTwoMessageVersion) {
        configuration.threeDSTwoMessageVersion = threeDSTwoMessageVersion;
    }

    if (threeDSTwoMaxTimeout) {
        configuration.threeDSTwoMaxTimeout = threeDSTwoMaxTimeout.intValue;
    }
    
    return configuration;
}

+ (JPCardNetworkType)cardNetworksFromConfiguration:(NSDictionary *)configuration {

    NSNumber *bitmask = [configuration optionalNumberForKey:@"supportedCardNetworks"];

    if (!bitmask) {
        return JPCardNetworkTypeAll;
    }

    if (BitmaskContains(bitmask.intValue, IOSCardNetworkAll)) {
        return JPCardNetworkTypeAll;
    }

    JPCardNetworkType networks = JPCardNetworkTypeUnknown;

    if (BitmaskContains(bitmask.intValue, IOSCardNetworkVisa)) {
        networks |= JPCardNetworkTypeVisa;
    }

    if (BitmaskContains(bitmask.intValue, IOSCardNetworkMastercard)) {
        networks |= JPCardNetworkTypeMasterCard;
    }

    if (BitmaskContains(bitmask.intValue, IOSCardNetworkMaestro)) {
        networks |= JPCardNetworkTypeMaestro;
    }

    if (BitmaskContains(bitmask.intValue, IOSCardNetworkAmex)) {
        networks |= JPCardNetworkTypeAMEX;
    }

    if (BitmaskContains(bitmask.intValue, IOSCardNetworkChinaUnionPay)) {
        networks |= JPCardNetworkTypeChinaUnionPay;
    }

    if (BitmaskContains(bitmask.intValue, IOSCardNetworkJCB)) {
        networks |= JPCardNetworkTypeJCB;
    }

    if (BitmaskContains(bitmask.intValue, IOSCardNetworkDiscover)) {
        networks |= JPCardNetworkTypeDiscover;
    }

    if (BitmaskContains(bitmask.intValue, IOSCardNetworkDinersClub)) {
        networks |= JPCardNetworkTypeDinersClub;
    }

    return networks;
}

+ (NSString *)cardTokenFromProperties:(NSDictionary *)properties {
    return [properties optionalStringForKey:@"cardToken"];
}

+ (NSString *)securityCodeFromProperties:(NSDictionary *)properties {
    return [properties optionalStringForKey:@"securityCode"];
}

+ (NSString *)cardholderNameFromProperties:(NSDictionary *)properties {
    return [properties optionalStringForKey:@"cardholderName"];
}

+ (NSString *)receiptIdFromProperties:(NSDictionary *)properties {
    return [properties optionalStringForKey:@"receiptId"];
}

+ (JPCardNetworkType)cardTypeFromProperties:(NSDictionary *)properties {
    NSString *cardScheme = [properties optionalStringForKey:@"cardScheme"].lowercaseString;
    
    if ([kCardSchemeVISA isEqualToString:cardScheme]) {
        return JPCardNetworkTypeVisa;
    }
    
    if ([kCardSchemeMasterCard isEqualToString:cardScheme]) {
        return JPCardNetworkTypeMasterCard;
    }
    
    if ([kCardSchemeAMEX isEqualToString:cardScheme]) {
        return JPCardNetworkTypeAMEX;
    }
    
    return JPCardNetworkTypeUnknown;
}

//---------------------------------------------------
// MARK: - Helper methods
//---------------------------------------------------

+ (JPAmount *)amountFromConfiguration:(NSDictionary *)configuration {
    NSDictionary *dictionary = [configuration dictionaryForKey:@"amount"];
    NSString *amount = [dictionary stringForKey:@"value"];
    NSString *currency = [dictionary stringForKey:@"currency"];
    return [JPAmount amount:amount currency:currency];
}

+ (JPReference *)referenceFromConfiguration:(NSDictionary *)configuration {
    NSDictionary *dictionary = [configuration dictionaryForKey:@"reference"];
    NSString *consumerReference = [dictionary stringForKey:@"consumerReference"];
    NSString *paymentReference = [dictionary stringForKey:@"paymentReference"];

    JPReference *reference = [[JPReference alloc] initWithConsumerReference:consumerReference
                                                           paymentReference:paymentReference];

    reference.metaData = [dictionary optionalDictionaryForKey:@"metadata"];
    return reference;
}

+ (NSArray<JPPaymentMethod *> *)paymentMethodsFromConfiguration:(NSDictionary *)configuration {
    NSNumber *bitmask = [configuration optionalNumberForKey:@"paymentMethods"];

    if (!bitmask) {
        return @[JPPaymentMethod.card, JPPaymentMethod.applePay, JPPaymentMethod.iDeal, JPPaymentMethod.pbba];
    }

    if (BitmaskContains(bitmask.intValue, IOSPaymentMethodAll)) {
        return @[JPPaymentMethod.card, JPPaymentMethod.applePay, JPPaymentMethod.iDeal, JPPaymentMethod.pbba];
    }

    NSMutableArray<JPPaymentMethod *> *paymentMethods = [NSMutableArray new];

    if (BitmaskContains(bitmask.intValue, IOSPaymentMethodCard)) {
        [paymentMethods addObject:JPPaymentMethod.card];
    }

    if (BitmaskContains(bitmask.intValue, IOSPaymentMethodApplePay)) {
        [paymentMethods addObject:JPPaymentMethod.applePay];
    }

    if (BitmaskContains(bitmask.intValue, IOSPaymentMethodIDEAL)) {
        [paymentMethods addObject:JPPaymentMethod.iDeal];
    }

    if (BitmaskContains(bitmask.intValue, IOSPaymentMethodPBBA)) {
        [paymentMethods addObject:JPPaymentMethod.pbba];
    }

    return paymentMethods;
}

+ (JPAddress *)cardAddressFromConfiguration:(NSDictionary *)configuration {
    NSDictionary *addressDictionary = [configuration optionalDictionaryForKey:@"cardAddress"];

    if (!addressDictionary) {
        return nil;
    }
    
    return [[JPAddress alloc] initWithAddress1:[addressDictionary optionalStringForKey:@"line1"]
                                      address2:[addressDictionary optionalStringForKey:@"line2"]
                                      address3:[addressDictionary optionalStringForKey:@"line3"]
                                          town:[addressDictionary optionalStringForKey:@"town"]
                                      postCode:[addressDictionary optionalStringForKey:@"postCode"]
                                   countryCode:[addressDictionary optionalNumberForKey:@"countryCode"]];
}

+ (JPUIConfiguration *)uiConfigurationFromConfiguration:(NSDictionary *)configuration {
    JPUIConfiguration *uiConfiguration = [JPUIConfiguration new];

    NSDictionary *dictionary = [configuration optionalDictionaryForKey:@"uiConfiguration"];

    if (!dictionary) {
        // Keep the default configurations
        return uiConfiguration;
    }

    NSNumber *isAVSEnabled = [dictionary boolForKey:@"isAVSEnabled"];
    NSNumber *shouldDisplayAmount = [dictionary boolForKey:@"shouldPaymentMethodsDisplayAmount"];
    NSNumber *isPayButtonAmountVisible = [dictionary boolForKey:@"shouldPaymentButtonDisplayAmount"];
    NSNumber *isSecureCodeCheckEnabled = [dictionary boolForKey:@"shouldPaymentMethodsVerifySecurityCode"];
    NSNumber *shouldAskForBillingInformation = [dictionary optionalBoolForKey:@"shouldAskForBillingInformation"];
    
    uiConfiguration.isAVSEnabled = isAVSEnabled.boolValue;
    uiConfiguration.shouldPaymentMethodsDisplayAmount = shouldDisplayAmount.boolValue;
    uiConfiguration.shouldPaymentButtonDisplayAmount = isPayButtonAmountVisible.boolValue;
    uiConfiguration.shouldPaymentMethodsVerifySecurityCode = isSecureCodeCheckEnabled.boolValue;
    
    if (shouldAskForBillingInformation) {
        uiConfiguration.shouldAskForBillingInformation = shouldAskForBillingInformation.boolValue;
    }
    
    uiConfiguration.theme = [self themeFromUIConfiguration:dictionary];

    return uiConfiguration;
}

+ (JPTheme *)themeFromUIConfiguration:(NSDictionary *)uiConfiguration {
    JPTheme *theme = [JPTheme new];

    NSDictionary *dictionary = [uiConfiguration optionalDictionaryForKey:@"theme"];

    if (!dictionary) {
        return theme;
    }

    theme.largeTitle = [UIFont fontWithName:[dictionary stringForKey:@"largeTitleFont"]
                                       size:[[dictionary numberForKey:@"largeTitleSize"] doubleValue]];

    theme.title = [UIFont fontWithName:[dictionary stringForKey:@"titleFont"]
                                  size:[[dictionary numberForKey:@"titleSize"] doubleValue]];

    theme.headline = [UIFont fontWithName:[dictionary stringForKey:@"headlineFont"]
                                     size:[[dictionary numberForKey:@"headlineSize"] doubleValue]];

    theme.headlineLight = [UIFont fontWithName:[dictionary stringForKey:@"headlineLightFont"]
                                          size:[[dictionary numberForKey:@"headlineLightSize"] doubleValue]];

    theme.body = [UIFont fontWithName:[dictionary stringForKey:@"bodyFont"]
                                 size:[[dictionary numberForKey:@"bodySize"] doubleValue]];

    theme.bodyBold = [UIFont fontWithName:[dictionary stringForKey:@"bodyBoldFont"]
                                     size:[[dictionary numberForKey:@"bodyBoldSize"] doubleValue]];

    theme.caption = [UIFont fontWithName:[dictionary stringForKey:@"captionFont"]
                                    size:[[dictionary numberForKey:@"captionSize"] doubleValue]];

    theme.captionBold = [UIFont fontWithName:[dictionary stringForKey:@"captionBoldFont"]
                                        size:[[dictionary numberForKey:@"captionBoldSize"] doubleValue]];

    theme.jpBlackColor = [UIColor colorFromHexString:[dictionary hexColorForKey:@"jpBlackColor"]];
    theme.jpDarkGrayColor = [UIColor colorFromHexString:[dictionary hexColorForKey:@"jpDarkGrayColor"]];
    theme.jpGrayColor = [UIColor colorFromHexString:[dictionary hexColorForKey:@"jpGrayColor"]];
    theme.jpLightGrayColor = [UIColor colorFromHexString:[dictionary hexColorForKey:@"jpLightGrayColor"]];
    theme.jpRedColor = [UIColor colorFromHexString:[dictionary hexColorForKey:@"jpRedColor"]];
    theme.jpWhiteColor = [UIColor colorFromHexString:[dictionary hexColorForKey:@"jpWhiteColor"]];
    theme.buttonColor = [UIColor colorFromHexString:[dictionary hexColorForKey:@"buttonColor"]];
    theme.buttonTitleColor = [UIColor colorFromHexString:[dictionary hexColorForKey:@"buttonTitleColor"]];
    theme.backButtonImage = [UIImage imageNamed:[dictionary stringForKey:@"backButtonImage"]];
    theme.buttonCornerRadius = [[dictionary numberForKey:@"buttonCornerRadius"] doubleValue];

    return theme;
}

+ (JPPrimaryAccountDetails *)accountDetailsFromConfiguration:(NSDictionary *)configuration {
    NSDictionary *accountDetailsDictionary = [configuration optionalDictionaryForKey:@"primaryAccountDetails"];

    if (!accountDetailsDictionary) {
        return nil;
    }

    JPPrimaryAccountDetails *details = [JPPrimaryAccountDetails new];
    details.name = [accountDetailsDictionary optionalStringForKey:@"name"];
    details.accountNumber = [accountDetailsDictionary optionalStringForKey:@"accountNumber"];
    details.dateOfBirth = [accountDetailsDictionary optionalStringForKey:@"dateOfBirth"];
    details.postCode = [accountDetailsDictionary optionalStringForKey:@"postCode"];

    return details;
}

+ (NSDictionary *)dictionaryFromResponse:(JPResponse *)response {

    NSMutableDictionary *mappedResponse = [NSMutableDictionary new];

    // TODO: remove this ASAP when this https://github.com/Judopay/JudoKit-ReactNative/pull/138
    // will go to master (mimics the android wrapper behaviour: https://github.com/Judopay/JudoKit-ReactNative/blob/master/android/src/main/java/com/reactlibrary/Helpers.kt#L57)
    NSNumber *result = @0;
    if (response.result == JPTransactionResultDeclined) {
        result = @1;
    }
    
    NSNumber *type = @0;

    switch (response.type) {
        case JPTransactionTypePreAuth:
            type = @1;
            break;
        case JPTransactionTypeCheckCard:
            type = @3;
            break;
        case JPTransactionTypeSaveCard:
            type = @4;
            break;
        default:
            break;
    }
    
    [mappedResponse setValue:response.receiptId forKey:@"receiptId"];
    [mappedResponse setValue:response.paymentReference forKey:@"yourPaymentReference"];
    [mappedResponse setValue:type forKey:@"type"];
    [mappedResponse setValue:response.createdAt forKey:@"createdAt"];
    [mappedResponse setValue:result forKey:@"result"];
    [mappedResponse setValue:response.message forKey:@"message"];
    [mappedResponse setValue:response.judoId forKey:@"judoId"];
    [mappedResponse setValue:response.merchantName forKey:@"merchantName"];
    [mappedResponse setValue:response.appearsOnStatementAs forKey:@"appearsOnStatementAs"];
    [mappedResponse setValue:response.originalAmount forKey:@"originalAmount"];
    [mappedResponse setValue:response.netAmount forKey:@"netAmount"];
    [mappedResponse setValue:response.amount.amount forKey:@"amount"];
    [mappedResponse setValue:response.amount.currency forKey:@"currency"];

    NSMutableDictionary *cardDetailsResponse = [NSMutableDictionary new];
    [cardDetailsResponse setValue:response.cardDetails.cardLastFour forKey:@"cardLastFour"];
    [cardDetailsResponse setValue:response.cardDetails.endDate forKey:@"endDate"];
    [cardDetailsResponse setValue:response.cardDetails.cardToken forKey:@"cardToken"];
    [cardDetailsResponse setValue:@(response.cardDetails.cardNetwork) forKey:@"cardNetwork"];
    [cardDetailsResponse setValue:response.cardDetails.bank forKey:@"bank"];
    [cardDetailsResponse setValue:response.cardDetails.cardCategory forKey:@"cardCategory"];
    [cardDetailsResponse setValue:response.cardDetails.cardCountry forKey:@"cardCountry"];
    [cardDetailsResponse setValue:response.cardDetails.cardFunding forKey:@"cardFunding"];
    [cardDetailsResponse setValue:response.cardDetails.cardScheme forKey:@"cardScheme"];

    [mappedResponse setValue:cardDetailsResponse forKey:@"cardDetails"];

    NSMutableDictionary *consumerResponse = [NSMutableDictionary new];
    [consumerResponse setValue:response.consumer.consumerToken forKey:@"consumerToken"];
    [consumerResponse setValue:response.consumer.consumerReference forKey:@"consumerReference"];

    [mappedResponse setValue:consumerResponse forKey:@"consumerResponse"];

    NSMutableDictionary *orderDetailsResponse = [NSMutableDictionary new];
    [orderDetailsResponse setValue:response.orderDetails.orderId forKey:@"orderId"];
    [orderDetailsResponse setValue:response.orderDetails.orderStatus forKey:@"orderStatus"];
    [orderDetailsResponse setValue:response.orderDetails.orderFailureReason forKey:@"orderFailureReason"];
    [orderDetailsResponse setValue:response.orderDetails.timestamp forKey:@"timestamp"];
    [orderDetailsResponse setValue:@(response.orderDetails.amount) forKey:@"amount"];

    [mappedResponse setValue:orderDetailsResponse forKey:@"orderDetails"];

    return mappedResponse;
}

@end
