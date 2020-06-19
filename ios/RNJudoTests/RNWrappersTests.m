//
//  RNWrappersTest.m
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

#import <XCTest/XCTest.h>
#import "RNWrappers.h"
#import "RNMocks.h"

@interface RNWrappersTest : XCTestCase

@end

@implementation RNWrappersTest

/*
 * GIVEN: a configuration NSDictionary is passed to the wrapper
 *
 * WHEN:  the NSDictionary is valid
 *
 * THEN:  a configured JPConfiguration instance should be returned
 */
- (void)test_OnValidDictionary_ReturnConfiguration {
    NSDictionary *mockProps = RNMocks.properties;
    XCTAssertNotNil([RNWrappers judoSessionFromProperties:mockProps]);
}

/*
 * GIVEN: a configuration NSDictionary is passed to the wrapper
 *
 * WHEN:  the [token] property is missing
 *
 * THEN:  a 'missing API token' exception should be thrown
 */
- (void)test_OnMissingToken_ThrowError {
    NSDictionary *props = [self propertiesByChangingValue:nil forKey:@"token"];
    XCTAssertThrows([RNWrappers judoSessionFromProperties:props]);
}

/*
* GIVEN: a configuration NSDictionary is passed to the wrapper
*
* WHEN:  the [token] property is not an NSString
*
* THEN:  an 'invalid API token' exception should be thrown
*/
- (void)test_OnInvalidToken_ThrowError {
    NSDictionary *props = [self propertiesByChangingValue:@123 forKey:@"token"];
    XCTAssertThrows([RNWrappers judoSessionFromProperties:props]);
}

/*
 * GIVEN: a configuration NSDictionary is passed to the wrapper
 *
 * WHEN:  the [secret] property is missing
 *
 * THEN:  a 'missing API secret' exception should be thrown
 */
- (void)test_OnMissingSecret_ThrowError {
    NSDictionary *props = [self propertiesByChangingValue:nil forKey:@"secret"];
    XCTAssertThrows([RNWrappers judoSessionFromProperties:props]);
}

/*
* GIVEN: a configuration NSDictionary is passed to the wrapper
*
* WHEN:  the [secret] property is not an NSString
*
* THEN:  an 'invalid API secret' exception should be thrown
*/
- (void)test_OnInvalidSecret_ThrowError {
    NSDictionary *props = [self propertiesByChangingValue:@123 forKey:@"secret"];
    XCTAssertThrows([RNWrappers judoSessionFromProperties:props]);
}

/*
 * GIVEN: a configuration NSDictionary is passed to the wrapper
 *
 * WHEN:  the [sandboxed] property is missing
 *
 * THEN:  a 'missing sandbox setting' exception should be thrown
 */
- (void)test_OnMissingSandbox_ThrowError {
    NSDictionary *props = [self propertiesByChangingValue:nil forKey:@"sandboxed"];
    XCTAssertThrows([RNWrappers judoSessionFromProperties:props]);
}

/*
* GIVEN: a configuration NSDictionary is passed to the wrapper
*
* WHEN:  the [sandboxed] property is not an integer
*
* THEN:  an 'invalid sandbox setting' exception should be thrown
*/
- (void)test_OnInvalidSandbox_ThrowError {
    NSDictionary *props = [self propertiesByChangingValue:@"true" forKey:@"sandboxed"];
    XCTAssertThrows([RNWrappers judoSessionFromProperties:props]);
}

/*
 * GIVEN: a configuration NSDictionary is passed to the wrapper
 *
 * WHEN:  the [transactionType] property is missing
 *
 * THEN:  a 'missing transaction type' exception should be thrown
 */
- (void)test_OnMissingTransactionTypes_ThrowError {
    NSMutableDictionary *mockProps = RNMocks.properties;
    mockProps[@"transactionType"] = nil;
    XCTAssertThrows([RNWrappers transactionTypeFromProperties:mockProps]);
}

/*
* GIVEN: a configuration NSDictionary is passed to the wrapper
*
* WHEN:  the [transactionType] property is not an integer
*
* THEN:  an 'invalid transaction type' exception should be thrown
*/
- (void)test_OnInvalidTransactionType_ThrowError {
    NSMutableDictionary *mockProps = RNMocks.properties;
    mockProps[@"transactionType"] = @"hello";
    XCTAssertThrows([RNWrappers transactionTypeFromProperties:mockProps]);
}

/*
* GIVEN: a configuration NSDictionary is passed to the wrapper
*
* WHEN:  the [transactionMode] property is missing
*
* THEN:  a 'missing transaction mode' exception should be thrown
*/
- (void)test_OnMissingTransactionMode_ThrowError {
    NSMutableDictionary *mockProps = RNMocks.properties;
    mockProps[@"transactionMode"] = nil;
    XCTAssertThrows([RNWrappers transactionModeFromProperties:mockProps]);
}

/*
* GIVEN: a configuration NSDictionary is passed to the wrapper
*
* WHEN:  the [transactionMode] property is not an integer
*
* THEN:  an 'invalid transaction mode' exception should be thrown
*/
- (void)test_OnInvalidTransactionMode_ThrowError {
    NSMutableDictionary *mockProps = RNMocks.properties;
    mockProps[@"transactionMode"] = @"hello";
    XCTAssertThrows([RNWrappers transactionModeFromProperties:mockProps]);
}

/*
 * GIVEN: a configuration NSDictionary is passed to the wrapper
 *
 * WHEN:  the [configuration] property is missing
 *
 * THEN:  a 'missing configuration' exception should be thrown
 */
- (void)test_OnMissingConfiguration_ThrowError {
    NSMutableDictionary *mockProps = RNMocks.properties;
    mockProps[@"configuration"] = nil;
    XCTAssertThrows([RNWrappers configurationFromProperties:mockProps]);
}

/*
* GIVEN: a configuration NSDictionary is passed to the wrapper
*
* WHEN:  the [configuration] property is not an NSDictionary
*
* THEN:  an 'invalid configuration' exception should be thrown
*/
- (void)test_OnInvalidConfiguration_ThrowError {
    NSMutableDictionary *mockProps = RNMocks.properties;
    mockProps[@"configuration"] = @"hello";
    XCTAssertThrows([RNWrappers configurationFromProperties:mockProps]);
}

/*
 * GIVEN: a configuration NSDictionary is passed to the wrapper with a valid [configuration] property
 *
 * WHEN:  the [judoId] property of the [configuration] dictionary is missing
 *
 * THEN:  a 'missing Judo ID' exception should be thrown
 */
- (void)test_OnMissingJudoId_ThrowError {
    NSDictionary *props = [self propertiesWithConfigurationValue:nil forKey:@"judoId"];
    XCTAssertThrows([RNWrappers configurationFromProperties:props]);
}

/*
* GIVEN: a configuration NSDictionary is passed to the wrapper with a valid [configuration] property
*
* WHEN:  the [judoId] property of the [configuration] dictionary is not an NSString
*
* THEN:  a 'invalid Judo ID' exception should be thrown
*/
- (void)test_OnInvalidJudoId_ThrowError {
    NSDictionary *props = [self propertiesWithConfigurationValue:@123 forKey:@"judoId"];
    XCTAssertThrows([RNWrappers configurationFromProperties:props]);
}

/*
 * GIVEN: a configuration NSDictionary is passed to the wrapper with a valid [configuration] property
 *
 * WHEN:  the [amount] property of the [configuration] dictionary is missing
 *
 * THEN:  a 'missing amount' exception should be thrown
 */
- (void)test_OnMissingAmount_ThrowError {
    NSDictionary *props = [self propertiesWithConfigurationValue:nil forKey:@"amount"];
    XCTAssertThrows([RNWrappers configurationFromProperties:props]);
}

/*
* GIVEN: a configuration NSDictionary is passed to the wrapper with a valid [configuration] property
*
* WHEN:  the [amount] property of the [configuration] dictionary is not an NSDictionary
*
* THEN:  a 'invalid amount' exception should be thrown
*/
- (void)test_OnInvalidAmount_ThrowError {
    NSDictionary *props = [self propertiesWithConfigurationValue:@"hello" forKey:@"amount"];
    XCTAssertThrows([RNWrappers configurationFromProperties:props]);
}

/*
 * GIVEN: a configuration NSDictionary is passed to the wrapper with a valid [configuration] property
 *
 * WHEN:  the [value] property of the [amount] dictionary is missing
 *
 * THEN:  a 'missing amount value' exception should be thrown
 */
- (void)test_OnMissingAmountValue_ThrowError {
    NSDictionary *props = [self propertiesWithConfigurationValue:nil
                                                          forKey:@"value"
                                                orDictionaryName:@"amount"];
    XCTAssertThrows([RNWrappers configurationFromProperties:props]);
}

/*
* GIVEN: a configuration NSDictionary is passed to the wrapper with a valid [configuration] property
*
* WHEN:  the [value] property of the [amount] dictionary is not an NSString
*
* THEN:  an 'invalid amount value' exception should be thrown
*/
- (void)test_OnInvalidAmountValue_ThrowError {
    NSDictionary *props = [self propertiesWithConfigurationValue:@123
                                                          forKey:@"value"
                                                orDictionaryName:@"amount"];
    XCTAssertThrows([RNWrappers configurationFromProperties:props]);
}

/*
 * GIVEN: a configuration NSDictionary is passed to the wrapper with a valid [configuration] property
 *
 * WHEN:  the [currency] property of the [amount] dictionary is missing
 *
 * THEN:  a 'missing amount currency' exception should be thrown
 */
- (void)test_OnMissingAmountCurrency_ThrowError {
    NSDictionary *props = [self propertiesWithConfigurationValue:nil
                                                          forKey:@"currency"
                                                orDictionaryName:@"amount"];
    XCTAssertThrows([RNWrappers configurationFromProperties:props]);
}

/*
* GIVEN: a configuration NSDictionary is passed to the wrapper with a valid [configuration] property
*
* WHEN:  the [currency] property of the [amount] dictionary is not an NSString
*
* THEN:  an 'invalid amount currency' exception should be thrown
*/
- (void)test_OnInvalidAmountCurrency_ThrowError {
    NSDictionary *props = [self propertiesWithConfigurationValue:@123
                                                          forKey:@"currency"
                                                orDictionaryName:@"amount"];
    XCTAssertThrows([RNWrappers configurationFromProperties:props]);
}

/*
 * GIVEN: a configuration NSDictionary is passed to the wrapper with a valid [configuration] property
 *
 * WHEN:  the [reference] property of the [configuration] dictionary is missing
 *
 * THEN:  a 'missing reference' exception should be thrown
 */
- (void)test_OnMissingReference_ThrowError {
    NSDictionary *props = [self propertiesWithConfigurationValue:nil forKey:@"reference"];
    XCTAssertThrows([RNWrappers configurationFromProperties:props]);
}

/*
* GIVEN: a configuration NSDictionary is passed to the wrapper with a valid [configuration] property
*
* WHEN:  the [reference] property of the [configuration] dictionary is not an NSDictionary
*
* THEN:  an 'invalid reference' exception should be thrown
*/
- (void)test_OnInvalidReference_ThrowError {
    NSDictionary *props = [self propertiesWithConfigurationValue:@123 forKey:@"reference"];
    XCTAssertThrows([RNWrappers configurationFromProperties:props]);
}

/*
 * GIVEN: a configuration NSDictionary is passed to the wrapper with a valid [configuration] property
 *
 * WHEN:  the [consumerReference] property of the [reference] dictionary is missing
 *
 * THEN:  a 'missing consumer reference' exception should be thrown
 */
- (void)test_OnMissingConsumerReference_ThrowError {
    NSDictionary *props = [self propertiesWithConfigurationValue:nil
                                                          forKey:@"consumerReference"
                                                orDictionaryName:@"reference"];
    XCTAssertThrows([RNWrappers configurationFromProperties:props]);
}

/*
* GIVEN: a configuration NSDictionary is passed to the wrapper with a valid [configuration] property
*
* WHEN:  the [consumerReference] property of the [reference] dictionary is not an NSString
*
* THEN:  an 'invalid consumer reference' exception should be thrown
*/
- (void)test_OnInvalidConsumerReference_ThrowError {
    NSDictionary *props = [self propertiesWithConfigurationValue:@123
                                                          forKey:@"consumerReference"
                                                orDictionaryName:@"reference"];
    XCTAssertThrows([RNWrappers configurationFromProperties:props]);
}

/*
* GIVEN: a configuration NSDictionary is passed to the wrapper with a valid [configuration] property
*
* WHEN:  the [paymentReference] property of the [reference] dictionary is not an NSString
*
* THEN:  an 'invalid payment reference' exception should be thrown
*/
- (void)test_OnInvalidPaymentReference_ThrowError {
    NSDictionary *props = [self propertiesWithConfigurationValue:@123
                                                          forKey:@"paymentReference"
                                                orDictionaryName:@"reference"];
    XCTAssertThrows([RNWrappers configurationFromProperties:props]);
}

/*
* GIVEN: a configuration NSDictionary is passed to the wrapper with a valid [configuration] property
*
* WHEN:  the [metadata] property of the [reference] dictionary is not an NSDictionary
*
* THEN:  an 'invalid reference metadata' exception should be thrown
*/
- (void)test_OnInvalidReferenceMetadata_ThrowError {
    NSDictionary *props = [self propertiesWithConfigurationValue:@123
                                                          forKey:@"metadata"
                                                orDictionaryName:@"reference"];
    XCTAssertThrows([RNWrappers configurationFromProperties:props]);
}

/*
* GIVEN: a configuration NSDictionary is passed to the wrapper with a valid [configuration] property
*
* WHEN:  the [siteId] property of the [configuration] dictionary is not an NSString
*
* THEN:  an 'invalid Site ID' exception should be thrown
*/
- (void)test_OnInvalidSiteID_ThrowError {
    NSDictionary *props = [self propertiesWithConfigurationValue:@123 forKey:@"siteId"];
    XCTAssertThrows([RNWrappers configurationFromProperties:props]);
}

/*
* GIVEN: a configuration NSDictionary is passed to the wrapper with a valid [configuration] property
*
* WHEN:  the [cardAddress] property of the [configuration] dictionary is not an NSDictionary
*
* THEN:  an 'invalid card address' exception should be thrown
*/
- (void)test_OnInvalidCardAddress_ThrowError {
    NSDictionary *props = [self propertiesWithConfigurationValue:@123 forKey:@"cardAddress"];
    XCTAssertThrows([RNWrappers configurationFromProperties:props]);
}

/*
* GIVEN: a configuration NSDictionary is passed to the wrapper with a valid [configuration] property
*
* WHEN:  the [line1] property of the [cardAddress] dictionary is not an NSString
*
* THEN:  an 'invalid card address line 1' exception should be thrown
*/
- (void)test_OnInvalidCardAddressLine1_ThrowError {
    NSDictionary *props = [self propertiesWithConfigurationValue:@123
                                                          forKey:@"line1"
                                                orDictionaryName:@"cardAddress"];
    XCTAssertThrows([RNWrappers configurationFromProperties:props]);
}

/*
* GIVEN: a configuration NSDictionary is passed to the wrapper with a valid [configuration] property
*
* WHEN:  the [line2] property of the [cardAddress] dictionary is not an NSString
*
* THEN:  an 'invalid card address line 2' exception should be thrown
*/
- (void)test_OnInvalidCardAddressLine2_ThrowError {
    NSDictionary *props = [self propertiesWithConfigurationValue:@123
                                                          forKey:@"line2"
                                                orDictionaryName:@"cardAddress"];
    XCTAssertThrows([RNWrappers configurationFromProperties:props]);
}

/*
* GIVEN: a configuration NSDictionary is passed to the wrapper with a valid [configuration] property
*
* WHEN:  the [line3] property of the [cardAddress] dictionary is not an NSString
*
* THEN:  an 'invalid card address line 3' exception should be thrown
*/
- (void)test_OnInvalidCardAddressLine3_ThrowError {
    NSDictionary *props = [self propertiesWithConfigurationValue:@123
                                                          forKey:@"line3"
                                                orDictionaryName:@"cardAddress"];
    XCTAssertThrows([RNWrappers configurationFromProperties:props]);
}

/*
* GIVEN: a configuration NSDictionary is passed to the wrapper with a valid [configuration] property
*
* WHEN:  the [postCode] property of the [cardAddress] dictionary is not an NSString
*
* THEN:  an 'invalid card address post code' exception should be thrown
*/
- (void)test_OnInvalidCardAddressPostCode_ThrowError {
    NSDictionary *props = [self propertiesWithConfigurationValue:@123
                                                          forKey:@"postCode"
                                                orDictionaryName:@"cardAddress"];
    XCTAssertThrows([RNWrappers configurationFromProperties:props]);
}

/*
* GIVEN: a configuration NSDictionary is passed to the wrapper with a valid [configuration] property
*
* WHEN:  the [town] property of the [cardAddress] dictionary is not an NSString
*
* THEN:  an 'invalid card address town' exception should be thrown
*/
- (void)test_OnInvalidCardAddressTown_ThrowError {
    NSDictionary *props = [self propertiesWithConfigurationValue:@123
                                                          forKey:@"town"
                                                orDictionaryName:@"cardAddress"];
    XCTAssertThrows([RNWrappers configurationFromProperties:props]);
}

/*
* GIVEN: a configuration NSDictionary is passed to the wrapper with a valid [configuration] property
*
* WHEN:  the [countryCode] property of the [cardAddress] dictionary is not an integer
*
* THEN:  an 'invalid card address country code' exception should be thrown
*/
- (void)test_OnInvalidCardAddressCountryCode_ThrowError {
    NSDictionary *props = [self propertiesWithConfigurationValue:@"hello"
                                                          forKey:@"countryCode"
                                                orDictionaryName:@"cardAddress"];
    XCTAssertThrows([RNWrappers configurationFromProperties:props]);
}

/*
* GIVEN: a configuration NSDictionary is passed to the wrapper with a valid [configuration] property
*
* WHEN:  the [uiConfiguration] property of the [configuration] dictionary is missing
*
* THEN:  set the default UI Configuration
*/
- (void)test_OnMissingUIConfiguration_SetDefault {
    NSDictionary *props = [self propertiesWithConfigurationValue:nil forKey:@"uiConfiguration"];
    JPConfiguration *config = [RNWrappers configurationFromProperties:props];
    XCTAssertNotNil(config.uiConfiguration);
}

/*
* GIVEN: a configuration NSDictionary is passed to the wrapper with a valid [configuration] property
*
* WHEN:  the [uiConfiguration] property of the [configuration] dictionary is not an NSDictionary
*
* THEN:  an 'invalid UI configuration' exception should be thrown
*/
- (void)test_OnInvalidUIConfiguration_ThrowError {
    NSDictionary *props = [self propertiesWithConfigurationValue:@123 forKey:@"uiConfiguration"];
    XCTAssertThrows([RNWrappers configurationFromProperties:props]);
}

/*
* GIVEN: a configuration NSDictionary is passed to the wrapper with a valid [configuration] property
*
* WHEN:  the [isAVSEnabled] property of the [uiConfiguration] dictionary is not an integer
*
* THEN:  an 'invalid AVS setting' exception should be thrown
*/
- (void)test_OnInvalidUIConfigurationAVSEnabled_ThrowError {
    NSDictionary *props = [self propertiesWithConfigurationValue:@"hello"
                                                          forKey:@"isAVSEnabled"
                                                orDictionaryName:@"uiConfiguration"];
    XCTAssertThrows([RNWrappers configurationFromProperties:props]);
}

/*
* GIVEN: a configuration NSDictionary is passed to the wrapper with a valid [configuration] property
*
* WHEN:  the [shouldPaymentMethodsDisplayAmount] property of the [uiConfiguration] dictionary is not an integer
*
* THEN:  an 'invalid amount display setting' exception should be thrown
*/
- (void)test_OnInvalidUIConfigurationDisplayAmount_ThrowError {
    NSDictionary *props = [self propertiesWithConfigurationValue:@"hello"
                                                          forKey:@"shouldPaymentMethodsDisplayAmount"
                                                orDictionaryName:@"uiConfiguration"];
    XCTAssertThrows([RNWrappers configurationFromProperties:props]);
}

/*
* GIVEN: a configuration NSDictionary is passed to the wrapper with a valid [configuration] property
*
* WHEN:  the [shouldPaymentButtonDisplayAmount] property of the [uiConfiguration] dictionary is not an integer
*
* THEN:  an 'invalid payment button amount display setting' exception should be thrown
*/
- (void)test_OnInvalidUIConfigurationPayButtonAmountVisibility_ThrowError {
    NSDictionary *props = [self propertiesWithConfigurationValue:@"hello"
                                                          forKey:@"shouldPaymentButtonDisplayAmount"
                                                orDictionaryName:@"uiConfiguration"];

    XCTAssertThrows([RNWrappers configurationFromProperties:props]);
}

/*
* GIVEN: a configuration NSDictionary is passed to the wrapper with a valid [configuration] property
*
* WHEN:  the [shouldPaymentMethodsVerifySecurityCode] property of the [uiConfiguration] dictionary is 
*        not an integer
*
* THEN:  an 'invalid secure code check setting type' exception should be thrown
*/
- (void)test_OnInvalidUIConfigurationCV2EnabledType_ThrowError {
    NSDictionary *props = [self propertiesWithConfigurationValue:@"hello"
                                                          forKey:@"shouldPaymentMethodsVerifySecurityCode"
                                                orDictionaryName:@"uiConfiguration"];

    XCTAssertThrows([RNWrappers configurationFromProperties:props]);
}

/*
* GIVEN: a configuration NSDictionary is passed to the wrapper with a valid [configuration] property
*
* WHEN:  the [theme] property of the [uiConfiguration] dictionary is missing
*
* THEN:  set the default JPTheme object
*/
- (void)test_OnMissingUIConfigurationTheme_SetDefault {
    NSDictionary *props = [self propertiesWithConfigurationValue:nil
                                                          forKey:@"theme"
                                                orDictionaryName:@"uiConfiguration"];
    JPConfiguration *config = [RNWrappers configurationFromProperties:props];
    XCTAssertNotNil(config.uiConfiguration.theme);
}

/*
* GIVEN: a configuration NSDictionary is passed to the wrapper with a valid [configuration] property
*
* WHEN:  the [theme] property of the [uiConfiguration] dictionary is not an NSDictionary
*
* THEN:  an 'invalid theme' exception should be thrown
*/
- (void)test_OnInvalidUIConfigurationTheme_ThrowError {
    NSDictionary *props = [self propertiesWithConfigurationValue:@"hello"
                                                          forKey:@"theme"
                                                orDictionaryName:@"uiConfiguration"];
    XCTAssertThrows([RNWrappers configurationFromProperties:props]);
}

/*
* GIVEN: a configuration NSDictionary is passed to the wrapper with a valid [configuration] property
*
* WHEN:  the [paymentMethods] property of the [configuration] dictionary is not an integer
*
* THEN:  an 'invalid payment methods' exception should be thrown
*/
- (void)test_OnInvalidPaymentMethods_ThrowError {
    NSDictionary *props = [self propertiesWithConfigurationValue:@"hello" forKey:@"paymentMethods"];
    XCTAssertThrows([RNWrappers configurationFromProperties:props]);
}

/*
* GIVEN: a configuration NSDictionary is passed to the wrapper with a valid [configuration] property
*
* WHEN:  the [paymentMethods] value is set to 1
*
* THEN:  Card payment method should be enabled
*/
- (void)test_OnPaymentMethodValue1_EnableCard {
    NSDictionary *props = [self propertiesWithConfigurationValue:@1 forKey:@"paymentMethods"];
    JPConfiguration *config = [RNWrappers configurationFromProperties:props];
    XCTAssertEqual(config.paymentMethods.firstObject.type, JPPaymentMethodTypeCard);
}

/*
* GIVEN: a configuration NSDictionary is passed to the wrapper with a valid [configuration] property
*
* WHEN:  the [paymentMethods] value is set to 2
*
* THEN:  Apple Pay payment method should be enabled
*/
- (void)test_OnPaymentMethodValue2_EnableApplePay {
    NSDictionary *props = [self propertiesWithConfigurationValue:@2 forKey:@"paymentMethods"];
    JPConfiguration *config = [RNWrappers configurationFromProperties:props];
    XCTAssertEqual(config.paymentMethods.firstObject.type, JPPaymentMethodTypeApplePay);
}

/*
* GIVEN: a configuration NSDictionary is passed to the wrapper with a valid [configuration] property
*
* WHEN:  the [paymentMethods] value is set to 8
*
* THEN:  iDEAL payment method should be enabled
*/
- (void)test_OnPaymentMethodValue8_EnableIDEAL {
    NSDictionary *props = [self propertiesWithConfigurationValue:@8 forKey:@"paymentMethods"];
    JPConfiguration *config = [RNWrappers configurationFromProperties:props];
    XCTAssertEqual(config.paymentMethods.firstObject.type, JPPaymentMethodTypeIDeal);
}

/*
 * GIVEN: a configuration NSDictionary is passed to the wrapper with a valid [configuration] property
 *
 * WHEN:  the [paymentMethods] value is set to 16
 *
 * THEN:  Pay By Bank App payment method should be enabled
 */
- (void)test_OnPaymentMethodValue32_EnablePBBA {
    NSDictionary *props = [self propertiesWithConfigurationValue:@16 forKey:@"paymentMethods"];
    JPConfiguration *config = [RNWrappers configurationFromProperties:props];
    XCTAssertEqual(config.paymentMethods.firstObject.type, JPPaymentMethodTypePbba);
}

/*
* GIVEN: a configuration NSDictionary is passed to the wrapper with a valid [configuration] property
*
* WHEN:  the [paymentMethods] value is set to 32
*
* THEN:  All payment method should be enabled
*/
- (void)test_OnPaymentMethodValue32_EnableAll {
    NSDictionary *props = [self propertiesWithConfigurationValue:@32 forKey:@"paymentMethods"];
    JPConfiguration *config = [RNWrappers configurationFromProperties:props];
    XCTAssertEqual(config.paymentMethods.count, 4);
}

/*
* GIVEN: a configuration NSDictionary is passed to the wrapper with a valid [configuration] property
*
* WHEN:  the [supportedCardNetworks] property of the [configuration] dictionary is not an integer
*
* THEN:  an 'invalid supported card networks' exception should be thrown
*/
- (void)test_OnInvalidSupportedCardNetworks_ThrowError {
    NSDictionary *props = [self propertiesWithConfigurationValue:@"hello" forKey:@"supportedCardNetworks"];
    XCTAssertThrows([RNWrappers configurationFromProperties:props]);
}

/*
* GIVEN: a configuration NSDictionary is passed to the wrapper with a valid [configuration] property
*
* WHEN:  the [supportedCardNetworks] value is set to 1
*
* THEN:  Visa must be set as supported
*/
- (void)test_OnSupportedCardNetworkValue1_SetVisa {
    NSDictionary *props = [self propertiesWithConfigurationValue:@1 forKey:@"supportedCardNetworks"];
    JPConfiguration *config = [RNWrappers configurationFromProperties:props];
    XCTAssertEqual(config.supportedCardNetworks, JPCardNetworkTypeVisa);
}

/*
* GIVEN: a configuration NSDictionary is passed to the wrapper with a valid [configuration] property
*
* WHEN:  the [supportedCardNetworks] value is set to 2
*
* THEN:  MasterCard must be set as supported
*/
- (void)test_OnSupportedCardNetworkValue2_SetMasterCard {
    NSDictionary *props = [self propertiesWithConfigurationValue:@2 forKey:@"supportedCardNetworks"];
    JPConfiguration *config = [RNWrappers configurationFromProperties:props];
    XCTAssertEqual(config.supportedCardNetworks, JPCardNetworkTypeMasterCard);
}

/*
* GIVEN: a configuration NSDictionary is passed to the wrapper with a valid [configuration] property
*
* WHEN:  the [supportedCardNetworks] value is set to 4
*
* THEN:  Maestro must be set as supported
*/
- (void)test_OnSupportedCardNetworkValue4_SetMaestro {
    NSDictionary *props = [self propertiesWithConfigurationValue:@4 forKey:@"supportedCardNetworks"];
    JPConfiguration *config = [RNWrappers configurationFromProperties:props];
    XCTAssertEqual(config.supportedCardNetworks, JPCardNetworkTypeMaestro);
}

/*
* GIVEN: a configuration NSDictionary is passed to the wrapper with a valid [configuration] property
*
* WHEN:  the [supportedCardNetworks] value is set to 8
*
* THEN:  AMEX must be set as supported
*/
- (void)test_OnSupportedCardNetworkValue8_SetAMEX {
    NSDictionary *props = [self propertiesWithConfigurationValue:@8 forKey:@"supportedCardNetworks"];
    JPConfiguration *config = [RNWrappers configurationFromProperties:props];
    XCTAssertEqual(config.supportedCardNetworks, JPCardNetworkTypeAMEX);
}

/*
* GIVEN: a configuration NSDictionary is passed to the wrapper with a valid [configuration] property
*
* WHEN:  the [supportedCardNetworks] value is set to 16
*
* THEN:  China Union Pay must be set as supported
*/
- (void)test_OnSupportedCardNetworkValue16_SetChinaUnionPay {
    NSDictionary *props = [self propertiesWithConfigurationValue:@16 forKey:@"supportedCardNetworks"];
    JPConfiguration *config = [RNWrappers configurationFromProperties:props];
    XCTAssertEqual(config.supportedCardNetworks, JPCardNetworkTypeChinaUnionPay);
}

/*
* GIVEN: a configuration NSDictionary is passed to the wrapper with a valid [configuration] property
*
* WHEN:  the [supportedCardNetworks] value is set to 32
*
* THEN:  JCB must be set as supported
*/
- (void)test_OnSupportedCardNetworkValue32_SetJCB {
    NSDictionary *props = [self propertiesWithConfigurationValue:@32 forKey:@"supportedCardNetworks"];
    JPConfiguration *config = [RNWrappers configurationFromProperties:props];
    XCTAssertEqual(config.supportedCardNetworks, JPCardNetworkTypeJCB);
}

/*
* GIVEN: a configuration NSDictionary is passed to the wrapper with a valid [configuration] property
*
* WHEN:  the [supportedCardNetworks] value is set to 64
*
* THEN:  Discover must be set as supported
*/
- (void)test_OnSupportedCardNetworkValue64_SetDiscover {
    NSDictionary *props = [self propertiesWithConfigurationValue:@64 forKey:@"supportedCardNetworks"];
    JPConfiguration *config = [RNWrappers configurationFromProperties:props];
    XCTAssertEqual(config.supportedCardNetworks, JPCardNetworkTypeDiscover);
}

/*
* GIVEN: a configuration NSDictionary is passed to the wrapper with a valid [configuration] property
*
* WHEN:  the [supportedCardNetworks] value is set to 128
*
* THEN:  DinersClub must be set as supported
*/
- (void)test_OnSupportedCardNetworkValue128_SetDinersClub {
    NSDictionary *props = [self propertiesWithConfigurationValue:@128 forKey:@"supportedCardNetworks"];
    JPConfiguration *config = [RNWrappers configurationFromProperties:props];
    XCTAssertEqual(config.supportedCardNetworks, JPCardNetworkTypeDinersClub);
}

/*
* GIVEN: a configuration NSDictionary is passed to the wrapper with a valid [configuration] property
*
* WHEN:  the [supportedCardNetworks] value is set to 256
*
* THEN:  All card networks must be set as supported
*/
- (void)test_OnSupportedCardNetworkValue256_SetAll {
    NSDictionary *props = [self propertiesWithConfigurationValue:@256 forKey:@"supportedCardNetworks"];
    JPConfiguration *config = [RNWrappers configurationFromProperties:props];
    XCTAssertEqual(config.supportedCardNetworks, JPCardNetworkTypeAll);
}

/*
* GIVEN: a configuration NSDictionary is passed to the wrapper with a valid [configuration] property
*
* WHEN:  the [primaryAccountDetails] property of the [configuration] dictionary is not an NSDictionary
*
* THEN:  an 'invalid primary account details' exception should be thrown
*/
- (void)test_OnInvalidPrimaryAccountDetails_ThrowError {
    NSDictionary *props = [self propertiesWithConfigurationValue:@"hello" forKey:@"primaryAccountDetails"];
    XCTAssertThrows([RNWrappers configurationFromProperties:props]);
}

/*
* GIVEN: a configuration NSDictionary is passed to the wrapper with a valid [configuration] property
*
* WHEN:  the [name] property of the [primaryAccountDetails] dictionary is not an NSString
*
* THEN:  an 'invalid primary account details name' exception should be thrown
*/
- (void)test_OnInvalidPrimaryAccountDetailsName_ThrowError {
    NSDictionary *props = [self propertiesWithConfigurationValue:@123
                                                          forKey:@"name"
                                                orDictionaryName:@"primaryAccountDetails"];
    XCTAssertThrows([RNWrappers configurationFromProperties:props]);
}

/*
* GIVEN: a configuration NSDictionary is passed to the wrapper with a valid [configuration] property
*
* WHEN:  the [accountNumber] property of the [primaryAccountDetails] dictionary is not an NSString
*
* THEN:  an 'invalid primary account details account number' exception should be thrown
*/
- (void)test_OnInvalidPrimaryAccountDetailsAccountNumber_ThrowError {
    NSDictionary *props = [self propertiesWithConfigurationValue:@123
                                                          forKey:@"accountNumber"
                                                orDictionaryName:@"primaryAccountDetails"];
    XCTAssertThrows([RNWrappers configurationFromProperties:props]);
}

/*
* GIVEN: a configuration NSDictionary is passed to the wrapper with a valid [configuration] property
*
* WHEN:  the [dateOfBirth] property of the [primaryAccountDetails] dictionary is not an NSString
*
* THEN:  an 'invalid primary account details date of birth' exception should be thrown
*/
- (void)test_OnInvalidPrimaryAccountDetailsDateOfBirth_ThrowError {
    NSDictionary *props = [self propertiesWithConfigurationValue:@123
                                                          forKey:@"dateOfBirth"
                                                orDictionaryName:@"primaryAccountDetails"];
    XCTAssertThrows([RNWrappers configurationFromProperties:props]);
}

/*
* GIVEN: a configuration NSDictionary is passed to the wrapper with a valid [configuration] property
*
* WHEN:  the [postCode] property of the [primaryAccountDetails] dictionary is not an NSString
*
* THEN:  an 'invalid primary account details post code' exception should be thrown
*/
- (void)test_OnInvalidPrimaryAccountDetailsPostCode_ThrowError {
    NSDictionary *props = [self propertiesWithConfigurationValue:@123
                                                          forKey:@"postCode"
                                                orDictionaryName:@"primaryAccountDetails"];
    XCTAssertThrows([RNWrappers configurationFromProperties:props]);
}

/*
* GIVEN: a configuration NSDictionary is passed to the wrapper with a valid [configuration] property
*
* WHEN:  the [applePayConfiguration] property of the [configuration] dictionary is not an NSDictionary
*
* THEN:  an 'invalid Apple Pay configuration' exception should be thrown
*/
- (void)test_OnInvalidApplePayConfiguration_ThrowError {
    NSDictionary *props = [self propertiesWithConfigurationValue:@"hello" forKey:@"applePayConfiguration"];
    XCTAssertThrows([RNWrappers configurationFromProperties:props]);
}

#pragma mark - Helpers

- (NSMutableDictionary *)propertiesByChangingValue:(id)value
                                            forKey:(NSString *)key {
    NSMutableDictionary *mockProps = RNMocks.properties;
    mockProps[key] = value;
    return mockProps;
}

- (NSMutableDictionary *)propertiesWithConfigurationValue:(id)value
                                                   forKey:(NSString *)key {
    
    NSMutableDictionary *mockProps = RNMocks.properties;
    NSMutableDictionary *mockConfig = RNMocks.configuration;
    
    mockConfig[key] = value;
    mockProps[@"configuration"] = mockConfig;
    
    return mockProps;
}

- (NSMutableDictionary *)propertiesWithConfigurationValue:(id)value
                                                   forKey:(NSString *)key
                                         orDictionaryName:(NSString *)name{
    
    NSMutableDictionary *mockProps = RNMocks.properties;
    NSMutableDictionary *mockConfig = RNMocks.configuration;
    
    NSMutableDictionary *item = [mockConfig[name] mutableCopy];
    item[key] = value;
    
    mockConfig[name] = item;
    mockProps[@"configuration"] = mockConfig;
    
    return mockProps;
}

@end
