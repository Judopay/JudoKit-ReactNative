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
}

/*
 * GIVEN: a configuration NSDictionary is passed to the wrapper
 *
 * WHEN:  the [token] property is missing
 *
 * THEN:  a 'missing API token' exception should be thrown
 */
- (void)test_OnMissingToken_ThrowError {
    
}

/*
* GIVEN: a configuration NSDictionary is passed to the wrapper
*
* WHEN:  the [token] property is not an NSString
*
* THEN:  an 'invalid API token' exception should be thrown
*/
- (void)test_OnInvalidToken_ThrowError {
    
}

/*
 * GIVEN: a configuration NSDictionary is passed to the wrapper
 *
 * WHEN:  the [secret] property is missing
 *
 * THEN:  a 'missing API secret' exception should be thrown
 */
- (void)test_OnMissingSecret_ThrowError {
    
}

/*
* GIVEN: a configuration NSDictionary is passed to the wrapper
*
* WHEN:  the [secret] property is not an NSString
*
* THEN:  an 'invalid API secret' exception should be thrown
*/
- (void)test_OnInvalidSecret_ThrowError {
    
}

/*
 * GIVEN: a configuration NSDictionary is passed to the wrapper
 *
 * WHEN:  the [sandboxed] property is missing
 *
 * THEN:  a 'missing sandbox setting' exception should be thrown
 */
- (void)test_OnMissingSandbox_ThrowError {
    
}

/*
* GIVEN: a configuration NSDictionary is passed to the wrapper
*
* WHEN:  the [sandboxed] property is not an integer
*
* THEN:  an 'invalid sandbox setting' exception should be thrown
*/
- (void)test_OnInvalidSandbox_ThrowError {
    
}

/*
 * GIVEN: a configuration NSDictionary is passed to the wrapper
 *
 * WHEN:  the [transactionType] property is missing
 *
 * THEN:  a 'missing transaction type' exception should be thrown
 */
- (void)test_OnMissingTransactionType_ThrowError {
    
}

/*
* GIVEN: a configuration NSDictionary is passed to the wrapper
*
* WHEN:  the [transactionType] property is not an NSString
*
* THEN:  an 'invalid transaction type' exception should be thrown
*/
- (void)test_OnInvalidTransactionType_ThrowError {
    
}

/*
 * GIVEN: a configuration NSDictionary is passed to the wrapper
 *
 * WHEN:  the [transactionMode] property is missing
 *
 * THEN:  a 'missing transaction mode' exception should be thrown
 */
- (void)test_OnMissingTransactionMode_ThrowError {
    
}

/*
* GIVEN: a configuration NSDictionary is passed to the wrapper
*
* WHEN:  the [transactionMode] property is not an NSString
*
* THEN:  an 'invalid transaction mode' exception should be thrown
*/
- (void)test_OnInvalidTransactionMode_ThrowError {
    
}

/*
 * GIVEN: a configuration NSDictionary is passed to the wrapper
 *
 * WHEN:  the [configuration] property is missing
 *
 * THEN:  a 'missing configuration' exception should be thrown
 */
- (void)test_OnMissingConfiguration_ThrowError {
    
}

/*
* GIVEN: a configuration NSDictionary is passed to the wrapper
*
* WHEN:  the [configuration] property is not an NSDictionary
*
* THEN:  an 'invalid configuration' exception should be thrown
*/
- (void)test_OnInvalidConfiguration_ThrowError {
    
}

/*
 * GIVEN: a configuration NSDictionary is passed to the wrapper with a valid [configuration] property
 *
 * WHEN:  the [judoId] property of the [configuration] dictionary is missing
 *
 * THEN:  a 'missing Judo ID' exception should be thrown
 */
- (void)test_OnMissingJudoId_ThrowError {
    
}

/*
* GIVEN: a configuration NSDictionary is passed to the wrapper with a valid [configuration] property
*
* WHEN:  the [judoId] property of the [configuration] dictionary is not an NSString
*
* THEN:  a 'invalid Judo ID' exception should be thrown
*/
- (void)test_OnInvalidJudoId_ThrowError {
    
}

/*
 * GIVEN: a configuration NSDictionary is passed to the wrapper with a valid [configuration] property
 *
 * WHEN:  the [amount] property of the [configuration] dictionary is missing
 *
 * THEN:  a 'missing amount' exception should be thrown
 */
- (void)test_OnMissingAmount_ThrowError {
    
}

/*
* GIVEN: a configuration NSDictionary is passed to the wrapper with a valid [configuration] property
*
* WHEN:  the [amount] property of the [configuration] dictionary is not an NSDictionary
*
* THEN:  a 'invalid amount' exception should be thrown
*/
- (void)test_OnInvalidAmount_ThrowError {
    
}

/*
 * GIVEN: a configuration NSDictionary is passed to the wrapper with a valid [configuration] property
 *
 * WHEN:  the [value] property of the [amount] dictionary is missing
 *
 * THEN:  a 'missing amount value' exception should be thrown
 */
- (void)test_OnMissingAmountValue_ThrowError {
    
}

/*
* GIVEN: a configuration NSDictionary is passed to the wrapper with a valid [configuration] property
*
* WHEN:  the [value] property of the [amount] dictionary is not an NSString
*
* THEN:  an 'invalid amount value' exception should be thrown
*/
- (void)test_OnInvalidAmountValue_ThrowError {
    
}

/*
 * GIVEN: a configuration NSDictionary is passed to the wrapper with a valid [configuration] property
 *
 * WHEN:  the [currency] property of the [amount] dictionary is missing
 *
 * THEN:  a 'missing amount currency' exception should be thrown
 */
- (void)test_OnMissingAmountCurrency_ThrowError {
    
}

/*
* GIVEN: a configuration NSDictionary is passed to the wrapper with a valid [configuration] property
*
* WHEN:  the [currency] property of the [amount] dictionary is not an NSString
*
* THEN:  an 'invalid amount currency' exception should be thrown
*/
- (void)test_OnInvalidAmountCurrency_ThrowError {
    
}

/*
 * GIVEN: a configuration NSDictionary is passed to the wrapper with a valid [configuration] property
 *
 * WHEN:  the [reference] property of the [configuration] dictionary is missing
 *
 * THEN:  a 'missing reference' exception should be thrown
 */
- (void)test_OnMissingReference_ThrowError {
    
}

/*
* GIVEN: a configuration NSDictionary is passed to the wrapper with a valid [configuration] property
*
* WHEN:  the [reference] property of the [configuration] dictionary is not an NSDictionary
*
* THEN:  an 'invalid reference' exception should be thrown
*/
- (void)test_OnInvalidReference_ThrowError {
    
}

/*
 * GIVEN: a configuration NSDictionary is passed to the wrapper with a valid [configuration] property
 *
 * WHEN:  the [consumerReference] property of the [reference] dictionary is missing
 *
 * THEN:  a 'missing consumer reference' exception should be thrown
 */
- (void)test_OnMissingConsumerReference_ThrowError {
    
}

/*
* GIVEN: a configuration NSDictionary is passed to the wrapper with a valid [configuration] property
*
* WHEN:  the [consumerReference] property of the [reference] dictionary is not an NSString
*
* THEN:  an 'invalid consumer reference' exception should be thrown
*/
- (void)test_OnInvalidConsumerReference_ThrowError {
    
}

/*
* GIVEN: a configuration NSDictionary is passed to the wrapper with a valid [configuration] property
*
* WHEN:  the [paymentReference] property of the [reference] dictionary is not an NSString
*
* THEN:  an 'invalid payment reference' exception should be thrown
*/
- (void)test_OnInvalidPaymentReference_ThrowError {
    
}

/*
* GIVEN: a configuration NSDictionary is passed to the wrapper with a valid [configuration] property
*
* WHEN:  the [metadata] property of the [reference] dictionary is not an NSDictionary
*
* THEN:  an 'invalid reference metadata' exception should be thrown
*/
- (void)test_OnInvalidReferenceMetadata_ThrowError {
    
}

/*
* GIVEN: a configuration NSDictionary is passed to the wrapper with a valid [configuration] property
*
* WHEN:  the [siteId] property of the [configuration] dictionary is not an NSString
*
* THEN:  an 'invalid Site ID' exception should be thrown
*/
- (void)test_OnInvalidSiteID_ThrowError {
    
}

/*
* GIVEN: a configuration NSDictionary is passed to the wrapper with a valid [configuration] property
*
* WHEN:  the [cardAddress] property of the [configuration] dictionary is not an NSDictionary
*
* THEN:  an 'invalid card address' exception should be thrown
*/
- (void)test_OnInvalidCardAddress_ThrowError {
    
}

/*
* GIVEN: a configuration NSDictionary is passed to the wrapper with a valid [configuration] property
*
* WHEN:  the [line1] property of the [cardAddress] dictionary is not an NSString
*
* THEN:  an 'invalid card address line 1' exception should be thrown
*/
- (void)test_OnInvalidCardAddressLine1_ThrowError {
    
}

/*
* GIVEN: a configuration NSDictionary is passed to the wrapper with a valid [configuration] property
*
* WHEN:  the [line2] property of the [cardAddress] dictionary is not an NSString
*
* THEN:  an 'invalid card address line 2' exception should be thrown
*/
- (void)test_OnInvalidCardAddressLine2_ThrowError {
    
}

/*
* GIVEN: a configuration NSDictionary is passed to the wrapper with a valid [configuration] property
*
* WHEN:  the [line3] property of the [cardAddress] dictionary is not an NSString
*
* THEN:  an 'invalid card address line 3' exception should be thrown
*/
- (void)test_OnInvalidCardAddressLine3_ThrowError {
    
}

/*
* GIVEN: a configuration NSDictionary is passed to the wrapper with a valid [configuration] property
*
* WHEN:  the [postCode] property of the [cardAddress] dictionary is not an NSString
*
* THEN:  an 'invalid card address post code' exception should be thrown
*/
- (void)test_OnInvalidCardAddressPostCode_ThrowError {
    
}

/*
* GIVEN: a configuration NSDictionary is passed to the wrapper with a valid [configuration] property
*
* WHEN:  the [town] property of the [cardAddress] dictionary is not an NSString
*
* THEN:  an 'invalid card address town' exception should be thrown
*/
- (void)test_OnInvalidCardAddressTown_ThrowError {
    
}

/*
* GIVEN: a configuration NSDictionary is passed to the wrapper with a valid [configuration] property
*
* WHEN:  the [countryCode] property of the [cardAddress] dictionary is not an NSString
*
* THEN:  an 'invalid card address country code' exception should be thrown
*/
- (void)test_OnInvalidCardAddressCountryCode_ThrowError {
    
}

/*
* GIVEN: a configuration NSDictionary is passed to the wrapper with a valid [configuration] property
*
* WHEN:  the [uiConfiguration] property of the [configuration] dictionary is not an NSDictionary
*
* THEN:  an 'invalid UI configuration' exception should be thrown
*/
- (void)test_OnInvalidUIConfiguration_ThrowError {
    
}

/*
* GIVEN: a configuration NSDictionary is passed to the wrapper with a valid [configuration] property
*
* WHEN:  the [isAVSEnabled] property of the [uiConfiguration] dictionary is not an integer
*
* THEN:  an 'invalid AVS setting' exception should be thrown
*/
- (void)test_OnInvalidUIConfigurationAVSEnabled_ThrowError {
    
}

/*
* GIVEN: a configuration NSDictionary is passed to the wrapper with a valid [configuration] property
*
* WHEN:  the [shouldDisplayAmount] property of the [uiConfiguration] dictionary is not an integer
*
* THEN:  an 'invalid amount display setting' exception should be thrown
*/
- (void)test_OnInvalidUIConfigurationDisplayAmount_ThrowError {
    
}

/*
* GIVEN: a configuration NSDictionary is passed to the wrapper with a valid [configuration] property
*
* WHEN:  the [theme] property of the [uiConfiguration] dictionary is not an NSDictionary
*
* THEN:  an 'invalid theme' exception should be thrown
*/
- (void)test_OnInvalidUIConfigurationTheme_ThrowError {
    
}

/*
* GIVEN: a configuration NSDictionary is passed to the wrapper with a valid [configuration] property
*
* WHEN:  the [paymentMethods] property of the [configuration] dictionary is not an integer
*
* THEN:  an 'invalid payment methods' exception should be thrown
*/
- (void)test_OnInvalidPaymentMethods_ThrowError {
    
}

/*
* GIVEN: a configuration NSDictionary is passed to the wrapper with a valid [configuration] property
*
* WHEN:  the [supportedCardNetworks] property of the [configuration] dictionary is not an integer
*
* THEN:  an 'invalid supported card networks' exception should be thrown
*/
- (void)test_OnInvalidSupportedCardNetworks_ThrowError {
    
}

/*
* GIVEN: a configuration NSDictionary is passed to the wrapper with a valid [configuration] property
*
* WHEN:  the [primaryAccountDetails] property of the [configuration] dictionary is not an NSDictionary
*
* THEN:  an 'invalid primary account details' exception should be thrown
*/
- (void)test_OnInvalidPrimaryAccountDetails_ThrowError {
    
}

/*
* GIVEN: a configuration NSDictionary is passed to the wrapper with a valid [configuration] property
*
* WHEN:  the [name] property of the [primaryAccountDetails] dictionary is not an NSString
*
* THEN:  an 'invalid primary account details name' exception should be thrown
*/
- (void)test_OnInvalidPrimaryAccountDetailsName_ThrowError {
    
}

/*
* GIVEN: a configuration NSDictionary is passed to the wrapper with a valid [configuration] property
*
* WHEN:  the [accountNumber] property of the [primaryAccountDetails] dictionary is not an NSString
*
* THEN:  an 'invalid primary account details account number' exception should be thrown
*/
- (void)test_OnInvalidPrimaryAccountDetailsAccountNumber_ThrowError {
    
}

/*
* GIVEN: a configuration NSDictionary is passed to the wrapper with a valid [configuration] property
*
* WHEN:  the [dateOfBirth] property of the [primaryAccountDetails] dictionary is not an NSString
*
* THEN:  an 'invalid primary account details date of birth' exception should be thrown
*/
- (void)test_OnInvalidPrimaryAccountDetailsDateOfBirth_ThrowError {
    
}

/*
* GIVEN: a configuration NSDictionary is passed to the wrapper with a valid [configuration] property
*
* WHEN:  the [postCode] property of the [primaryAccountDetails] dictionary is not an NSString
*
* THEN:  an 'invalid primary account details post code' exception should be thrown
*/
- (void)test_OnInvalidPrimaryAccountDetailsPostCode_ThrowError {
    
}

/*
* GIVEN: a configuration NSDictionary is passed to the wrapper with a valid [configuration] property
*
* WHEN:  the [applePayConfiguration] property of the [configuration] dictionary is not an NSDictionary
*
* THEN:  an 'invalid Apple Pay configuration' exception should be thrown
*/
- (void)test_OnInvalidApplePayConfiguration_ThrowError {
    
}

@end
