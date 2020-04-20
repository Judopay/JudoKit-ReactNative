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
#import "RNTypes.h"
#import "NSDictionary+JudoConvert.h"

@implementation RNApplePayWrappers

//---------------------------------------------------
// MARK: - Public methods
//---------------------------------------------------

+ (JPApplePayConfiguration *)applePayConfigurationFromConfiguration:(NSDictionary *)configuration {
    
    NSDictionary *dictionary = [configuration dictionaryForKey:@"applePayConfiguration"];
    
    NSString *merchantId = [dictionary stringForKey:@"merchantId"];
    NSString *currency = [[configuration dictionaryForKey:@"amount"] stringForKey:@"currency"];
    NSString *countryCode = [dictionary stringForKey:@"countryCode"];
    NSNumber *billingFieldNumber = [dictionary numberForKey:@"requiredBillingContactFields"];
    NSNumber *shippingFieldNumber = [dictionary numberForKey:@"requiredShippingContactFields"];

    NSArray *paymentSummaryItems = [RNApplePayWrappers summaryItemsFromAppleConfiguration:dictionary];
    
    JPApplePayConfiguration *appleConfiguration = [[JPApplePayConfiguration alloc] initWithMerchantId:merchantId
                                                                                             currency:currency
                                                                                          countryCode:countryCode
                                                                                  paymentSummaryItems:paymentSummaryItems];
    
    appleConfiguration.merchantCapabilities = [RNApplePayWrappers merchantCapabilitiesFromAppleConfiguration:dictionary];
    appleConfiguration.supportedCardNetworks = [RNWrappers cardNetworksFromConfiguration:configuration];
    appleConfiguration.shippingMethods = [RNApplePayWrappers shippingMethodsFromAppleConfiguration:dictionary];
    appleConfiguration.shippingType = [RNApplePayWrappers shippingTypeFromDictionary:dictionary];
    appleConfiguration.requiredBillingContactFields = [RNApplePayWrappers contactFieldsFromContactFieldValue:billingFieldNumber.intValue];
    appleConfiguration.requiredShippingContactFields = [RNApplePayWrappers contactFieldsFromContactFieldValue:shippingFieldNumber.intValue];
    appleConfiguration.returnedContactInfo = [RNApplePayWrappers returnedInfoFromAppleConfiguration:dictionary];
    
    return appleConfiguration;
}

//---------------------------------------------------
// MARK: - Helper methods
//---------------------------------------------------

+ (NSArray<JPPaymentSummaryItem *> *)summaryItemsFromAppleConfiguration:(NSDictionary *)appleConfiguration {
    
    NSArray *summaryItemsArray = [appleConfiguration arrayForKey:@"paymentSummaryItems"];
    NSMutableArray<JPPaymentSummaryItem *> *summaryItems = [NSMutableArray new];
    
    for (NSDictionary *summaryItemDict in summaryItemsArray) {
        JPPaymentSummaryItem *item = [self summaryItemFromDictionary:summaryItemDict];
        [summaryItems addObject:item];
    }
    
    return summaryItems;
}

+ (JPPaymentSummaryItem *)summaryItemFromDictionary:(NSDictionary *)dictionary {
    
    NSString *label = [dictionary stringForKey:@"label"];
    NSString *amountString = [dictionary stringForKey:@"amount"];
    NSNumber *type = [dictionary optionalNumberForKey:@"type"];

    NSDecimalNumber *amount = [NSDecimalNumber decimalNumberWithString:amountString];
    
    if (!type) {
        return [JPPaymentSummaryItem itemWithLabel:label amount:amount];
    }
    
    return [JPPaymentSummaryItem itemWithLabel:label amount:amount type:type.intValue];
}

+ (MerchantCapability)merchantCapabilitiesFromAppleConfiguration:(NSDictionary *)appleConfiguration {
    
    NSNumber *selectedCapabilitiesNumber = [appleConfiguration numberForKey:@"merchantCapabilities"];
    int bitmask = selectedCapabilitiesNumber.intValue;
        
    if (BitmaskContains(bitmask, IOSApplePayCapabilityAll)) {
        return MerchantCapability3DS | MerchantCapabilityEMV | MerchantCapabilityCredit | MerchantCapabilityDebit;
    }
    
    MerchantCapability capabilities = 0;

    if (BitmaskContains(bitmask, IOSApplePayCapability3DS)) {
        capabilities |= MerchantCapability3DS;
    }
    
    if (BitmaskContains(bitmask, IOSApplePayCapabilityEMV)) {
        capabilities |= MerchantCapabilityEMV;
    }
    
    if (BitmaskContains(bitmask, IOSApplePayCapabilityCredit)) {
        capabilities |= MerchantCapabilityCredit;
    }
    
    if (BitmaskContains(bitmask, IOSApplePayCapabilityDebit)) {
        capabilities |= MerchantCapabilityDebit;
    }
    
    return capabilities;
}

+ (NSArray<PaymentShippingMethod *> *)shippingMethodsFromAppleConfiguration:(NSDictionary *)appleConfiguration {
    
    NSArray *shippingMethodsArray = [appleConfiguration optionalArrayForKey:@"shippingMethods"];
    NSMutableArray *mappedShippingMethods = [NSMutableArray new];
    
    for (NSDictionary *shippingMethodDict in shippingMethodsArray) {
        PaymentShippingMethod *method = [self shippingMethodFromDictionary:shippingMethodDict];
        [mappedShippingMethods addObject:method];
    }
    
    return mappedShippingMethods;
}

+ (PaymentShippingMethod *)shippingMethodFromDictionary:(NSDictionary *)dictionary {
    
    NSString *identifier = [dictionary stringForKey:@"identifier"];
    NSString *detail = [dictionary stringForKey:@"detail"];
    NSString *label = [dictionary stringForKey:@"label"];
    NSString *amountString = [dictionary stringForKey:@"amount"];
    NSNumber *typeNumber = [dictionary numberForKey:@"type"];
    
    return [[PaymentShippingMethod alloc] initWithIdentifier:identifier
                                                      detail:detail
                                                       label:label
                                                      amount:[NSDecimalNumber decimalNumberWithString:amountString]
                                                        type:typeNumber.intValue];
}

+ (PaymentShippingType)shippingTypeFromDictionary:(NSDictionary *)dictionary {
    
    NSNumber *shippingTypeNumber = [dictionary numberForKey:@"shippingType"];
    
    switch (shippingTypeNumber.intValue) {
        case IOSShippingTypeDelivery:
            return ShippingTypeDelivery;
        case IOSShippingTypeShipping:
            return ShippingTypeShipping;
        case IOSShippingTypeStorePickup:
            return ShippingTypeStorePickup;
        case IOSShippingTypeServicePickup:
            return ShippingTypeServicePickup;
        default:
            @throw [NSException exceptionWithName:NSInvalidArgumentException
                                           reason:@"Invalid shippingType provided."
                                         userInfo:nil];
    }
}

+ (ContactField)contactFieldsFromContactFieldValue:(int)bitmask {
    
    ContactField contactFields = ContactFieldNone;
    
    if (BitmaskContains(bitmask, IOSAppleContactFieldAll)) {
        return ContactFieldAll;
    }
    
    if (BitmaskContains(bitmask, IOSAppleContactFieldPostalAddress)) {
        contactFields |= ContactFieldPostalAddress;
    }
    
    if (BitmaskContains(bitmask, IOSAppleContactFieldEmail)) {
        contactFields |= ContactFieldEmail;
    }
    
    if (BitmaskContains(bitmask, IOSAppleContactFieldName)) {
        contactFields |= ContactFieldName;
    }
    
    if (BitmaskContains(bitmask, IOSAppleContactFieldPhone)) {
        contactFields |= ContactFieldPhone;
    }
    
    return contactFields;
}

+ (ReturnedInfo)returnedInfoFromAppleConfiguration:(NSDictionary *)appleConfiguration {
    
    NSNumber *returnedInfoNumber = [appleConfiguration numberForKey:@"returnedInfo"];
    int bitmask = returnedInfoNumber.intValue;
    
    if (BitmaskContains(bitmask, IOSAppleReturnedInfoAll)) {
        return ReturnedInfoAll;
    }
    
    ReturnedInfo returnedInfo = ReturnedInfoNone;

    if (BitmaskContains(bitmask, IOSAppleReturnedInfoBilling)) {
        returnedInfo |= ReturnedInfoBillingContacts;
    }
    
    if (BitmaskContains(bitmask, IOSAppleReturnedInfoShipping)) {
        returnedInfo |= ReturnedInfoShippingContacts;
    }
    
    return returnedInfo;
}

@end
