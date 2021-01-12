//
//  RNPBBAWrappersTest.m
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
#import "RNPBBAWrappers.h"
#import "RNMocks.h"

@interface RNPBBAWrappersTest : XCTestCase

@end

@implementation RNPBBAWrappersTest

/*
 * GIVEN: a configuration NSDictionary is passed to the PBBA wrapper
 *
 * WHEN:  the NSDictionary is valid
 *
 * THEN:  a configured JPPBBAConfiguration instance should be returned
 */
- (void)test_OnValidDictionary_ReturnPBBAConfiguration {
    NSDictionary *mockConfig = RNMocks.configuration;
    XCTAssertNotNil([RNPBBAWrappers pbbaConfigurationFromConfiguration:mockConfig]);
}

/*
 * GIVEN: a configuration NSDictionary is passed to the PBBA wrapper
 *
 * WHEN:  the [mobileNumber] property is not an NSString
 *
 * THEN:  a 'invalid mobile number type' exception should be thrown
 */
- (void)test_OnInvalidMobileNumber_ThrowError {
    NSDictionary *config = [self configurationByChangingValue:@123 forKey:@"mobileNumber"];
    XCTAssertThrows([RNPBBAWrappers pbbaConfigurationFromConfiguration:config]);
}

/*
 * GIVEN: a configuration NSDictionary is passed to the PBBA wrapper
 *
 * WHEN:  the [emailAddress] property is not an NSString
 *
 * THEN:  a 'invalid email address type' exception should be thrown
 */
- (void)test_OnInvalidEmailAddress_ThrowError {
    NSDictionary *config = [self configurationByChangingValue:@123 forKey:@"emailAddress"];
    XCTAssertThrows([RNPBBAWrappers pbbaConfigurationFromConfiguration:config]);
}

/*
 * GIVEN: a configuration NSDictionary is passed to the PBBA wrapper
 *
 * WHEN:  the [appearsOnStatement] property is not an NSString
 *
 * THEN:  a 'invalid appears on statement type' exception should be thrown
 */
- (void)test_OnInvalidAppearsOnStatement_ThrowError {
    NSDictionary *config = [self configurationByChangingValue:@123 forKey:@"appearsOnStatement"];
    XCTAssertThrows([RNPBBAWrappers pbbaConfigurationFromConfiguration:config]);
}

/*
 * GIVEN: a configuration NSDictionary is passed to the PBBA wrapper
 *
 * WHEN:  the [deeplinkScheme] property is not an NSString
 *
 * THEN:  a 'invalid deeplink scheme type' exception should be thrown
 */
- (void)test_OnInvalidDeeplinkScheme_ThrowError {
    NSDictionary *config = [self configurationByChangingValue:@123 forKey:@"deeplinkScheme"];
    XCTAssertThrows([RNPBBAWrappers pbbaConfigurationFromConfiguration:config]);
}

/*
 * GIVEN: a configuration NSDictionary is passed to the PBBA wrapper
 *
 * WHEN:  the [deeplinkURL] property is not an NSString
 *
 * THEN:  a 'invalid deeplink URL type' exception should be thrown
 */
- (void)test_OnInvalidDeeplinkURL_ThrowError {
    NSDictionary *config = [self configurationByChangingValue:@123 forKey:@"deeplinkURL"];
    XCTAssertThrows([RNPBBAWrappers pbbaConfigurationFromConfiguration:config]);
}

#pragma mark - Helpers

- (NSMutableDictionary *)configurationByChangingValue:(id)value
                                               forKey:(NSString *)key {
    
    NSMutableDictionary *mockConfig = RNMocks.configuration;
    NSMutableDictionary *mockPBBAConfig = RNMocks.pbbaConfiguration;
    
    mockPBBAConfig[key] = value;
    mockConfig[@"pbbaConfiguration"] = mockPBBAConfig;
    
    return mockConfig;
}

@end
