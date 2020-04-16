//
//  RNApplePayWrappers.m
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

#import "RNApplePayWrappers.h"
#import "RNWrappers.h"
#import <React/RCTConvert.h>
#import "RNTypes.h"

@implementation RNApplePayWrappers

//---------------------------------------------------
// MARK: - Public methods
//---------------------------------------------------

+ (JPApplePayConfiguration *)applePayConfigurationFromConfiguration:(NSDictionary *)configuration {
    
    NSDictionary *appleConfigurationDict = configuration[@"applePayConfiguration"];
    
    NSString *merchantId = appleConfigurationDict[@"merchantId"];
    NSString *currency = configuration[@"amount"][@"currency"];
    NSString *countryCode = appleConfigurationDict[@"countryCode"];
    
    NSArray *paymentSummaryItems = [RNApplePayWrappers summaryItemsFromAppleConfiguration:appleConfigurationDict];
    
    JPApplePayConfiguration *appleConfiguration = [[JPApplePayConfiguration alloc] initWithMerchantId:merchantId
                                                                                             currency:currency
                                                                                          countryCode:countryCode
                                                                                  paymentSummaryItems:paymentSummaryItems];
    
    appleConfiguration.merchantCapabilities = [RNApplePayWrappers merchantCapabilitiesFromAppleConfiguration:appleConfigurationDict];
    appleConfiguration.supportedCardNetworks = [RNWrappers cardNetworksFromConfiguration:configuration];
    appleConfiguration.shippingMethods = [RNApplePayWrappers shippingMethodsFromAppleConfiguration:appleConfigurationDict];
    appleConfiguration.shippingType = [RNApplePayWrappers shippingTypeFromDictionary:appleConfigurationDict];
    
    NSNumber *billingFieldNumber = appleConfigurationDict[@"requiredBillingContactFields"];
    appleConfiguration.requiredBillingContactFields = [RNApplePayWrappers contactFieldsFromContactFieldValue:billingFieldNumber.intValue];
    
    NSNumber *shippingFieldNumber = appleConfigurationDict[@"requiredShippingContactFields"];
    appleConfiguration.requiredShippingContactFields = [RNApplePayWrappers contactFieldsFromContactFieldValue:shippingFieldNumber.intValue];
    
    appleConfiguration.returnedContactInfo = [RNApplePayWrappers returnedInfoFromAppleConfiguration:appleConfigurationDict];
    
    return appleConfiguration;
}

//---------------------------------------------------
// MARK: - Helper methods
//---------------------------------------------------

+ (NSArray<JPPaymentSummaryItem *> *)summaryItemsFromAppleConfiguration:(NSDictionary *)appleConfiguration {
    
    NSArray *summaryItemsArray = appleConfiguration[@"paymentSummaryItems"];
    NSMutableArray<JPPaymentSummaryItem *> *summaryItems = [NSMutableArray new];
    
    for (NSDictionary *summaryItemDict in summaryItemsArray) {
        JPPaymentSummaryItem *item = [self summaryItemFromDictionary:summaryItemDict];
        [summaryItems addObject:item];
    }
    
    return summaryItems;
}

+ (JPPaymentSummaryItem *)summaryItemFromDictionary:(NSDictionary *)dictionary {
    NSString *label = dictionary[@"label"];
    NSString *amountString = dictionary[@"amount"];
    NSDecimalNumber *amount = [NSDecimalNumber decimalNumberWithString:amountString];
    NSNumber *type = dictionary[@"type"];
    
    return [JPPaymentSummaryItem itemWithLabel:label
                                        amount:amount
                                          type:type.intValue];
}

+ (MerchantCapability)merchantCapabilitiesFromAppleConfiguration:(NSDictionary *)appleConfiguration {
    NSNumber *selectedCapabilitiesNumber = appleConfiguration[@"merchantCapabilities"];
    int selectedCapabilitiesValue = selectedCapabilitiesNumber.intValue;
    MerchantCapability capabilities = 0;
    
    if (selectedCapabilitiesValue & IOSApplePayCapabilityAll) {
        return MerchantCapability3DS | MerchantCapabilityEMV | MerchantCapabilityCredit | MerchantCapabilityDebit;
    }
    
    if (selectedCapabilitiesValue & IOSApplePayCapability3DS) {
        capabilities |= MerchantCapability3DS;
    }
    
    if (selectedCapabilitiesValue & IOSApplePayCapabilityEMV) {
        capabilities |= MerchantCapabilityEMV;
    }
    
    if (selectedCapabilitiesValue & IOSApplePayCapabilityCredit) {
        capabilities |= MerchantCapabilityCredit;
    }
    
    if (selectedCapabilitiesValue & IOSApplePayCapabilityDebit) {
        capabilities |= MerchantCapabilityDebit;
    }
    
    return capabilities;
}

+ (NSArray<PaymentShippingMethod *> *)shippingMethodsFromAppleConfiguration:(NSDictionary *)appleConfiguration {
    NSArray *shippingMethodsArray = appleConfiguration[@"shippingMethods"];
    NSMutableArray *mappedShippingMethods = [NSMutableArray new];
    
    for (NSDictionary *shippingMethodDict in shippingMethodsArray) {
        PaymentShippingMethod *method = [self shippingMethodFromDictionary:shippingMethodDict];
        [mappedShippingMethods addObject:method];
    }
    
    return mappedShippingMethods;
}

+ (PaymentShippingMethod *)shippingMethodFromDictionary:(NSDictionary *)dictionary {
    
    NSString *identifier = dictionary[@"identifier"];
    NSString *detail = dictionary[@"detail"];
    NSString *label = dictionary[@"label"];
    NSString *amountString = dictionary[@"amount"];
    NSNumber *typeNumber = dictionary[@"type"];
    
    return [[PaymentShippingMethod alloc] initWithIdentifier:identifier
                                                      detail:detail
                                                       label:label
                                                      amount:[NSDecimalNumber decimalNumberWithString:amountString]
                                                        type:typeNumber.intValue];
}

+ (PaymentShippingType)shippingTypeFromDictionary:(NSDictionary *)dictionary {
    NSNumber *shippingTypeNumber = dictionary[@"shippingType"];
    enum IOSShippingType shippingType = shippingTypeNumber.intValue;
    
    switch (shippingType) {
        case IOSShippingTypeDelivery:
            return ShippingTypeDelivery;
        case IOSShippingTypeShipping:
            return ShippingTypeShipping;
        case IOSShippingTypeStorePickup:
            return ShippingTypeStorePickup;
        case IOSShippingTypeServicePickup:
            return ShippingTypeServicePickup;
    }
}

+ (ContactField)contactFieldsFromContactFieldValue:(int)contactFieldValue {
    ContactField contactFields = 0;
    
    if (contactFieldValue & IOSAppleContactFieldAll) {
        return ContactFieldAll;
    }
    
    if (contactFieldValue & IOSAppleContactFieldPostalAddress) {
        contactFields |= ContactFieldPostalAddress;
    }
    
    if (contactFieldValue & IOSAppleContactFieldEmail) {
        contactFields |= ContactFieldEmail;
    }
    
    if (contactFieldValue & IOSAppleContactFieldName) {
        contactFields |= ContactFieldName;
    }
    
    if (contactFieldValue & IOSAppleContactFieldPhone) {
        contactFields |= ContactFieldPhone;
    }
    
    return contactFields;
}

+ (ReturnedInfo)returnedInfoFromAppleConfiguration:(NSDictionary *)appleConfiguration {
    
    ReturnedInfo returnedInfo = 0;
    NSNumber *returnedInfoNumber = appleConfiguration[@"returnedInfo"];
    int returnedInfoValue = returnedInfoNumber.intValue;
    
    if (returnedInfoValue & IOSAppleReturnedInfoAll) {
        return ReturnedInfoAll;
    }
    
    if (returnedInfoValue & IOSAppleReturnedInfoBilling) {
        returnedInfo |= ReturnedInfoBillingContacts;
    }
    
    if (returnedInfoValue & IOSAppleReturnedInfoShipping) {
        returnedInfo |= ReturnedInfoShippingContacts;
    }
    
    return returnedInfo;
}

@end
