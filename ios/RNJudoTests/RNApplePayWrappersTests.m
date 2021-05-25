//
//  RNApplePayWrappersTest.m
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
//  FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT. IN NO EVENT SHALL THE
//  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
//  SOFTWARE.

#import <XCTest/XCTest.h>
#import "RNApplePayWrappers.h"
#import "RNMocks.h"

@interface RNApplePayWrappersTest : XCTestCase

@end

@implementation RNApplePayWrappersTest

/*
 * GIVEN: a configuration NSDictionary is passed to the Apple Pay wrapper
 *
 * WHEN:  the NSDictionary is valid
 *
 * THEN:  a configured JPApplePayConfiguration instance should be returned
 */
- (void)test_OnValidDictionary_ReturnApplePayConfiguration {
    NSDictionary *mockConfig = RNMocks.configuration;
    XCTAssertNotNil([RNApplePayWrappers applePayConfigurationFromConfiguration:mockConfig]);
}

/*
 * GIVEN: a configuration NSDictionary is passed to the Apple Pay wrapper
 *
 * WHEN:  the NSDictionary has no [merchantId] property
 *
 * THEN:  a 'missing merchant ID' exception should be thrown
 */
- (void)test_OnMissingMerchantId_ThrowError {
    NSDictionary *config = [self configurationByChangingValue:nil forKey:@"merchantId"];
    XCTAssertThrows([RNApplePayWrappers applePayConfigurationFromConfiguration:config]);
}

/*
 * GIVEN: a configuration NSDictionary is passed to the Apple Pay wrapper
 *
 * WHEN:  the [merchantId] property is not an NSString
 *
 * THEN:  a 'invalid merchant ID' exception should be thrown
 */
- (void)test_OnInvalidMerchantId_ThrowError {
    NSDictionary *config = [self configurationByChangingValue:@123 forKey:@"merchantId"];
    XCTAssertThrows([RNApplePayWrappers applePayConfigurationFromConfiguration:config]);
}

/*
 * GIVEN: a configuration NSDictionary is passed to the Apple Pay wrapper
 *
 * WHEN:  the NSDictionary has no [countryCode] property
 *
 * THEN:  a 'missing country code' exception should be thrown
 */
- (void)test_OnMissingCountryCode_ThrowError {
    NSDictionary *config = [self configurationByChangingValue:nil forKey:@"countryCode"];
    XCTAssertThrows([RNApplePayWrappers applePayConfigurationFromConfiguration:config]);
}

/*
 * GIVEN: a configuration NSDictionary is passed to the Apple Pay wrapper
 *
 * WHEN:  the [merchantId] property is not a NSString
 *
 * THEN:  a 'invalid merchant ID' exception should be thrown
 */
- (void)test_OnInvalidCountryCode_ThrowError {
    NSDictionary *config = [self configurationByChangingValue:@123 forKey:@"countryCode"];
    XCTAssertThrows([RNApplePayWrappers applePayConfigurationFromConfiguration:config]);
}

/*
 * GIVEN: a configuration NSDictionary is passed to the Apple Pay wrapper
 *
 * WHEN:  the NSDictionary has no [paymentSummaryItems] property
 *
 * THEN:  an 'missing payment summary items' exception should be thrown
 */
- (void)test_OnMissingPaymentSummaryItems_ThrowError {
    NSDictionary *config = [self configurationByChangingValue:nil forKey:@"paymentSummaryItems"];
    XCTAssertThrows([RNApplePayWrappers applePayConfigurationFromConfiguration:config]);
}

/*
 * GIVEN: a configuration NSDictionary is passed to the Apple Pay wrapper
 *
 * WHEN:  the [paymentSummaryItems] property is not an NSArray
 *
 * THEN:  an 'invalid payment summary items' exception should be thrown
 */
- (void)test_OnInvalidPaymentSummaryItems_ThrowError {
    NSDictionary *config = [self configurationByChangingValue:@"hello" forKey:@"paymentSummaryItems"];
    XCTAssertThrows([RNApplePayWrappers applePayConfigurationFromConfiguration:config]);
}

/*
 * GIVEN: a configuration NSDictionary is passed to the Apple Pay wrapper
 *
 * WHEN:  the [paymentSummaryItems] array elements are not NSDictionary types
 *
 * THEN:  an 'invalid payment summary item elements' exception should be thrown
 */
- (void)test_OnInvalidPaymentSummaryItemElements_ThrowError {
    NSDictionary *config = [self configurationByChangingValue:@[@"hello"] forKey:@"paymentSummaryItems"];
    XCTAssertThrows([RNApplePayWrappers applePayConfigurationFromConfiguration:config]);
}

/*
 * GIVEN: a configuration NSDictionary is passed to the Apple Pay wrapper
 *
 * WHEN:  the [paymentSummaryItems] property does not have a label
 *
 * THEN:  an 'empty payment summary items' exception should be thrown
 */
- (void)test_OnMissingPaymentSummaryItemLabel_ThrowError {
    NSDictionary *config = [self configurationByChangingValue:nil
                                                       forKey:@"label"
                                                 forArrayName:@"paymentSummaryItems"];
    XCTAssertThrows([RNApplePayWrappers applePayConfigurationFromConfiguration:config]);
}

/*
 * GIVEN: a configuration NSDictionary is passed to the Apple Pay wrapper
 *
 * WHEN:  the [paymentSummaryItems] label is not an NSString
 *
 * THEN:  an 'invalid payment summary item label' exception should be thrown
 */
- (void)test_OnInvalidPaymentSummaryItemLabel_ThrowError {
    NSDictionary *config = [self configurationByChangingValue:@123
                                                       forKey:@"label"
                                                 forArrayName:@"paymentSummaryItems"];
    XCTAssertThrows([RNApplePayWrappers applePayConfigurationFromConfiguration:config]);
}

/*
 * GIVEN: a configuration NSDictionary is passed to the Apple Pay wrapper
 *
 * WHEN:  the [paymentSummaryItems] property does not have an amount
 *
 * THEN:  a 'missing payment summary item amount' exception should be thrown
 */
- (void)test_OnMissingPaymentSummaryItemAmount_ThrowError {
    NSDictionary *config = [self configurationByChangingValue:nil
                                                       forKey:@"amount"
                                                 forArrayName:@"paymentSummaryItems"];
    XCTAssertThrows([RNApplePayWrappers applePayConfigurationFromConfiguration:config]);
}

/*
 * GIVEN: a configuration NSDictionary is passed to the Apple Pay wrapper
 *
 * WHEN:  the [paymentSummaryItems] amount is not an NSString
 *
 * THEN:  an 'invalid payment summary item amount' exception should be thrown
 */
- (void)test_OnInvalidPaymentSummaryItemAmount_ThrowError {
    NSDictionary *config = [self configurationByChangingValue:@123
                                                       forKey:@"amount"
                                                 forArrayName:@"paymentSummaryItems"];
    XCTAssertThrows([RNApplePayWrappers applePayConfigurationFromConfiguration:config]);
}

/*
 * GIVEN: a configuration NSDictionary is passed to the Apple Pay wrapper
 *
 * WHEN:  the [paymentSummaryItems] type is not an integer
 *
 * THEN:  an 'invalid payment summary item type' exception should be thrown
 */
- (void)test_OnInvalidPaymentSummaryItemType_ThrowError {
    NSDictionary *config = [self configurationByChangingValue:@"hello"
                                                       forKey:@"type"
                                                 forArrayName:@"paymentSummaryItems"];
    XCTAssertThrows([RNApplePayWrappers applePayConfigurationFromConfiguration:config]);
}

/*
 * GIVEN: a configuration NSDictionary is passed to the Apple Pay wrapper
 *
 * WHEN:  the [paymentSummaryItems] optional type is not specified
 *
 * THEN:  the Apple Pay configuration is still initialized correctly
 */
- (void)test_OnMissingPaymentSummaryItemType_ReturnApplePayConfiguration {
    NSDictionary *config = [self configurationByChangingValue:nil
                                                       forKey:@"type"
                                                 forArrayName:@"paymentSummaryItems"];
    XCTAssertNotNil([RNApplePayWrappers applePayConfigurationFromConfiguration:config]);
}

/*
 * GIVEN: a configuration NSDictionary is passed to the Apple Pay wrapper
 *
 * WHEN:  the [merchantCapabilities] property is not an integer
 *
 * THEN:  an 'invalid merchant capability' exception should be thrown
 */
- (void)test_OnInvalidMerchantCapabilities_ThrowError {
    NSDictionary *config = [self configurationByChangingValue:@"hello" forKey:@"merchantCapabilities"];
    XCTAssertThrows([RNApplePayWrappers applePayConfigurationFromConfiguration:config]);
}

/*
 * GIVEN: a configuration NSDictionary is passed to the Apple Pay wrapper
 *
 * WHEN:  the [merchantCapabilities] property is set to 0
 *
 * THEN:  3DS merchant capabilities should be set
 */
- (void)test_OnMerchantCapabilityValueZero_Enable3DS {
    NSDictionary *config = [self configurationByChangingValue:@0 forKey:@"merchantCapabilities"];
    JPApplePayConfiguration *appleConfig = [RNApplePayWrappers applePayConfigurationFromConfiguration:config];
    XCTAssertEqual(appleConfig.merchantCapabilities, JPMerchantCapabilityThreeDS);
}

/*
 * GIVEN: a configuration NSDictionary is passed to the Apple Pay wrapper
 *
 * WHEN:  the [merchantCapabilities] property is set to 2
 *
 * THEN:  EMV merchant capabilities should be set
 */
- (void)test_OnMerchantCapabilityValueOne_EnableEMV {
    NSDictionary *config = [self configurationByChangingValue:@2 forKey:@"merchantCapabilities"];
    JPApplePayConfiguration *appleConfig = [RNApplePayWrappers applePayConfigurationFromConfiguration:config];
    XCTAssertEqual(appleConfig.merchantCapabilities, JPMerchantCapabilityEMV);
}

/*
 * GIVEN: a configuration NSDictionary is passed to the Apple Pay wrapper
 *
 * WHEN:  the [merchantCapabilities] property is set to 4
 *
 * THEN:  Credit merchant capabilities should be set
 */
- (void)test_OnMerchantCapabilityValueOne_EnableCredit {
    NSDictionary *config = [self configurationByChangingValue:@4 forKey:@"merchantCapabilities"];
    JPApplePayConfiguration *appleConfig = [RNApplePayWrappers applePayConfigurationFromConfiguration:config];
    XCTAssertEqual(appleConfig.merchantCapabilities, JPMerchantCapabilityCredit);
}

/*
 * GIVEN: a configuration NSDictionary is passed to the Apple Pay wrapper
 *
 * WHEN:  the [merchantCapabilities] property is set to 8
 *
 * THEN:  Debit merchant capabilities should be set
 */
- (void)test_OnMerchantCapabilityValueOne_EnableDebit {
    NSDictionary *config = [self configurationByChangingValue:@8 forKey:@"merchantCapabilities"];
    JPApplePayConfiguration *appleConfig = [RNApplePayWrappers applePayConfigurationFromConfiguration:config];
    XCTAssertEqual(appleConfig.merchantCapabilities, JPMerchantCapabilityDebit);
}

/*
 * GIVEN: a configuration NSDictionary is passed to the Apple Pay wrapper
 *
 * WHEN:  the [merchantCapabilities] property is set to 16
 *
 * THEN:  All merchant capabilities should be set
 */
- (void)test_OnMerchantCapabilityValueOne_EnableAll {
    NSDictionary *config = [self configurationByChangingValue:@16 forKey:@"merchantCapabilities"];
    JPApplePayConfiguration *appleConfig = [RNApplePayWrappers applePayConfigurationFromConfiguration:config];
    int value = JPMerchantCapabilityThreeDS | JPMerchantCapabilityEMV | JPMerchantCapabilityCredit | JPMerchantCapabilityDebit;
    XCTAssertEqual(appleConfig.merchantCapabilities, value);
}

/*
 * GIVEN: a configuration NSDictionary is passed to the Apple Pay wrapper
 *
 * WHEN:  the [requiredBillingContactFields] property is not an integer
 *
 * THEN:  an 'invalid required billing field' exception should be thrown
 */
- (void)test_OnInvalidRequiredBillingFields_ThrowError {
    NSDictionary *config = [self configurationByChangingValue:@"hello" forKey:@"requiredBillingContactFields"];
    XCTAssertThrows([RNApplePayWrappers applePayConfigurationFromConfiguration:config]);
}

/*
 * GIVEN: a configuration NSDictionary is passed to the Apple Pay wrapper
 *
 * WHEN:  the [requiredBillingContactFields] value is set to 1
 *
 * THEN:  Postal Code must be set as a contact field
 */
- (void)test_OnRequiredBillingFieldsValueOne_SetPostalCode {
    NSDictionary *config = [self configurationByChangingValue:@1 forKey:@"requiredBillingContactFields"];
    JPApplePayConfiguration *appleConfig = [RNApplePayWrappers applePayConfigurationFromConfiguration:config];
    XCTAssertEqual(appleConfig.requiredBillingContactFields, JPContactFieldPostalAddress);
}

/*
 * GIVEN: a configuration NSDictionary is passed to the Apple Pay wrapper
 *
 * WHEN:  the [requiredBillingContactFields] value is set to 2
 *
 * THEN:  Phone must be set as a contact field
 */
- (void)test_OnRequiredBillingFieldsValueTwo_SetPhone {
    NSDictionary *config = [self configurationByChangingValue:@2 forKey:@"requiredBillingContactFields"];
    JPApplePayConfiguration *appleConfig = [RNApplePayWrappers applePayConfigurationFromConfiguration:config];
    XCTAssertEqual(appleConfig.requiredBillingContactFields, JPContactFieldPhone);
}

/*
 * GIVEN: a configuration NSDictionary is passed to the Apple Pay wrapper
 *
 * WHEN:  the [requiredBillingContactFields] value is set to 4
 *
 * THEN:  Email must be set as a contact field
 */
- (void)test_OnRequiredBillingFieldsValueFour_SetEmail {
    NSDictionary *config = [self configurationByChangingValue:@4 forKey:@"requiredBillingContactFields"];
    JPApplePayConfiguration *appleConfig = [RNApplePayWrappers applePayConfigurationFromConfiguration:config];
    XCTAssertEqual(appleConfig.requiredBillingContactFields, JPContactFieldEmail);
}

/*
 * GIVEN: a configuration NSDictionary is passed to the Apple Pay wrapper
 *
 * WHEN:  the [requiredBillingContactFields] value is set to 8
 *
 * THEN:  Name must be set as a contact field
 */
- (void)test_OnRequiredBillingFieldsValueEight_SetName {
    NSDictionary *config = [self configurationByChangingValue:@8 forKey:@"requiredBillingContactFields"];
    JPApplePayConfiguration *appleConfig = [RNApplePayWrappers applePayConfigurationFromConfiguration:config];
    XCTAssertEqual(appleConfig.requiredBillingContactFields, JPContactFieldName);
}

/*
 * GIVEN: a configuration NSDictionary is passed to the Apple Pay wrapper
 *
 * WHEN:  the [requiredBillingContactFields] value is set to 16
 *
 * THEN:  All contact fields must be set
 */
- (void)test_OnRequiredBillingFieldsValueSixteen_SetName {
    NSDictionary *config = [self configurationByChangingValue:@16 forKey:@"requiredBillingContactFields"];
    JPApplePayConfiguration *appleConfig = [RNApplePayWrappers applePayConfigurationFromConfiguration:config];
    XCTAssertEqual(appleConfig.requiredBillingContactFields, JPContactFieldAll);
}

/*
 * GIVEN: a configuration NSDictionary is passed to the Apple Pay wrapper
 *
 * WHEN:  the [requiredShippingContactFields] property is not an integer
 *
 * THEN:  an 'invalid required shipping field' exception should be thrown
 */
- (void)test_OnInvalidRequiredShippingFields_ThrowError {
    NSDictionary *config = [self configurationByChangingValue:@"hello" forKey:@"requiredShippingContactFields"];
    XCTAssertThrows([RNApplePayWrappers applePayConfigurationFromConfiguration:config]);
}

/*
 * GIVEN: a configuration NSDictionary is passed to the Apple Pay wrapper
 *
 * WHEN:  the [requiredShippingContactFields] value is set to 1
 *
 * THEN:  Postal Code must be set as a contact field
 */
- (void)test_OnRequiredShippingFieldsValueOne_SetPostalCode {
    NSDictionary *config = [self configurationByChangingValue:@1 forKey:@"requiredShippingContactFields"];
    JPApplePayConfiguration *appleConfig = [RNApplePayWrappers applePayConfigurationFromConfiguration:config];
    XCTAssertEqual(appleConfig.requiredShippingContactFields, JPContactFieldPostalAddress);
}

/*
 * GIVEN: a configuration NSDictionary is passed to the Apple Pay wrapper
 *
 * WHEN:  the [requiredShippingContactFields] value is set to 2
 *
 * THEN:  Phone must be set as a contact field
 */
- (void)test_OnRequiredShippingFieldsValueTwo_SetPhone {
    NSDictionary *config = [self configurationByChangingValue:@2 forKey:@"requiredShippingContactFields"];
    JPApplePayConfiguration *appleConfig = [RNApplePayWrappers applePayConfigurationFromConfiguration:config];
    XCTAssertEqual(appleConfig.requiredShippingContactFields, JPContactFieldPhone);
}

/*
 * GIVEN: a configuration NSDictionary is passed to the Apple Pay wrapper
 *
 * WHEN:  the [requiredShippingContactFields] value is set to 4
 *
 * THEN:  Email must be set as a contact field
 */
- (void)test_OnRequiredShippingFieldsValueFour_SetEmail {
    NSDictionary *config = [self configurationByChangingValue:@4 forKey:@"requiredShippingContactFields"];
    JPApplePayConfiguration *appleConfig = [RNApplePayWrappers applePayConfigurationFromConfiguration:config];
    XCTAssertEqual(appleConfig.requiredShippingContactFields, JPContactFieldEmail);
}

/*
 * GIVEN: a configuration NSDictionary is passed to the Apple Pay wrapper
 *
 * WHEN:  the [requiredShippingContactFields] value is set to 8
 *
 * THEN:  Name must be set as a contact field
 */
- (void)test_OnRequiredShippingFieldsValueEight_SetName {
    NSDictionary *config = [self configurationByChangingValue:@8 forKey:@"requiredShippingContactFields"];
    JPApplePayConfiguration *appleConfig = [RNApplePayWrappers applePayConfigurationFromConfiguration:config];
    XCTAssertEqual(appleConfig.requiredShippingContactFields, JPContactFieldName);
}

/*
 * GIVEN: a configuration NSDictionary is passed to the Apple Pay wrapper
 *
 * WHEN:  the [requiredShippingContactFields] value is set to 16
 *
 * THEN:  All contact fields must be set
 */
- (void)test_OnRequiredShippingFieldsValueSixteen_SetName {
    NSDictionary *config = [self configurationByChangingValue:@16 forKey:@"requiredShippingContactFields"];
    JPApplePayConfiguration *appleConfig = [RNApplePayWrappers applePayConfigurationFromConfiguration:config];
    XCTAssertEqual(appleConfig.requiredShippingContactFields, JPContactFieldAll);
}


/*
 * GIVEN: a configuration NSDictionary is passed to the Apple Pay wrapper
 *
 * WHEN:  the [shippingMethods] property is not an NSArray
 *
 * THEN:  an 'invalid shipping method' exception should be thrown
 */
- (void)test_OnInvalidShippingMethod_ThrowError {
    NSDictionary *config = [self configurationByChangingValue:@"hello" forKey:@"shippingMethods"];
    XCTAssertThrows([RNApplePayWrappers applePayConfigurationFromConfiguration:config]);
}

/*
 * GIVEN: a configuration NSDictionary is passed to the Apple Pay wrapper
 *
 * WHEN:  the [shippingMethods] array elements are not of NSDictionary type
 *
 * THEN:  an 'invalid shipping method elements' exception should be thrown
 */
- (void)test_OnInvalidShippingMethodElements_ThrowError {
    NSDictionary *config = [self configurationByChangingValue:@[@"hello"] forKey:@"shippingMethods"];
    XCTAssertThrows([RNApplePayWrappers applePayConfigurationFromConfiguration:config]);
}

/*
 * GIVEN: a configuration NSDictionary is passed to the Apple Pay wrapper
 *
 * WHEN:  the [shippingMethods] element does not have an identifier
 *
 * THEN:  a 'missing shipping method identifier' exception should be thrown
 */
- (void)test_OnMissingShippingMethodIdentifier_ThrowError {
    NSDictionary *config = [self configurationByChangingValue:nil
                                                       forKey:@"identifier"
                                                 forArrayName:@"shippingMethods"];
    XCTAssertThrows([RNApplePayWrappers applePayConfigurationFromConfiguration:config]);
}

/*
 * GIVEN: a configuration NSDictionary is passed to the Apple Pay wrapper
 *
 * WHEN:  the [shippingMethods] element identifier is not an NSString
 *
 * THEN:  a 'invalid shipping method identifier' exception should be thrown
 */
- (void)test_OnInvalidShippingMethodIdentifier_ThrowError {
    NSDictionary *config = [self configurationByChangingValue:@123
                                                       forKey:@"identifier"
                                                 forArrayName:@"shippingMethods"];
    XCTAssertThrows([RNApplePayWrappers applePayConfigurationFromConfiguration:config]);
}

/*
 * GIVEN: a configuration NSDictionary is passed to the Apple Pay wrapper
 *
 * WHEN:  the [shippingMethods] element does not have a detail
 *
 * THEN:  a 'missing shipping method detail' exception should be thrown
 */
- (void)test_OnMissingShippingMethodDetail_ThrowError {
    NSDictionary *config = [self configurationByChangingValue:nil
                                                       forKey:@"detail"
                                                 forArrayName:@"shippingMethods"];
    XCTAssertThrows([RNApplePayWrappers applePayConfigurationFromConfiguration:config]);
}

/*
 * GIVEN: a configuration NSDictionary is passed to the Apple Pay wrapper
 *
 * WHEN:  the [shippingMethods] element detail is not an NSString
 *
 * THEN:  a 'invalid shipping method detail' exception should be thrown
 */
- (void)test_OnInvalidShippingMethodDetail_ThrowError {
    NSDictionary *config = [self configurationByChangingValue:@123
                                                       forKey:@"detail"
                                                 forArrayName:@"shippingMethods"];
    XCTAssertThrows([RNApplePayWrappers applePayConfigurationFromConfiguration:config]);
}

/*
 * GIVEN: a configuration NSDictionary is passed to the Apple Pay wrapper
 *
 * WHEN:  the [shippingMethods] element does not have a label
 *
 * THEN:  a 'missing shipping method label' exception should be thrown
 */
- (void)test_OnMissingShippingMethodLabel_ThrowError {
    NSDictionary *config = [self configurationByChangingValue:nil
                                                       forKey:@"label"
                                                 forArrayName:@"shippingMethods"];
    XCTAssertThrows([RNApplePayWrappers applePayConfigurationFromConfiguration:config]);
}

/*
 * GIVEN: a configuration NSDictionary is passed to the Apple Pay wrapper
 *
 * WHEN:  the [shippingMethods] element label is not an NSString
 *
 * THEN:  a 'invalid shipping method label' exception should be thrown
 */
- (void)test_OnInvalidShippingMethodLabel_ThrowError {
    NSDictionary *config = [self configurationByChangingValue:@123
                                                       forKey:@"label"
                                                 forArrayName:@"shippingMethods"];
    XCTAssertThrows([RNApplePayWrappers applePayConfigurationFromConfiguration:config]);
}

/*
 * GIVEN: a configuration NSDictionary is passed to the Apple Pay wrapper
 *
 * WHEN:  the [shippingMethods] element does not have an amount
 *
 * THEN:  a 'missing shipping method amount' exception should be thrown
 */
- (void)test_OnMissingShippingMethodAmount_ThrowError {
    NSDictionary *config = [self configurationByChangingValue:nil
                                                       forKey:@"amount"
                                                 forArrayName:@"shippingMethods"];
    XCTAssertThrows([RNApplePayWrappers applePayConfigurationFromConfiguration:config]);
}

/*
 * GIVEN: a configuration NSDictionary is passed to the Apple Pay wrapper
 *
 * WHEN:  the [shippingMethods] element amount is not an NSString
 *
 * THEN:  a 'invalid shipping method amount' exception should be thrown
 */
- (void)test_OnInvalidShippingMethodAmount_ThrowError {
    NSDictionary *config = [self configurationByChangingValue:@123
                                                       forKey:@"amount"
                                                 forArrayName:@"shippingMethods"];
    XCTAssertThrows([RNApplePayWrappers applePayConfigurationFromConfiguration:config]);
}

/*
 * GIVEN: a configuration NSDictionary is passed to the Apple Pay wrapper
 *
 * WHEN:  the [shippingMethods] element does not have a type
 *
 * THEN:  a 'missing shipping method type' exception should be thrown
 */
- (void)test_OnMissingShippingMethodType_ThrowError {
    NSDictionary *config = [self configurationByChangingValue:nil
                                                       forKey:@"type"
                                                 forArrayName:@"shippingMethods"];
    XCTAssertThrows([RNApplePayWrappers applePayConfigurationFromConfiguration:config]);
}

/*
 * GIVEN: a configuration NSDictionary is passed to the Apple Pay wrapper
 *
 * WHEN:  the [shippingMethods] element type is not an integer
 *
 * THEN:  a 'invalid shipping method type' exception should be thrown
 */
- (void)test_OnInvalidShippingMethodType_ThrowError {
    NSDictionary *config = [self configurationByChangingValue:@"hello"
                                                       forKey:@"type"
                                                 forArrayName:@"shippingMethods"];
    XCTAssertThrows([RNApplePayWrappers applePayConfigurationFromConfiguration:config]);
}

/*
 * GIVEN: a configuration NSDictionary is passed to the Apple Pay wrapper
 *
 * WHEN:  the [shippingType] property is not an integer
 *
 * THEN:  an 'invalid shipping type' exception should be thrown
 */
- (void)test_OnInvalidShippingType_ThrowError {
    NSDictionary *config = [self configurationByChangingValue:@"hello" forKey:@"shippingType"];
    XCTAssertThrows([RNApplePayWrappers applePayConfigurationFromConfiguration:config]);
}

/*
 * GIVEN: a configuration NSDictionary is passed to the Apple Pay wrapper
 *
 * WHEN:  the [shippingType] integer value goes beyond the available scope
 *
 * THEN:  an 'invalid shipping type value' exception should be thrown
 */
- (void)test_OnInvalidShippingTypeValue_ThrowError {
    NSDictionary *config = [self configurationByChangingValue:@123 forKey:@"shippingType"];
    XCTAssertThrows([RNApplePayWrappers applePayConfigurationFromConfiguration:config]);
}

/*
 * GIVEN: a configuration NSDictionary is passed to the Apple Pay wrapper
 *
 * WHEN:  the [shippingType] value is set to 0
 *
 * THEN:  Shipping option should be set
 */
- (void)test_OnShippingTypeValueZero_SetShipping {
    NSDictionary *config = [self configurationByChangingValue:@0 forKey:@"shippingType"];
    JPApplePayConfiguration *appleConfig = [RNApplePayWrappers applePayConfigurationFromConfiguration:config];
    XCTAssertEqual(appleConfig.shippingType, JPShippingTypeShipping);
}

/*
 * GIVEN: a configuration NSDictionary is passed to the Apple Pay wrapper
 *
 * WHEN:  the [shippingType] value is set to 1
 *
 * THEN:  Delivery option should be set
 */
- (void)test_OnShippingTypeValueOne_SetDelivery {
    NSDictionary *config = [self configurationByChangingValue:@1 forKey:@"shippingType"];
    JPApplePayConfiguration *appleConfig = [RNApplePayWrappers applePayConfigurationFromConfiguration:config];
    XCTAssertEqual(appleConfig.shippingType, JPShippingTypeDelivery);
}

/*
 * GIVEN: a configuration NSDictionary is passed to the Apple Pay wrapper
 *
 * WHEN:  the [shippingType] value is set to 2
 *
 * THEN:  Store Pickup option should be set
 */
- (void)test_OnShippingTypeValueTwo_SetStorePickup {
    NSDictionary *config = [self configurationByChangingValue:@2 forKey:@"shippingType"];
    JPApplePayConfiguration *appleConfig = [RNApplePayWrappers applePayConfigurationFromConfiguration:config];
    XCTAssertEqual(appleConfig.shippingType, JPShippingTypeStorePickup);
}

/*
 * GIVEN: a configuration NSDictionary is passed to the Apple Pay wrapper
 *
 * WHEN:  the [shippingType] value is set to 3
 *
 * THEN:  Service Pickup option should be set
 */
- (void)test_OnShippingTypeValueThree_SetServicePickup {
    NSDictionary *config = [self configurationByChangingValue:@3 forKey:@"shippingType"];
    JPApplePayConfiguration *appleConfig = [RNApplePayWrappers applePayConfigurationFromConfiguration:config];
    XCTAssertEqual(appleConfig.shippingType, JPShippingTypeServicePickup);
}

/*
 * GIVEN: a configuration NSDictionary is passed to the Apple Pay wrapper
 *
 * WHEN:  the [returnedInfo] property is not an integer
 *
 * THEN:  an 'invalid returned info' exception should be thrown
 */
- (void)test_OnInvalidReturnedInfo_ThrowError {
    NSDictionary *config = [self configurationByChangingValue:@"hello" forKey:@"returnedInfo"];
    XCTAssertThrows([RNApplePayWrappers applePayConfigurationFromConfiguration:config]);
}

/*
 * GIVEN: a configuration NSDictionary is passed to the Apple Pay wrapper
 *
 * WHEN:  the [returnedInfo] value is set to 1
 *
 * THEN:  Billing return info should be set
 */
- (void)test_OnReturnedInfoValueZero_SetBilling {
    NSDictionary *config = [self configurationByChangingValue:@1 forKey:@"returnedInfo"];
    JPApplePayConfiguration *appleConfig = [RNApplePayWrappers applePayConfigurationFromConfiguration:config];
    XCTAssertEqual(appleConfig.returnedContactInfo, JPReturnedInfoBillingContacts);
}

/*
 * GIVEN: a configuration NSDictionary is passed to the Apple Pay wrapper
 *
 * WHEN:  the [returnedInfo] value is set to 2
 *
 * THEN:  Shipping return info should be set
 */
- (void)test_OnReturnedInfoValueOne_SetShipping {
    NSDictionary *config = [self configurationByChangingValue:@2 forKey:@"returnedInfo"];
    JPApplePayConfiguration *appleConfig = [RNApplePayWrappers applePayConfigurationFromConfiguration:config];
    XCTAssertEqual(appleConfig.returnedContactInfo, JPReturnedInfoShippingContacts);
}

/*
 * GIVEN: a configuration NSDictionary is passed to the Apple Pay wrapper
 *
 * WHEN:  the [returnedInfo] value is set to 3
 *
 * THEN:  All return info should be set
 */
- (void)test_OnReturnedInfoValueOne_SetAll {
    NSDictionary *config = [self configurationByChangingValue:@4 forKey:@"returnedInfo"];
    JPApplePayConfiguration *appleConfig = [RNApplePayWrappers applePayConfigurationFromConfiguration:config];
    XCTAssertEqual(appleConfig.returnedContactInfo, JPReturnedInfoAll);
}

#pragma mark - Helpers

- (NSMutableDictionary *)configurationByChangingValue:(id)value
                                               forKey:(NSString *)key {

    NSMutableDictionary *mockConfig = RNMocks.configuration;
    NSMutableDictionary *mockAppleConfig = RNMocks.applePayConfiguration;

    mockAppleConfig[key] = value;
    mockConfig[@"applePayConfiguration"] = mockAppleConfig;

    return mockConfig;
}

- (NSMutableDictionary *)configurationByChangingValue:(id)value
                                               forKey:(NSString *)key
                                         forArrayName:(NSString *)name {

    NSMutableDictionary *mockConfig = RNMocks.configuration;
    NSMutableDictionary *mockAppleConfig = RNMocks.applePayConfiguration;

    NSArray *items = mockAppleConfig[name];
    NSMutableDictionary *firstItem = [items.firstObject mutableCopy];
    firstItem[key] = value;

    mockAppleConfig[name] = @[firstItem];
    mockConfig[@"applePayConfiguration"] = mockAppleConfig;

    return mockConfig;
}

@end
