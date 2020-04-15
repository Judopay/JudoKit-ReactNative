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

@implementation RNTypeValidation
//----------------------------------------------
// MARK: - Configs Validation
//----------------------------------------------

+ (nullable NSString *)isConfigurationValid:(NSDictionary *) properties {
    NSDictionary *configuration = properties[@"configuration"];
    
    if(![configuration[@"judoId"] isKindOfClass:[NSString class]]) {
        return @"judoId property is not valid, judoId should be a string.";
    }
    
    if (![configuration[@"siteId"] isKindOfClass:[NSString class]] && configuration[@"siteId"] != nil ) {
        return @"siteId is not valid, siteId should be a string";
    }
    
    if (![self isAmountDictionaryValid: configuration[@"amount"]]) {
        return @"amount is not valid, amount should be a dictionary of type JPAmount";
    }
    
    if (![self isReferenceValid:configuration[@"reference"]]) {
        return @"reference is not valid, reference should be a dictionary of type JPReference";
    }
    
    if (![configuration[@"cardAddress"] isKindOfClass: [NSMutableDictionary class]] && configuration[@"cardAddress"] != nil) {
        return @"cardAddress is not valid, cardAddress should be a dictionary of type JPAddress";
    }
    
    if (![self isUIConfigurationsValid:configuration[@"uiConfiguration"]]){
        return @"uiConfiguration is not valid, uiConfiguration should be a dictionary of type JPUIConfiguration";
    }
    
    if (![configuration[@"primaryAccountDetails"] isKindOfClass: [NSMutableDictionary class]] && configuration[@"primaryAccountDetails"] != nil) {
        return @"primaryAccountDetails is not valid, primaryAccountDetails should be a dictionary of type JPPrimaryAccountDetails";
    }
    
    if (![configuration[@"paymentMethods"] isKindOfClass: [NSNumber class]] && configuration[@"paymentMethods"] != nil) {
        return @"paymentMethods is not valid, paymentMethods should be a number";
    }
    
    if (![configuration[@"supportedCardNetworks"] isKindOfClass: [NSNumber class]] && configuration[@"supportedCardNetworks"] != nil) {
        return @"supportedCardNetworks is not valid, supportedCardNetworks should be a number";
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
        return @"applePayConfiguration is not valid, make sure applePayConfiguration corespond to JPApplePayConfiguration model";
    } else {
        NSMutableDictionary *applePayConfiguration = configuration[@"applePayConfiguration"];
        
        if (![applePayConfiguration[@"merchantId"] isKindOfClass:[NSString class]]) {
            return (@"applePayConfiguration -> merchantId is not valid, it should be a string");
        }
        
        if(![applePayConfiguration[@"countryCode"] isKindOfClass:[NSString class]]) {
            return(@"applePayConfiguration -> countryCode is not valid, it should be a string");
        }
        
        if(![self isPaymentSummaryItemsValid:applePayConfiguration[@"paymentSummaryItems"]]) {
            return (@"applePayConfiguration -> paymentSummaryItems is not valid, it should be an array of PaymentSummaryItems type");
        }
        
        if (![applePayConfiguration[@"merchantCapabilities"] isKindOfClass:[NSNumber class]]) {
            return @"applePayConfiguration -> merchantCapabilities is not valid, it should be a number";
        }
        
        if(![applePayConfiguration[@"requiredBillingContactFields"] isKindOfClass:[NSNumber class]]) {
            return  @"applePayConfiguration -> requiredBillingContactFields is not valid, it should a number";
        }
        
        if(![applePayConfiguration[@"requiredShippingContactFields"] isKindOfClass:[NSNumber class]]) {
            return @"applePayConfiguration -> requiredShippingContactFields is not valid, it should be a number";
        }
        
        if(![self isShippingMethodsValid:applePayConfiguration[@"shippingMethods"]]) {
            return @"applePayConfiguration -> shippingMethods is not valid, it should be an array of ShippingMethods type";
        }
        
        if(![applePayConfiguration[@"shippingType"] isKindOfClass:[NSNumber class]]) {
            return @"applePayConfiguration -> shippingType is not valid it  should be a number";
        }
        
        if(![applePayConfiguration[@"returnedInfo"] isKindOfClass:[NSNumber class]]){
            return @"applePayConfiguration -> returnedInfo is not valid, it should be a number";
        }
        
        return nil;
    }
}

//---------------------------------------------------
// MARK: - Helper methods
//---------------------------------------------------

+ (BOOL)isAmountDictionaryValid:(NSMutableDictionary *)amount {
    if ([amount isKindOfClass: [NSMutableDictionary class]]) {
        BOOL isValueValid = [amount[@"value"] isKindOfClass:[NSString class]];
        BOOL isCurrencyValid = [amount[@"currency"] isKindOfClass:[NSString class]];
        return isCurrencyValid && isValueValid;
    } else {
        return NO;
    }
}

+ (BOOL)isReferenceValid:(NSMutableDictionary *)reference {
    if([reference isKindOfClass:[NSMutableDictionary class]]) {
        BOOL isConsumerReferenceValid = [reference[@"consumerReference"] isKindOfClass:[NSString class]];
        BOOL isPaymentReferenceValid = [reference[@"paymentReference"] isKindOfClass:[NSString class]];
        return isConsumerReferenceValid && isPaymentReferenceValid;
    } else {
        return NO;
    }
}

+ (BOOL)isCardAddressValid:(NSMutableDictionary *)address {
    if([address isKindOfClass:[NSMutableArray class]]) {
        BOOL isLineOneValid = [address[@"line1"] isKindOfClass:[NSString class]] || address[@"line1"] == nil;
        BOOL isLineTwoValid = [address[@"line2"] isKindOfClass:[NSString class]] || address[@"line2"] == nil;
        BOOL isLineThreeValid = [address[@"line3"] isKindOfClass:[NSString class]] || address[@"line3"] == nil;
        BOOL isPostCodeValid = [address[@"postCode"] isKindOfClass:[NSString class]] || address[@"postCode"] == nil;
        BOOL isTownValid = [address[@"town"] isKindOfClass:[NSString class]] || address[@"town"] == nil;
        BOOL isCountryCodeValid = [address[@"countryCode"] isKindOfClass:[NSString class]] || address[@"countryCode"] == nil;
        return isLineOneValid && isLineTwoValid && isLineThreeValid && isPostCodeValid && isTownValid && isCountryCodeValid;
    } else {
        return NO;
    }
}

+ (BOOL)isUIConfigurationsValid:(NSMutableDictionary *)uiConfigurations {
    if ([uiConfigurations isKindOfClass: [NSMutableDictionary class]] || uiConfigurations == nil) {
        BOOL isAVSEnabledValid = [uiConfigurations[@"isAVSEnabled"] isKindOfClass: [NSNumber class]];
        BOOL shouldDisplayAmountValid = [uiConfigurations[@"shouldDisplayAmount"] isKindOfClass: [NSNumber class]];
        BOOL isThemeValid = [uiConfigurations[@"theme"] isKindOfClass: [NSMutableDictionary class]] ||uiConfigurations[@"theme"] == nil ;
        return isAVSEnabledValid && shouldDisplayAmountValid && isThemeValid;
    }  else {
        return NO;
    }
}

+ (BOOL)isPaymentSummaryItemsValid:(NSMutableArray *)summaryItems {
    if([summaryItems isKindOfClass:[NSMutableArray class]]){
        for (NSMutableDictionary *item in summaryItems) {
            BOOL isLabelValid = [item[@"label"] isKindOfClass: [NSString class]];
            BOOL isAmountValid = [item[@"amount"] isKindOfClass: [NSString class]];
            BOOL isTypeValid = [item[@"type"] isKindOfClass: [NSNumber class]] || item[@"type"] == nil;
            BOOL isItemValid = isLabelValid && isAmountValid && isTypeValid;
            if(!isItemValid) {
                return NO;
                break;
            }
        }
        return YES;
    } else {
        return NO;
    }
}

+ (BOOL)isShippingMethodsValid:(NSMutableArray *)shippingMethods {
    if([shippingMethods isKindOfClass:[NSMutableArray class]]){
        for (NSMutableDictionary *item in shippingMethods) {
            BOOL isIdentifierValid = [item[@"identifier"] isKindOfClass: [NSString class]];
            BOOL isDetailValid = [item[@"detail"] isKindOfClass: [NSString class]];
            BOOL isLabelValid = [item[@"label"] isKindOfClass: [NSString class]];
            BOOL isAmountValid = [item[@"amount"] isKindOfClass: [NSString class]];
            BOOL isTypeValid = [item[@"type"] isKindOfClass: [NSNumber class]];
            BOOL isItemValid = isIdentifierValid && isDetailValid && isLabelValid && isAmountValid && isTypeValid;
            if(!isItemValid) {
                return NO;
                break;
            }
        }
        return YES;
    } else {
        return NO;
    }
}
@end
