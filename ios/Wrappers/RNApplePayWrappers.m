//
//  RNApplePayWrappers.m
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

#import "RNApplePayWrappers.h"
#import "NSDictionary+JudoConvert.h"
#import "RNTypes.h"
#import "RNWrappers.h"

@implementation RNApplePayWrappers

//---------------------------------------------------
// MARK: - Public methods
//---------------------------------------------------

+ (JPApplePayConfiguration *)applePayConfigurationFromConfiguration:(NSDictionary *)configuration {

    NSDictionary *dictionary = [configuration optionalDictionaryForKey:@"applePayConfiguration"];

    if (!dictionary) {
        return nil;
    }

    NSString *merchantId = [dictionary stringForKey:@"merchantId"];
    NSString *currency = [[configuration dictionaryForKey:@"amount"] stringForKey:@"currency"];
    NSString *countryCode = [dictionary stringForKey:@"countryCode"];
    NSNumber *billingFieldNumber = [dictionary optionalNumberForKey:@"requiredBillingContactFields"];
    NSNumber *shippingFieldNumber = [dictionary optionalNumberForKey:@"requiredShippingContactFields"];

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

    if (@available(iOS 16.0, *)) {
        appleConfiguration.recurringPaymentRequest = [RNApplePayWrappers recurringPaymentRequestFromDictionary:dictionary];
    }

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

+ (JPMerchantCapability)merchantCapabilitiesFromAppleConfiguration:(NSDictionary *)appleConfiguration {

    NSNumber *bitmask = [appleConfiguration optionalNumberForKey:@"merchantCapabilities"];

    if (!bitmask) {
        return JPMerchantCapabilityThreeDS;
    }

    if (BitmaskContains(bitmask.intValue, IOSApplePayCapabilityAll)) {
        return JPMerchantCapabilityThreeDS | JPMerchantCapabilityEMV | JPMerchantCapabilityCredit | JPMerchantCapabilityDebit;
    }

    JPMerchantCapability capabilities = 0;

    if (BitmaskContains(bitmask.intValue, IOSApplePayCapability3DS)) {
        capabilities |= JPMerchantCapabilityThreeDS;
    }

    if (BitmaskContains(bitmask.intValue, IOSApplePayCapabilityEMV)) {
        capabilities |= JPMerchantCapabilityEMV;
    }

    if (BitmaskContains(bitmask.intValue, IOSApplePayCapabilityCredit)) {
        capabilities |= JPMerchantCapabilityCredit;
    }

    if (BitmaskContains(bitmask.intValue, IOSApplePayCapabilityDebit)) {
        capabilities |= JPMerchantCapabilityDebit;
    }

    return capabilities;
}

+ (NSArray<JPPaymentShippingMethod *> *)shippingMethodsFromAppleConfiguration:(NSDictionary *)appleConfiguration {

    NSArray *shippingMethodsArray = [appleConfiguration optionalArrayForKey:@"shippingMethods"];
    NSMutableArray *mappedShippingMethods = [NSMutableArray new];

    for (NSDictionary *shippingMethodDict in shippingMethodsArray) {
        JPPaymentShippingMethod *method = [self shippingMethodFromDictionary:shippingMethodDict];
        [mappedShippingMethods addObject:method];
    }

    return mappedShippingMethods;
}

+ (JPPaymentShippingMethod *)shippingMethodFromDictionary:(NSDictionary *)dictionary {

    NSString *identifier = [dictionary stringForKey:@"identifier"];
    NSString *detail = [dictionary stringForKey:@"detail"];
    NSString *label = [dictionary stringForKey:@"label"];
    NSString *amountString = [dictionary stringForKey:@"amount"];
    NSNumber *typeNumber = [dictionary numberForKey:@"type"];

    return [[JPPaymentShippingMethod alloc] initWithIdentifier:identifier
                                                        detail:detail
                                                         label:label
                                                        amount:[NSDecimalNumber decimalNumberWithString:amountString]
                                                          type:typeNumber.intValue];
}

+ (JPPaymentShippingType)shippingTypeFromDictionary:(NSDictionary *)dictionary {

    NSNumber *shippingTypeNumber = [dictionary optionalNumberForKey:@"shippingType"];

    switch (shippingTypeNumber.intValue) {
        case IOSShippingTypeDelivery:
            return JPShippingTypeDelivery;
        case IOSShippingTypeShipping:
            return JPShippingTypeShipping;
        case IOSShippingTypeStorePickup:
            return JPShippingTypeStorePickup;
        case IOSShippingTypeServicePickup:
            return JPShippingTypeServicePickup;
        default:
            @throw [NSException exceptionWithName:NSInvalidArgumentException
                                           reason:@"Invalid shippingType provided."
                                         userInfo:nil];
    }
}

+ (JPContactField)contactFieldsFromContactFieldValue:(int)bitmask {

    JPContactField contactFields = JPContactFieldNone;

    if (BitmaskContains(bitmask, IOSAppleContactFieldAll)) {
        return JPContactFieldAll;
    }

    if (BitmaskContains(bitmask, IOSAppleContactFieldPostalAddress)) {
        contactFields |= JPContactFieldPostalAddress;
    }

    if (BitmaskContains(bitmask, IOSAppleContactFieldEmail)) {
        contactFields |= JPContactFieldEmail;
    }

    if (BitmaskContains(bitmask, IOSAppleContactFieldName)) {
        contactFields |= JPContactFieldName;
    }

    if (BitmaskContains(bitmask, IOSAppleContactFieldPhone)) {
        contactFields |= JPContactFieldPhone;
    }

    return contactFields;
}

+ (JPReturnedInfo)returnedInfoFromAppleConfiguration:(NSDictionary *)appleConfiguration {

    NSNumber *bitmask = [appleConfiguration optionalNumberForKey:@"returnedInfo"];

    if (!bitmask) {
        return JPReturnedInfoNone;
    }

    if (BitmaskContains(bitmask.intValue, IOSAppleReturnedInfoAll)) {
        return JPReturnedInfoAll;
    }

    JPReturnedInfo returnedInfo = JPReturnedInfoNone;

    if (BitmaskContains(bitmask.intValue, IOSAppleReturnedInfoBilling)) {
        returnedInfo |= JPReturnedInfoBillingContacts;
    }

    if (BitmaskContains(bitmask.intValue, IOSAppleReturnedInfoShipping)) {
        returnedInfo |= JPReturnedInfoShippingContacts;
    }

    return returnedInfo;
}

+ (JPRecurringPaymentRequest *)recurringPaymentRequestFromDictionary:(NSDictionary *)dictionary API_AVAILABLE(ios(16.0)) {
    NSDictionary *recurringPaymentRequestDict = [dictionary optionalDictionaryForKey:@"recurringPaymentRequest"];

    if (!recurringPaymentRequestDict) {
        return nil;
    }

    // Mandatory fields
    NSString *paymentDescription = [recurringPaymentRequestDict stringForKey:@"paymentDescription"];
    NSString *managementURLString = [recurringPaymentRequestDict stringForKey:@"managementURL"];
    NSDictionary *regularBillingDict = [recurringPaymentRequestDict dictionaryForKey:@"regularBilling"];

    // Optional fields
    NSDictionary *trialBillingDict = [recurringPaymentRequestDict optionalDictionaryForKey:@"trialBilling"];
    NSString *billingAgreement = [recurringPaymentRequestDict optionalStringForKey:@"billingAgreement"];
    NSString *tokenNotificationURLString = [recurringPaymentRequestDict optionalStringForKey:@"tokenNotificationURL"];

    NSURL *managementURL = [NSURL URLWithString:managementURLString];

    JPRecurringPaymentSummaryItem *regularBilling = [RNApplePayWrappers recurringPaymentSummaryItemFromDictionary:regularBillingDict];
    JPRecurringPaymentRequest *request = [JPRecurringPaymentRequest requestWithPaymentDescription:paymentDescription
                                                                                   regularBilling:regularBilling
                                                                                 andManagementURL:managementURL];

    request.trialBilling = [RNApplePayWrappers recurringPaymentSummaryItemFromDictionary:trialBillingDict];
    request.billingAgreement = billingAgreement;

    if (tokenNotificationURLString) {
        request.tokenNotificationURL = [NSURL URLWithString:tokenNotificationURLString];
    }

    return request;
}

+ (JPRecurringPaymentSummaryItem *)recurringPaymentSummaryItemFromDictionary:(NSDictionary *)dictionary API_AVAILABLE(ios(15.0)) {
    if (!dictionary) {
        return nil;
    }

    NSString *label = [dictionary stringForKey:@"label"];
    NSString *amountString = [dictionary stringForKey:@"amount"];
    NSDecimalNumber *amount = [NSDecimalNumber decimalNumberWithString:amountString];

    JPRecurringPaymentSummaryItem *item = [JPRecurringPaymentSummaryItem new];
    item.label = label;
    item.amount = amount;

    NSString *startDateString = [dictionary optionalStringForKey:@"startDate"];
    NSString *endDateString = [dictionary optionalStringForKey:@"endDate"];
    NSNumber *intervalUnit = [dictionary optionalNumberForKey:@"intervalUnit"];
    NSNumber *intervalCount = [dictionary optionalNumberForKey:@"intervalCount"];

    NSISO8601DateFormatter *dateFormatter = [NSISO8601DateFormatter new];
    dateFormatter.formatOptions = NSISO8601DateFormatWithFullDate | NSISO8601DateFormatWithFullTime | NSISO8601DateFormatWithFractionalSeconds;

    if (startDateString) {
        item.startDate = [dateFormatter dateFromString:startDateString];
    }

    if (endDateString) {
        item.endDate = [dateFormatter dateFromString:endDateString];
    }

    switch (intervalUnit.integerValue) {
        case IOSCalendarUnitYear:
            item.intervalUnit = NSCalendarUnitYear;
            break;

        case IOSCalendarUnitMonth:
            item.intervalUnit = NSCalendarUnitMonth;
            break;

        case IOSCalendarUnitDay:
            item.intervalUnit = NSCalendarUnitDay;
            break;

        case IOSCalendarUnitHour:
            item.intervalUnit = NSCalendarUnitHour;
            break;

        case IOSCalendarUnitMinute:
            item.intervalUnit = NSCalendarUnitMinute;
            break;

        default:
            // overriding defaults as a workround, remove as once JudoKit-iOS is fixed
            item.intervalUnit = NSCalendarUnitMonth;
            break;
    }

    // overriding defaults as a workround, remove as once JudoKit-iOS is fixed
    NSUInteger count = intervalCount.integerValue;
    item.intervalCount = count > 0 ? count : 1;

    return item;
}

@end
