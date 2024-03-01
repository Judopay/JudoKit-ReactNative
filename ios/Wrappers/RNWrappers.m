//
//  RNWrappers.m
//  JudoKitReactNative
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
#import "NSDictionary+JudoConvert.h"
#import "RNApplePayWrappers.h"
#import "RNTypes.h"
#import "UIColor+RNAdditions.h"
#import <Judo3DS2_iOS/Judo3DS2_iOS.h>

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
    judoKit.subProductInfo = [RNWrappers subProductInfoFromProperties:properties];

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

+ (JPSubProductInfo *)subProductInfoFromProperties:(NSDictionary *)properties {
    NSString *version = [properties optionalStringForKey:@"packageVersion"];
    ;
    return [[JPSubProductInfo alloc] initWithSubProductType:JPSubProductTypeReactNative andVersion:version];
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

    switch (type) {
        case 1:
            return JPTransactionTypePayment;
        case 2:
            return JPTransactionTypePreAuth;
        case 3:
            return JPTransactionTypeRegisterCard;
        case 4:
            return JPTransactionTypeCheckCard;
        case 5:
            return JPTransactionTypeSaveCard;
        default:
            return JPTransactionTypeUnknown;
    }
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
    NSNumber *isDelayedAuthorisation = [configurationDict optionalBoolForKey:@"isDelayedAuthorisation"];

    JPAmount *amount = [RNWrappers amountFromConfiguration:configurationDict];
    JPReference *reference = [RNWrappers referenceFromConfiguration:configurationDict];

    JPConfiguration *configuration = [[JPConfiguration alloc] initWithJudoID:judoId
                                                                      amount:amount
                                                                   reference:reference];

    if (isInitialRecurringPayment) {
        configuration.isInitialRecurringPayment = isInitialRecurringPayment.boolValue;
    }

    if (isDelayedAuthorisation) {
        configuration.isDelayedAuthorisation = isDelayedAuthorisation.boolValue;
    }

    configuration.uiConfiguration = [RNWrappers uiConfigurationFromConfiguration:configurationDict];
    configuration.supportedCardNetworks = [RNWrappers cardNetworksFromConfiguration:configurationDict];
    configuration.primaryAccountDetails = [RNWrappers accountDetailsFromConfiguration:configurationDict];
    configuration.cardAddress = [RNWrappers cardAddressFromConfiguration:configurationDict];
    configuration.paymentMethods = [RNWrappers paymentMethodsFromConfiguration:configurationDict];
    configuration.applePayConfiguration = [RNApplePayWrappers applePayConfigurationFromConfiguration:configurationDict];
    configuration.networkTimeout = [RNWrappers networkTimeoutFromProperties:configurationDict];
    configuration.recommendationConfiguration = [RNWrappers recommendationConfigurationFromConfiguration:configurationDict];

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

    if ([cardScheme containsString:kCardSchemeVISA]) {
        return JPCardNetworkTypeVisa;
    }

    if ([cardScheme containsString:kCardSchemeMasterCard]) {
        return JPCardNetworkTypeMasterCard;
    }

    if ([cardScheme containsString:kCardSchemeAMEX]) {
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
        return @[ JPPaymentMethod.card, JPPaymentMethod.applePay, JPPaymentMethod.iDeal ];
    }

    if (BitmaskContains(bitmask.intValue, IOSPaymentMethodAll)) {
        return @[ JPPaymentMethod.card, JPPaymentMethod.applePay, JPPaymentMethod.iDeal ];
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
                                   countryCode:[addressDictionary optionalNumberForKey:@"countryCode"]
                                         state:[addressDictionary optionalStringForKey:@"state"]];
}

+ (JPUIConfiguration *)uiConfigurationFromConfiguration:(NSDictionary *)configuration {
    JPUIConfiguration *uiConfiguration = [JPUIConfiguration new];

    NSDictionary *dictionary = [configuration optionalDictionaryForKey:@"uiConfiguration"];

    if (!dictionary) {
        // Keep the default configurations
        return uiConfiguration;
    }

    NSNumber *isAVSEnabled = [dictionary optionalBoolForKey:@"isAVSEnabled"];
    NSNumber *shouldDisplayAmount = [dictionary optionalBoolForKey:@"shouldPaymentMethodsDisplayAmount"];
    NSNumber *isPayButtonAmountVisible = [dictionary optionalBoolForKey:@"shouldPaymentButtonDisplayAmount"];
    NSNumber *isSecureCodeCheckEnabled = [dictionary optionalBoolForKey:@"shouldPaymentMethodsVerifySecurityCode"];
    NSNumber *shouldAskForBillingInformation = [dictionary optionalBoolForKey:@"shouldAskForBillingInformation"];
    NSNumber *shouldAskForCSC = [dictionary optionalBoolForKey:@"shouldAskForCSC"];
    NSNumber *shouldAskForCardholderName = [dictionary optionalBoolForKey:@"shouldAskForCardholderName"];

    if (isAVSEnabled) {
        uiConfiguration.isAVSEnabled = isAVSEnabled.boolValue;
    }

    if (shouldDisplayAmount) {
        uiConfiguration.shouldPaymentMethodsDisplayAmount = shouldDisplayAmount.boolValue;
    }

    if (isPayButtonAmountVisible) {
        uiConfiguration.shouldPaymentButtonDisplayAmount = isPayButtonAmountVisible.boolValue;
    }

    if (isSecureCodeCheckEnabled) {
        uiConfiguration.shouldPaymentMethodsVerifySecurityCode = isSecureCodeCheckEnabled.boolValue;
    }

    if (shouldAskForBillingInformation) {
        uiConfiguration.shouldAskForBillingInformation = shouldAskForBillingInformation.boolValue;
    }

    if (shouldAskForCSC) {
        uiConfiguration.shouldAskForCSC = shouldAskForCSC.boolValue;
    }

    if (shouldAskForCardholderName) {
        uiConfiguration.shouldAskForCardholderName = shouldAskForCardholderName.boolValue;
    }

    uiConfiguration.theme = [self themeFromUIConfiguration:dictionary];
    uiConfiguration.threeDSUICustomization = [self threeDSUICustomization:dictionary];

    return uiConfiguration;
}

+ (JPRecommendationConfiguration *)recommendationConfigurationFromConfiguration:(NSDictionary *)configuration {
    NSDictionary *dictionary = [configuration optionalDictionaryForKey:@"recommendationConfiguration"];

    if (!dictionary) {
        return nil;
    }

    NSString *URLString = [dictionary stringForKey:@"url"];
    NSURL *URL = [NSURL URLWithString:URLString];
    NSString *RSAPublicKey = [dictionary stringForKey:@"rsaPublicKey"];
    NSNumber *timeout = [dictionary optionalNumberForKey:@"timeout"];

    return [JPRecommendationConfiguration configurationWithURL:URL RSAPublicKey:RSAPublicKey andTimeout:timeout];
}

+ (JP3DSUICustomization *)threeDSUICustomization:(NSDictionary *)uiCustomization {
    NSDictionary *dictionary = [uiCustomization optionalDictionaryForKey:@"threeDSUIConfiguration"];

    if (!dictionary) {
        return nil;
    }

    NSDictionary *buttonCustomizations = [dictionary optionalDictionaryForKey:@"buttonCustomizations"];
    NSDictionary *toolbarCustomizations = [dictionary optionalDictionaryForKey:@"toolbarCustomization"];
    NSDictionary *labelCustomizations = [dictionary optionalDictionaryForKey:@"labelCustomization"];
    NSDictionary *textBoxCustomizations = [dictionary optionalDictionaryForKey:@"textBoxCustomization"];

    JP3DSUICustomization *customization = [JP3DSUICustomization new];

    if (buttonCustomizations) {
        NSDictionary *submitButtonCustomization = [buttonCustomizations optionalDictionaryForKey:@"SUBMIT"];
        NSDictionary *continueButtonCustomization = [buttonCustomizations optionalDictionaryForKey:@"CONTINUE"];
        NSDictionary *nextButtonCustomization = [buttonCustomizations optionalDictionaryForKey:@"NEXT"];
        NSDictionary *cancelButtonCustomization = [buttonCustomizations optionalDictionaryForKey:@"CANCEL"];
        NSDictionary *resendButtonCustomization = [buttonCustomizations optionalDictionaryForKey:@"RESEND"];

        if (submitButtonCustomization) {
            JP3DSButtonCustomization *submitCustomization = [JP3DSButtonCustomization new];

            NSString *textFontName = [submitButtonCustomization optionalStringForKey:@"textFontName"];
            NSString *textColor = [submitButtonCustomization optionalStringForKey:@"textColor"];
            NSString *backgroundColor = [submitButtonCustomization optionalStringForKey:@"backgroundColor"];
            NSNumber *cornerRadius = [submitButtonCustomization optionalNumberForKey:@"cornerRadius"];
            NSNumber *textFontSize = [submitButtonCustomization optionalNumberForKey:@"textFontSize"];

            if (textFontName) {
                [submitCustomization setTextFontName:textFontName];
            }

            if (textColor) {
                [submitCustomization setTextColor:textColor];
            }

            if (backgroundColor) {
                [submitCustomization setBackgroundColor:backgroundColor];
            }

            if (cornerRadius) {
                [submitCustomization setCornerRadius:cornerRadius.integerValue];
            }

            if (textFontSize) {
                [submitCustomization setTextFontSize:textFontSize.integerValue];
            }

            [customization setButtonCustomization:submitCustomization ofType:JP3DSButtonTypeSubmit];
        }

        if (continueButtonCustomization) {
            JP3DSButtonCustomization *continueCustomization = [JP3DSButtonCustomization new];

            NSString *textFontName = [continueButtonCustomization optionalStringForKey:@"textFontName"];
            NSString *textColor = [continueButtonCustomization optionalStringForKey:@"textColor"];
            NSString *backgroundColor = [continueButtonCustomization optionalStringForKey:@"backgroundColor"];
            NSNumber *cornerRadius = [continueButtonCustomization optionalNumberForKey:@"cornerRadius"];
            NSNumber *textFontSize = [continueButtonCustomization optionalNumberForKey:@"textFontSize"];

            if (textFontName) {
                [continueCustomization setTextFontName:textFontName];
            }

            if (textColor) {
                [continueCustomization setTextColor:textColor];
            }

            if (backgroundColor) {
                [continueCustomization setBackgroundColor:backgroundColor];
            }

            if (cornerRadius) {
                [continueCustomization setCornerRadius:cornerRadius.integerValue];
            }

            if (textFontSize) {
                [continueCustomization setTextFontSize:textFontSize.integerValue];
            }

            [customization setButtonCustomization:continueCustomization ofType:JP3DSButtonTypeContinue];
        }

        if (nextButtonCustomization) {
            JP3DSButtonCustomization *nextCustomization = [JP3DSButtonCustomization new];

            NSString *textFontName = [nextButtonCustomization optionalStringForKey:@"textFontName"];
            NSString *textColor = [nextButtonCustomization optionalStringForKey:@"textColor"];
            NSString *backgroundColor = [nextButtonCustomization optionalStringForKey:@"backgroundColor"];
            NSNumber *cornerRadius = [nextButtonCustomization optionalNumberForKey:@"cornerRadius"];
            NSNumber *textFontSize = [nextButtonCustomization optionalNumberForKey:@"textFontSize"];

            if (textFontName) {
                [nextCustomization setTextFontName:textFontName];
            }

            if (textColor) {
                [nextCustomization setTextColor:textColor];
            }

            if (backgroundColor) {
                [nextCustomization setBackgroundColor:backgroundColor];
            }

            if (cornerRadius) {
                [nextCustomization setCornerRadius:cornerRadius.integerValue];
            }

            if (textFontSize) {
                [nextCustomization setTextFontSize:textFontSize.integerValue];
            }

            [customization setButtonCustomization:nextCustomization ofType:JP3DSButtonTypeNext];
        }

        if (cancelButtonCustomization) {
            JP3DSButtonCustomization *cancelCustomization = [JP3DSButtonCustomization new];

            NSString *textFontName = [cancelButtonCustomization optionalStringForKey:@"textFontName"];
            NSString *textColor = [cancelButtonCustomization optionalStringForKey:@"textColor"];
            NSString *backgroundColor = [cancelButtonCustomization optionalStringForKey:@"backgroundColor"];
            NSNumber *cornerRadius = [cancelButtonCustomization optionalNumberForKey:@"cornerRadius"];
            NSNumber *textFontSize = [cancelButtonCustomization optionalNumberForKey:@"textFontSize"];

            if (textFontName) {
                [cancelCustomization setTextFontName:textFontName];
            }

            if (textColor) {
                [cancelCustomization setTextColor:textColor];
            }

            if (backgroundColor) {
                [cancelCustomization setBackgroundColor:backgroundColor];
            }

            if (cornerRadius) {
                [cancelCustomization setCornerRadius:cornerRadius.integerValue];
            }

            if (textFontSize) {
                [cancelCustomization setTextFontSize:textFontSize.integerValue];
            }

            [customization setButtonCustomization:cancelCustomization ofType:JP3DSButtonTypeCancel];
        }

        if (resendButtonCustomization) {
            JP3DSButtonCustomization *resendCustomization = [JP3DSButtonCustomization new];

            NSString *textFontName = [resendButtonCustomization optionalStringForKey:@"textFontName"];
            NSString *textColor = [resendButtonCustomization optionalStringForKey:@"textColor"];
            NSString *backgroundColor = [resendButtonCustomization optionalStringForKey:@"backgroundColor"];
            NSNumber *cornerRadius = [resendButtonCustomization optionalNumberForKey:@"cornerRadius"];
            NSNumber *textFontSize = [resendButtonCustomization optionalNumberForKey:@"textFontSize"];

            if (textFontName) {
                [resendCustomization setTextFontName:textFontName];
            }

            if (textColor) {
                [resendCustomization setTextColor:textColor];
            }

            if (backgroundColor) {
                [resendCustomization setBackgroundColor:backgroundColor];
            }

            if (cornerRadius) {
                [resendCustomization setCornerRadius:cornerRadius.integerValue];
            }

            if (textFontSize) {
                [resendCustomization setTextFontSize:textFontSize.integerValue];
            }

            [customization setButtonCustomization:resendCustomization ofType:JP3DSButtonTypeResend];
        }
    }

    if (labelCustomizations) {
        JP3DSLabelCustomization *labelCustomization = [JP3DSLabelCustomization new];

        NSString *textFontName = [labelCustomizations optionalStringForKey:@"textFontName"];
        NSString *textColor = [labelCustomizations optionalStringForKey:@"textColor"];
        NSString *headingTextFontName = [labelCustomizations optionalStringForKey:@"headingTextFontName"];
        NSString *headingTextColor = [labelCustomizations optionalStringForKey:@"headingTextColor"];
        NSNumber *headingTextFontSize = [labelCustomizations optionalNumberForKey:@"headingTextFontSize"];
        NSNumber *textFontSize = [labelCustomizations optionalNumberForKey:@"textFontSize"];

        if (textFontName) {
            [labelCustomization setTextFontName:textFontName];
        }

        if (textColor) {
            [labelCustomization setTextColor:textColor];
        }

        if (headingTextFontName) {
            [labelCustomization setHeadingTextFontName:headingTextFontName];
        }

        if (headingTextColor) {
            [labelCustomization setHeadingTextColor:headingTextColor];
        }

        if (headingTextFontSize) {
            [labelCustomization setHeadingTextFontSize:headingTextFontSize.integerValue];
        }

        if (textFontSize) {
            [labelCustomization setTextFontSize:textFontSize.integerValue];
        }

        [customization setLabelCustomization:labelCustomization];
    }

    if (toolbarCustomizations) {
        JP3DSToolbarCustomization *toolbarCustomization = [JP3DSToolbarCustomization new];

        NSNumber *textFontSize = [toolbarCustomizations optionalNumberForKey:@"textFontSize"];
        NSString *textFontName = [toolbarCustomizations optionalStringForKey:@"textFontName"];
        NSString *textColor = [toolbarCustomizations optionalStringForKey:@"textColor"];
        NSString *backgroundColor = [toolbarCustomizations optionalStringForKey:@"backgroundColor"];
        NSString *headerText = [toolbarCustomizations optionalStringForKey:@"headerText"];
        NSString *buttonText = [toolbarCustomizations optionalStringForKey:@"buttonText"];

        if (textFontName) {
            [toolbarCustomization setTextFontName:textFontName];
        }

        if (textColor) {
            [toolbarCustomization setTextColor:textColor];
        }

        if (backgroundColor) {
            [toolbarCustomization setBackgroundColor:backgroundColor];
        }

        if (headerText) {
            [toolbarCustomization setHeaderText:headerText];
        }

        if (buttonText) {
            [toolbarCustomization setButtonText:buttonText];
        }

        if (textFontSize) {
            [toolbarCustomization setTextFontSize:textFontSize.integerValue];
        }

        [customization setToolbarCustomization:toolbarCustomization];
    }

    if (textBoxCustomizations) {
        JP3DSTextBoxCustomization *textBoxCustomization = [JP3DSTextBoxCustomization new];

        NSString *textFontName = [textBoxCustomizations optionalStringForKey:@"textFontName"];
        NSString *textColor = [textBoxCustomizations optionalStringForKey:@"textColor"];
        NSString *borderColor = [textBoxCustomizations optionalStringForKey:@"borderColor"];
        NSNumber *borderWidth = [textBoxCustomizations optionalNumberForKey:@"borderWidth"];
        NSNumber *cornerRadius = [textBoxCustomizations optionalNumberForKey:@"cornerRadius"];
        NSNumber *textFontSize = [textBoxCustomizations optionalNumberForKey:@"textFontSize"];

        if (textFontName) {
            [textBoxCustomization setTextFontName:textFontName];
        }

        if (textColor) {
            [textBoxCustomization setTextColor:textColor];
        }

        if (borderColor) {
            [textBoxCustomization setBorderColor:borderColor];
        }

        if (borderWidth) {
            [textBoxCustomization setBorderWidth:borderWidth.integerValue];
        }

        if (cornerRadius) {
            [textBoxCustomization setCornerRadius:cornerRadius.integerValue];
        }

        if (textFontSize) {
            [textBoxCustomization setTextFontSize:textFontSize.integerValue];
        }

        [customization setTextBoxCustomization:textBoxCustomization];
    }

    return customization;
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

    [mappedResponse setValue:response.receiptId forKey:@"receiptId"];
    [mappedResponse setValue:response.paymentReference forKey:@"yourPaymentReference"];
    [mappedResponse setValue:@(response.type) forKey:@"type"];
    [mappedResponse setValue:response.createdAt forKey:@"createdAt"];
    [mappedResponse setValue:@(response.result) forKey:@"result"];
    [mappedResponse setValue:response.message forKey:@"message"];
    [mappedResponse setValue:response.judoId forKey:@"judoId"];
    [mappedResponse setValue:response.merchantName forKey:@"merchantName"];
    [mappedResponse setValue:response.appearsOnStatementAs forKey:@"appearsOnStatementAs"];
    [mappedResponse setValue:response.originalAmount forKey:@"originalAmount"];
    [mappedResponse setValue:response.netAmount forKey:@"netAmount"];

    JPAmount *amount = response.amount;

    if (amount) {
        [mappedResponse setValue:amount.amount forKey:@"amount"];
        [mappedResponse setValue:amount.currency forKey:@"currency"];
    }

    JPCardDetails *cardDetails = response.cardDetails;

    if (cardDetails) {
        NSMutableDictionary *cardDetailsDictionary = [NSMutableDictionary new];

        if (cardDetails.cardLastFour) {
            cardDetailsDictionary[@"cardLastFour"] = cardDetails.cardLastFour;
        }

        if (cardDetails.endDate) {
            cardDetailsDictionary[@"endDate"] = cardDetails.endDate;
        }

        if (cardDetails.cardToken) {
            cardDetailsDictionary[@"cardToken"] = cardDetails.cardToken;
        }

        cardDetailsDictionary[@"cardNetwork"] = @(cardDetails.cardNetwork);

        if (cardDetails.bank) {
            cardDetailsDictionary[@"bank"] = cardDetails.bank;
        }

        if (cardDetails.cardCategory) {
            cardDetailsDictionary[@"cardCategory"] = cardDetails.cardCategory;
        }

        if (cardDetails.cardCountry) {
            cardDetailsDictionary[@"cardCountry"] = cardDetails.cardCountry;
        }

        if (cardDetails.cardFunding) {
            cardDetailsDictionary[@"cardFunding"] = cardDetails.cardFunding;
        }

        if (cardDetails.cardScheme) {
            cardDetailsDictionary[@"cardScheme"] = cardDetails.cardScheme;
        }

        if (cardDetails.cardHolderName) {
            cardDetailsDictionary[@"cardHolderName"] = cardDetails.cardHolderName;
        }

        [mappedResponse setValue:[NSDictionary dictionaryWithDictionary:cardDetailsDictionary]
                          forKey:@"cardDetails"];
    }

    JPConsumer *consumer = response.consumer;

    if (consumer) {
        NSMutableDictionary *consumerDictionary = [NSMutableDictionary new];

        if (consumer.consumerToken) {
            consumerDictionary[@"consumerToken"] = consumer.consumerToken;
        }

        if (consumer.consumerReference) {
            consumerDictionary[@"consumerReference"] = consumer.consumerReference;
        }

        if (consumerDictionary.count > 0) {
            [mappedResponse setValue:[NSDictionary dictionaryWithDictionary:consumerDictionary]
                              forKey:@"consumerResponse"];
        }
    }

    JPOrderDetails *orderDetails = response.orderDetails;

    if (orderDetails) {
        NSMutableDictionary *orderDetailsDictionary = [NSMutableDictionary new];

        if (orderDetails.orderId) {
            orderDetailsDictionary[@"orderId"] = orderDetails.orderId;
        }

        if (orderDetails.orderStatus) {
            orderDetailsDictionary[@"orderStatus"] = orderDetails.orderStatus;
        }

        if (orderDetails.orderFailureReason) {
            orderDetailsDictionary[@"orderFailureReason"] = orderDetails.orderFailureReason;
        }

        if (orderDetails.timestamp) {
            orderDetailsDictionary[@"timestamp"] = orderDetails.timestamp;
        }

        orderDetailsDictionary[@"amount"] = @(orderDetails.amount);

        [mappedResponse setValue:[NSDictionary dictionaryWithDictionary:orderDetailsDictionary]
                          forKey:@"orderDetails"];
    }

    return [NSDictionary dictionaryWithDictionary:mappedResponse];
}

@end
