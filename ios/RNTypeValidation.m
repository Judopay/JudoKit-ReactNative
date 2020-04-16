//
//  RNTypeValidation.m
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

#import "RNTypeValidation.h"
#import "RNTypes.h"

@implementation RNTypeValidation

+ (nullable NSString *)isConfigurationValid:(NSDictionary *) properties {
    NSDictionary *configuration = properties[@"configuration"];
    
    if(![configuration[@"judoId"] isKindOfClass:[NSString class]]) {
        return @"judoId typw is not valid, judoId should be a string.";
    }
    
    if (![configuration[@"siteId"] isKindOfClass:[NSString class]] && configuration[@"siteId"] != nil ) {
        return @"siteId type is not valid, siteId should be a string";
    }
    
    if ([self validateAmount:configuration[@"amount"]]) {
        return [self validateAmount:configuration[@"amount"]];
    }
    
    if ([self validateReference:configuration[@"reference"]]) {
        return [self validateReference:configuration[@"reference"]];
    }
    
    if ([self validateCardAddress:configuration[@"cardAddress"]]) {
        return [self validateCardAddress:configuration[@"cardAddress"]];
    }
    
    if ([self validateUIConfigurations:configuration[@"uiConfiguration"]]){
        return [self validateUIConfigurations:configuration[@"uiConfiguration"]];
    }
    
    if ([self validatePrimaryAccountDetails: configuration[@"primaryAccountDetails"]]) {
        return [self validatePrimaryAccountDetails: configuration[@"primaryAccountDetails"]];
    }
    
    if ([self validatePaymentMethods:configuration[@"paymentMethods"]]){
        return [self validatePaymentMethods:configuration[@"paymentMethods"]];
    }
    
    if ([self validateSupportedCardNetworks:configuration[@"supportedCardNetworks"]]){
        [self validateSupportedCardNetworks:configuration[@"supportedCardNetworks"]];
    }
    
    return nil;
}

+ (nullable NSString *)isApplePayConfigurationValid: (NSMutableDictionary *) properties {
    NSDictionary *configuration = properties[@"configuration"];
    NSString *isConfigurationValid = [self isConfigurationValid:properties];
    if (isConfigurationValid) {
        return isConfigurationValid;
    }
    if (![configuration[@"applePayConfiguration"] isKindOfClass: [NSMutableDictionary class]]) {
        return @"applePayConfiguration type is not valid, make sure applePayConfiguration corespond to JudoApplePayConfiguration model";
    } else {
        NSMutableDictionary *applePayConfiguration = configuration[@"applePayConfiguration"];
        
        if(![applePayConfiguration[@"merchantId"] isKindOfClass:[NSString class]]) {
            return (@"applePayConfiguration -> merchantId type is not valid, it should be a string");
        }
        
        if(![applePayConfiguration[@"countryCode"] isKindOfClass:[NSString class]]) {
            return(@"applePayConfiguration -> countryCode type is not valid, it should be a string");
        }
        
        if([self validateSummaryItems:applePayConfiguration[@"paymentSummaryItems"]]) {
            return [self validateSummaryItems:applePayConfiguration[@"paymentSummaryItems"]];
        }
        
        if ([self validateMerchantmerchantCapabilities:applePayConfiguration[@"merchantCapabilities"]]) {
            return [self validateMerchantmerchantCapabilities:applePayConfiguration[@"merchantCapabilities"]];
        }
        
        if([self validateRequiredContactFields:applePayConfiguration[@"requiredBillingContactFields"] for:@"requiredBillingContactFields"]){
            return [self validateRequiredContactFields:applePayConfiguration[@"requiredBillingContactFields"] for:@"requiredBillingContactFields"];
        }
        
        if([self validateRequiredContactFields:applePayConfiguration[@"requiredShippingContactFields"] for:@"requiredShippingContactFields"]) {
            return [self validateRequiredContactFields:applePayConfiguration[@"requiredShippingContactFields"] for:@"requiredShippingContactFields"];
        }
        
        if([self validateShippingMethods:applePayConfiguration[@"shippingMethods"]]) {
            return [self validateShippingMethods:applePayConfiguration[@"shippingMethods"]];
        }
        
        if([self validateShippingType: applePayConfiguration[@"shippingType"]]) {
            return [self validateShippingMethods: applePayConfiguration[@"shippingType"]];
        }
        
        if([self validateReturnedInfo: applePayConfiguration[@"returnedInfo"]]){
            return [self validateReturnedInfo: applePayConfiguration[@"returnedInfo"]];
        }
        return nil;
    }
}

//---------------------------------------------------
// MARK: - Helper methods
//---------------------------------------------------

+ (nullable NSString *)validateAmount:(NSMutableDictionary *)amount {
    if ([amount isKindOfClass: [NSMutableDictionary class]]) {
        if(![amount[@"value"] isKindOfClass:[NSString class]]){
            return @"amount is invalid, value type should be a string";
        }
        if (![amount[@"currency"] isKindOfClass:[NSString class]]) {
            return @"amount is invalid, currency type should be a string";
        }
        return nil;
    }
    return @"Amount type is not valid, it should be a dictionary of JudoAmount type";
}

+ (nullable NSString *)validateReference:(NSMutableDictionary *)reference {
    if([reference isKindOfClass:[NSMutableDictionary class]]) {
        if (![reference[@"consumerReference"] isKindOfClass:[NSString class]]) {
            return @"reference is invalid, consumerReference type should be a string";
        }
        if(![reference[@"paymentReference"] isKindOfClass:[NSString class]]) {
            return @"reference is invalid, paymentReference type should be a string";
        }
        return nil;
    }
    return @"reference type is invalid, it should be a dictionary of JudoReference type";
}

+ (nullable NSString *)validateCardAddress:(NSMutableDictionary *)address {
    if([address isKindOfClass:[NSMutableDictionary class]] || address == nil) {
        if(![address[@"line1"] isKindOfClass:[NSString class]] && address[@"line1"] != nil) {
            return @"cardAddress is invalid, line1 type should be string";
        }
        if(![address[@"line2"] isKindOfClass:[NSString class]] && address[@"line2"] != nil) {
            return @"cardAddress is invalid, line2 type should be string";
        }
        if (![address[@"line3"] isKindOfClass:[NSString class]] && address[@"line3"] != nil) {
            return @"cardAddress is invalid, line3 type should be string";
        }
        if (![address[@"postCode"] isKindOfClass:[NSString class]] && address[@"postCode"] != nil) {
            return @"cardAddress is invalid, postCode type should be string";
        }
        
        if (![address[@"town"] isKindOfClass:[NSString class]] && address[@"town"] != nil) {
            return @"cardAddress is invalid, town type should be string";
        }
        if (![address[@"countryCode"] isKindOfClass:[NSString class]] && address[@"countryCode"] != nil) {
            return @"cardAddress is invalid, countryCode type should be string";
        }
        return nil;
    }
    return @"cardAddress is invalid, it should be of a dictionary of JudoAddress type";
}

+ (nullable NSString *)validateUIConfigurations:(NSMutableDictionary *)uiConfigurations {
    if ([uiConfigurations isKindOfClass: [NSMutableDictionary class]] || uiConfigurations == nil) {
        if(![uiConfigurations[@"isAVSEnabled"] isKindOfClass: [NSNumber class]]) {
            return @"uiConfigurations is invalid, isAVSEnabled type should be a boolean";
        }
        if(![uiConfigurations[@"shouldDisplayAmount"] isKindOfClass: [NSNumber class]]) {
            return @"uiConfigurations is invalid, shouldDisplayAmount type should be a boolean";
        }
        if(![uiConfigurations[@"theme"] isKindOfClass: [NSMutableDictionary class]] && uiConfigurations[@"theme"] != nil) {
            return @"uiConfigurations is invalid, theme type should be dictionary";
        }
        return nil;
    }
    return @"uiConfigurations type is not valid, it should be of dictionary of JudoUIConfiguration type";
}

+ (nullable NSString *)validatePrimaryAccountDetails:(NSMutableDictionary *)accountDetails {
    if ([accountDetails isKindOfClass: [NSMutableDictionary class]] || accountDetails == nil) {
        if(![accountDetails[@"name"] isKindOfClass: [NSString class]] && accountDetails[@"name"] != nil) {
            return @"primaryAccountDetails type is not valid, name type should be string";
        }
        if(![accountDetails[@"accountNumber"] isKindOfClass: [NSString class]] && accountDetails[@"accountNumber"] != nil) {
            return @"primaryAccountDetails type is not valid, accountNumber type should be string";
        }
        if(![accountDetails[@"dateOfBirth"] isKindOfClass: [NSString class]] && accountDetails[@"dateOfBirth"] != nil) {
            return @"primaryAccountDetails type is not valid, dateOfBirth type should be string";
        }
        if(![accountDetails[@"postCode"] isKindOfClass: [NSString class]] && accountDetails[@"postCode"] != nil) {
            return @"primaryAccountDetails type is not valid, postCode type should be string";
        }
        return nil;
    }
    return @"primaryAccountDetails type is not valid, it should be a dictionary of JudoAccountDetails type";
}

+ (nullable NSString *)validateSummaryItems:(NSMutableArray *)summaryItems {
    if([summaryItems isKindOfClass:[NSMutableArray class]]){
        for (NSMutableDictionary *item in summaryItems) {
            NSString *itemValidationResult = [self validateSummaryItem: item];
            if(itemValidationResult){
                return itemValidationResult;
            }
        }
        return nil;
    }
    return @"summaryItems type is not valid, it shoild be an array of summary items";
}

+(nullable NSString *)validateSummaryItem:(NSMutableDictionary *)summaryItem {
    if([summaryItem isKindOfClass:[NSMutableDictionary class]]) {
        if(![summaryItem[@"label"] isKindOfClass: [NSString class]]) {
            return @"summaryItem type is not valid, label type should be a string";
        }
        if(![summaryItem[@"amount"] isKindOfClass: [NSString class]]) {
            return @"summaryItem type is not valid, amount type should be a string";
        }
        if(![summaryItem[@"type"] isKindOfClass: [NSNumber class]] && summaryItem[@"type"] != nil) {
            return @"summaryItem type is not valid, type should be a number";
        }
        return nil;
    }
    return @"summaryItem type is not valid, it should be a dictionary of JudoPaymentSummaryItem type";
}

+ (nullable NSString *)validateShippingMethods:(NSMutableArray *)shippingMethods {
    if([shippingMethods isKindOfClass:[NSMutableArray class]]){
        for (NSMutableDictionary *item in shippingMethods) {
            NSString *itemValidationResult = [self validateShippingMethod:item];
            if(itemValidationResult) {
                return itemValidationResult;
            }
        }
        return nil;
    }
    return [[shippingMethods class] description];
}

+(nullable NSString *)validateShippingMethod:(NSMutableDictionary *)shippingMethod {
    if([shippingMethod isKindOfClass:[NSMutableDictionary class]]) {
        if(![shippingMethod[@"identifier"] isKindOfClass: [NSString class]]) {
            return @"shippingMethod type is not valid, identifier type should be a string";
        }
        if(![shippingMethod[@"detail"] isKindOfClass: [NSString class]]) {
            return @"shippingMethod type is not valid, detail type should be a string";
        }
        if(![shippingMethod[@"label"] isKindOfClass: [NSString class]]) {
            return @"shippingMethod type is not valid, label type should be a string";
        }
        if(![shippingMethod[@"amount"] isKindOfClass: [NSString class]]) {
            return @"shippingMethod type is not valid, amount type should be a string";
        }
        if(![shippingMethod[@"type"] isKindOfClass: [NSNumber class]]) {
            return @"shippingMethod type is not valid, type should be a number";
        }
        return nil;
    }
    return @"shippingMethod type is not valid, it should be a dictionary of JudoShippingMethod type";
}

+(nullable NSString *)validatePaymentMethods:(NSNumber *)paymentMethods {
    int paymentMethodsBitmask = paymentMethods.intValue;
    BOOL isPaymentMethodAll = (paymentMethodsBitmask & IOSPaymentMethodAll);
    BOOL isPaymentMethodCard = (paymentMethodsBitmask & IOSPaymentMethodCard);
    BOOL isPaymentMethodApplePay = (paymentMethodsBitmask & IOSPaymentMethodApplePay);
    BOOL isPaymentMethodIDEAL = (paymentMethodsBitmask & IOSPaymentMethodIDEAL);
    BOOL isPaymentMethodValid = isPaymentMethodAll || isPaymentMethodCard || isPaymentMethodApplePay || isPaymentMethodIDEAL;
    if (!isPaymentMethodValid) {
        return @"paymentMethods type is not valid, paymentMethods type should be JudoPaymentMethod";
    }
    return nil;
}

+(nullable NSString *)validateSupportedCardNetworks:(NSNumber *)cardNetworks {
    int cardNetworksBitmask = cardNetworks.intValue;
    BOOL isCardNetworkAll = cardNetworksBitmask & IOSCardNetworkAll;
    BOOL isCardNetworkJCB = cardNetworksBitmask & IOSCardNetworkJCB;
    BOOL isCardNetworkAmex = cardNetworksBitmask & IOSCardNetworkAmex;
    BOOL isCardNetworkVisa = cardNetworksBitmask & IOSCardNetworkVisa;
    BOOL isCardNetworkMaestro = cardNetworksBitmask & IOSCardNetworkMaestro;
    BOOL isCardNetworkDiscover = cardNetworksBitmask & IOSCardNetworkDiscover;
    BOOL isCardNetworkDinersClub = cardNetworksBitmask & IOSCardNetworkDinersClub;
    BOOL isCardNetworkMasterCard = cardNetworksBitmask & IOSCardNetworkMastercard;
    BOOL isCardNetworkChinaUnionPay = cardNetworksBitmask & IOSCardNetworkChinaUnionPay;
    BOOL isCardNetworkValid = isCardNetworkAll || isCardNetworkJCB || isCardNetworkAmex || isCardNetworkVisa
    || isCardNetworkMaestro || isCardNetworkDiscover || isCardNetworkDinersClub || isCardNetworkMasterCard || isCardNetworkChinaUnionPay;
    
    if(!isCardNetworkValid) {
        return @"cardNetworks type is not valid, paymentMethods should have a value of JudoCardNetwork type";
    }
    return nil;
}

+(nullable NSString *)validateMerchantmerchantCapabilities:(NSNumber *)merchantCapabilities {
    int merchantCapabilitiesBitmask = merchantCapabilities.intValue;
    BOOL isThreeDSEnabled = merchantCapabilitiesBitmask & IOSApplePayCapability3DS;
    BOOL isAllEnabled = merchantCapabilitiesBitmask & IOSApplePayCapabilityAll;
    BOOL isEMVEnabled = merchantCapabilitiesBitmask & IOSApplePayCapabilityEMV;
    BOOL isDebitEnabled = merchantCapabilitiesBitmask & IOSApplePayCapabilityDebit;
    BOOL isCreditEnabled = merchantCapabilitiesBitmask & IOSApplePayCapabilityCredit;
    BOOL isMerchantCapabilitiesValid = isThreeDSEnabled || isAllEnabled || isEMVEnabled || isDebitEnabled || isCreditEnabled;
    if (!isMerchantCapabilitiesValid) {
        return @"merchantCapabilities type is not valid, paymentMethods should have a value of JudoMerchantCapability";
    }
    return nil;
}

+(nullable NSString *)validateRequiredContactFields:(NSNumber *)requiredFields for:(NSString *)fieldType {
    int requiredFieldsBitMask = requiredFields.intValue;
    BOOL isAllFields = requiredFieldsBitMask & IOSAppleContactFieldAll;
    BOOL isNameField = requiredFieldsBitMask & IOSAppleContactFieldName;
    BOOL isEmailField = requiredFieldsBitMask & IOSAppleContactFieldEmail;
    BOOL isPhoneField = requiredFieldsBitMask & IOSAppleContactFieldPhone;
    BOOL isAddressField = requiredFieldsBitMask & IOSAppleContactFieldPostalAddress;
    BOOL isRequiredFieldsValid = isAllFields || isNameField || isEmailField || isPhoneField || isAddressField;
    if(!isRequiredFieldsValid) {
        return [NSString stringWithFormat:@"%@ type is not valid, paymentMethods should have a value of JudoContactField", fieldType];
    }
    return nil;
}

+(nullable NSString *)validateReturnedInfo:(NSNumber *)returnedInfo {
    int returnedInfoBitmask = returnedInfo.intValue;
    BOOL isReturnedInfoAll = returnedInfoBitmask & IOSAppleReturnedInfoAll;
    BOOL isReturnedInfoBilling = returnedInfoBitmask & IOSAppleReturnedInfoBilling;
    BOOL isReturnedInfoShipping = returnedInfoBitmask & IOSAppleReturnedInfoShipping;
    BOOL isRerunedInfoValid = isReturnedInfoAll || isReturnedInfoBilling || isReturnedInfoShipping;
    if (!isRerunedInfoValid) {
        return @"returnedInfo type is not valid, paymentMethods should have a value of JudoReturnedInfo";
    }
    return nil;
}

+(nullable NSString *)validateShippingType:(NSNumber *)shippingTypes {
    int shippingTypesBitmask = shippingTypes.intValue;
    BOOL isDelivery = shippingTypesBitmask & IOSShippingTypeDelivery;
    BOOL isShipping = shippingTypesBitmask & IOSShippingTypeShipping;
    BOOL isStorePickup = shippingTypesBitmask & IOSShippingTypeStorePickup;
    BOOL isServicePickup = shippingTypesBitmask & IOSShippingTypeServicePickup;
    BOOL isShppingTypesValid = isDelivery || isShipping || isStorePickup || isServicePickup ;
    if(!isShppingTypesValid) {
        return @"shippingTypes type is not valid, paymentMethods should have a value of JudoShippingType";
    }
    return nil;
}

@end
