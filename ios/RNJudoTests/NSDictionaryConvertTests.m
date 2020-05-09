//
//  NSDictionaryConvertTests.m
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
#import "NSDictionary+JudoConvert.h"

@interface NSDictionaryConvertTests : XCTestCase

@end

@implementation NSDictionaryConvertTests

/*
 * GIVEN: a [NSDictionary] value should be extracted from an NSDictionary
 *
 * WHEN:  the value is missing
 *
 * THEN:  then an error should be thrown
 */
- (void)test_OnMissingDictionary_ThrowError {
    NSMutableDictionary *mockDictionary = [NSMutableDictionary new];
    XCTAssertThrows([mockDictionary dictionaryForKey:@"example-key"]);
}

/*
 * GIVEN: a [NSDictionary] value should be extracted from an NSDictionary
 *
 * WHEN:  the value is of incorrect type
 *
 * THEN:  then an error should be thrown
 */
- (void)test_OnInvalidDictionary_ThrowError {
    NSMutableDictionary *mockDictionary = [NSMutableDictionary new];
    mockDictionary[@"example-key"] = @"hello";
    XCTAssertThrows([mockDictionary dictionaryForKey:@"example-key"]);
}

/*
 * GIVEN: a [NSDictionary] value should be extracted from an NSDictionary
 *
 * WHEN:  the value is a valid NSDictionary
 *
 * THEN:  then the method should return the NSDictionary
 */
- (void)test_OnValidDictionary_ReturnDictionary {
    NSMutableDictionary *mockDictionary = [NSMutableDictionary new];
    mockDictionary[@"example-key"] = @{};
    XCTAssertNotNil([mockDictionary dictionaryForKey:@"example-key"]);
    XCTAssertTrue([[mockDictionary dictionaryForKey:@"example-key"] isKindOfClass:NSDictionary.class]);
}

/*
 * GIVEN: an optional [NSDictionary] value should be extracted from an NSDictionary
 *
 * WHEN:  the value is missing
 *
 * THEN:  the method should return nil
 */
- (void)test_OnMissingOptionalDictionary_ReturnNil {
    NSMutableDictionary *mockDictionary = [NSMutableDictionary new];
    XCTAssertNil([mockDictionary optionalDictionaryForKey:@"example-key"]);
}

/*
 * GIVEN: an optional [NSDictionary] value should be extracted from an NSDictionary
 *
 * WHEN:  the value is of incorrect type
 *
 * THEN:  then an error should be thrown
 */
- (void)test_OnInvalidOptionalDictionary_ThrowError {
    NSMutableDictionary *mockDictionary = [NSMutableDictionary new];
    mockDictionary[@"example-key"] = @"hello";
    XCTAssertThrows([mockDictionary optionalDictionaryForKey:@"example-key"]);
}

/*
 * GIVEN: a [NSDictionary] value should be extracted from an NSDictionary
 *
 * WHEN:  the value is a valid NSDictionary
 *
 * THEN:  then the method should return the NSDictionary
 */
- (void)test_OnValidOptionalDictionary_ReturnDictionary {
    NSMutableDictionary *mockDictionary = [NSMutableDictionary new];
    mockDictionary[@"example-key"] = @{};
    XCTAssertNotNil([mockDictionary optionalDictionaryForKey:@"example-key"]);
    XCTAssertTrue([[mockDictionary optionalDictionaryForKey:@"example-key"] isKindOfClass:NSDictionary.class]);
}

/*
 * GIVEN: a [NSArray] value should be extracted from an NSDictionary
 *
 * WHEN:  the value is missing
 *
 * THEN:  then an error should be thrown
 */
- (void)test_OnMissingArray_ThrowError {
    NSMutableDictionary *mockDictionary = [NSMutableDictionary new];
    XCTAssertThrows([mockDictionary arrayForKey:@"example-key"]);
}

/*
 * GIVEN: a [NSArray] value should be extracted from an NSDictionary
 *
 * WHEN:  the value is of incorrect type
 *
 * THEN:  then an error should be thrown
 */
- (void)test_OnInvalidArray_ThrowError {
    NSMutableDictionary *mockDictionary = [NSMutableDictionary new];
    mockDictionary[@"example-key"] = @"hello";
    XCTAssertThrows([mockDictionary arrayForKey:@"example-key"]);
}

/*
 * GIVEN: a [NSArray] value should be extracted from an NSDictionary
 *
 * WHEN:  the value is a valid NSArray
 *
 * THEN:  then the method should return the NSArray
 */
- (void)test_OnValidArray_ReturnArray {
    NSMutableDictionary *mockDictionary = [NSMutableDictionary new];
    mockDictionary[@"example-key"] = @[];
    XCTAssertNotNil([mockDictionary arrayForKey:@"example-key"]);
    XCTAssertTrue([[mockDictionary arrayForKey:@"example-key"] isKindOfClass:NSArray.class]);
}

/*
 * GIVEN: an optional [NSArray] value should be extracted from an NSDictionary
 *
 * WHEN:  the value is missing
 *
 * THEN:  the method should return nil
 */
- (void)test_OnMissingOptionalArray_ReturnNil {
    NSMutableDictionary *mockDictionary = [NSMutableDictionary new];
    XCTAssertNil([mockDictionary optionalArrayForKey:@"example-key"]);
}

/*
 * GIVEN: an optional [NSArray] value should be extracted from an NSDictionary
 *
 * WHEN:  the value is of incorrect type
 *
 * THEN:  then an error should be thrown
 */
- (void)test_OnInvalidOptionalArray_ThrowError {
    NSMutableDictionary *mockDictionary = [NSMutableDictionary new];
    mockDictionary[@"example-key"] = @"hello";
    XCTAssertThrows([mockDictionary optionalArrayForKey:@"example-key"]);
}

/*
 * GIVEN: a [NSArray] value should be extracted from an NSDictionary
 *
 * WHEN:  the value is a valid NSArray
 *
 * THEN:  then the method should return the NSArray
 */
- (void)test_OnValidOptionalArray_ReturnArray {
    NSMutableDictionary *mockDictionary = [NSMutableDictionary new];
    mockDictionary[@"example-key"] = @[];
    XCTAssertNotNil([mockDictionary optionalArrayForKey:@"example-key"]);
    XCTAssertTrue([[mockDictionary optionalArrayForKey:@"example-key"] isKindOfClass:NSArray.class]);
}

/*
 * GIVEN: a [NSString] value should be extracted from an NSDictionary
 *
 * WHEN:  the value is missing
 *
 * THEN:  then an error should be thrown
 */
- (void)test_OnMissingString_ThrowError {
    NSMutableDictionary *mockDictionary = [NSMutableDictionary new];
    XCTAssertThrows([mockDictionary stringForKey:@"example-key"]);
}

/*
 * GIVEN: a [NSString] value should be extracted from an NSDictionary
 *
 * WHEN:  the value is of incorrect type
 *
 * THEN:  then an error should be thrown
 */
- (void)test_OnInvalidString_ThrowError {
    NSMutableDictionary *mockDictionary = [NSMutableDictionary new];
    mockDictionary[@"example-key"] = @123;
    XCTAssertThrows([mockDictionary stringForKey:@"example-key"]);
}

/*
 * GIVEN: a [NSString] value should be extracted from an NSDictionary
 *
 * WHEN:  the value is a valid NSString
 *
 * THEN:  then the method should return the NSString
 */
- (void)test_OnValidString_ReturnString {
    NSMutableDictionary *mockDictionary = [NSMutableDictionary new];
    mockDictionary[@"example-key"] = @"hello";
    XCTAssertNotNil([mockDictionary stringForKey:@"example-key"]);
    XCTAssertTrue([[mockDictionary stringForKey:@"example-key"] isKindOfClass:NSString.class]);
}

/*
 * GIVEN: an optional [NSString] value should be extracted from an NSDictionary
 *
 * WHEN:  the value is missing
 *
 * THEN:  the method should return nil
 */
- (void)test_OnMissingOptionalString_ReturnNil {
    NSMutableDictionary *mockDictionary = [NSMutableDictionary new];
    XCTAssertNil([mockDictionary optionalStringForKey:@"example-key"]);
}

/*
 * GIVEN: an optional [NSString] value should be extracted from an NSDictionary
 *
 * WHEN:  the value is of incorrect type
 *
 * THEN:  then an error should be thrown
 */
- (void)test_OnInvalidOptionalString_ThrowError {
    NSMutableDictionary *mockDictionary = [NSMutableDictionary new];
    mockDictionary[@"example-key"] = @123;
    XCTAssertThrows([mockDictionary optionalStringForKey:@"example-key"]);
}

/*
 * GIVEN: a [NSString] value should be extracted from an NSDictionary
 *
 * WHEN:  the value is a valid NSString
 *
 * THEN:  then the method should return the NSString
 */
- (void)test_OnValidOptionalString_ReturnString {
    NSMutableDictionary *mockDictionary = [NSMutableDictionary new];
    mockDictionary[@"example-key"] = @"hello";
    XCTAssertNotNil([mockDictionary optionalStringForKey:@"example-key"]);
    XCTAssertTrue([[mockDictionary optionalStringForKey:@"example-key"] isKindOfClass:NSString.class]);
}

/*
 * GIVEN: a [NSNumber] value should be extracted from an NSDictionary
 *
 * WHEN:  the value is missing
 *
 * THEN:  then an error should be thrown
 */
- (void)test_OnMissingNumber_ThrowError {
    NSMutableDictionary *mockDictionary = [NSMutableDictionary new];
    XCTAssertThrows([mockDictionary numberForKey:@"example-key"]);
}

/*
 * GIVEN: a [NSNumber] value should be extracted from an NSDictionary
 *
 * WHEN:  the value is of incorrect type
 *
 * THEN:  then an error should be thrown
 */
- (void)test_OnInvalidNumber_ThrowError {
    NSMutableDictionary *mockDictionary = [NSMutableDictionary new];
    mockDictionary[@"example-key"] = @"hello";
    XCTAssertThrows([mockDictionary numberForKey:@"example-key"]);
}

/*
 * GIVEN: a [NSNumber] value should be extracted from an NSDictionary
 *
 * WHEN:  the value is a valid NSNumber
 *
 * THEN:  then the method should return the NSNumber
 */
- (void)test_OnValidNumber_ReturnNumber {
    NSMutableDictionary *mockDictionary = [NSMutableDictionary new];
    mockDictionary[@"example-key"] = @123.12;
    XCTAssertNotNil([mockDictionary numberForKey:@"example-key"]);
    XCTAssertTrue([[mockDictionary numberForKey:@"example-key"] isKindOfClass:NSNumber.class]);
}

/*
 * GIVEN: an optional [NSNumber] value should be extracted from an NSDictionary
 *
 * WHEN:  the value is missing
 *
 * THEN:  the method should return nil
 */
- (void)test_OnMissingOptionalNumber_ReturnNil {
    NSMutableDictionary *mockDictionary = [NSMutableDictionary new];
    XCTAssertNil([mockDictionary optionalNumberForKey:@"example-key"]);
}

/*
 * GIVEN: an optional [NSNumber] value should be extracted from an NSDictionary
 *
 * WHEN:  the value is of incorrect type
 *
 * THEN:  then an error should be thrown
 */
- (void)test_OnInvalidOptionalNumber_ThrowError {
    NSMutableDictionary *mockDictionary = [NSMutableDictionary new];
    mockDictionary[@"example-key"] = @"hello";
    XCTAssertThrows([mockDictionary optionalNumberForKey:@"example-key"]);
}

/*
 * GIVEN: a [NSNumber] value should be extracted from an NSDictionary
 *
 * WHEN:  the value is a valid NSNumber
 *
 * THEN:  then the method should return the NSNumber
 */
- (void)test_OnValidOptionalNumber_ReturnNumber {
    NSMutableDictionary *mockDictionary = [NSMutableDictionary new];
    mockDictionary[@"example-key"] = @123.12;
    XCTAssertNotNil([mockDictionary optionalNumberForKey:@"example-key"]);
    XCTAssertTrue([[mockDictionary optionalNumberForKey:@"example-key"] isKindOfClass:NSNumber.class]);
}

/*
 * GIVEN: a [Bool] value should be extracted from an NSDictionary
 *
 * WHEN:  the value is missing
 *
 * THEN:  then an error should be thrown
 */
- (void)test_OnMissingBool_ThrowError {
    NSMutableDictionary *mockDictionary = [NSMutableDictionary new];
    XCTAssertThrows([mockDictionary boolForKey:@"example-key"]);
}

/*
 * GIVEN: a [Bool] value should be extracted from an NSDictionary
 *
 * WHEN:  the value is of incorrect type
 *
 * THEN:  then an error should be thrown
 */
- (void)test_OnInvalidBool_ThrowError {
    NSMutableDictionary *mockDictionary = [NSMutableDictionary new];
    mockDictionary[@"example-key"] = @"hello";
    XCTAssertThrows([mockDictionary boolForKey:@"example-key"]);
}

/*
 * GIVEN: a [Bool] value should be extracted from an NSDictionary
 *
 * WHEN:  the value is a valid Bool
 *
 * THEN:  then the method should return the Bool
 */
- (void)test_OnValidBool_ReturnBool {
    NSMutableDictionary *mockDictionary = [NSMutableDictionary new];
    mockDictionary[@"example-key"] = @YES;
    XCTAssertTrue([mockDictionary boolForKey:@"example-key"]);
}

/*
 * GIVEN: an optional [Bool] value should be extracted from an NSDictionary
 *
 * WHEN:  the value is missing
 *
 * THEN:  the method should return nil
 */
- (void)test_OnMissingOptionalBool_ReturnNil {
    NSMutableDictionary *mockDictionary = [NSMutableDictionary new];
    XCTAssertNil([mockDictionary optionalBoolForKey:@"example-key"]);
}

/*
 * GIVEN: an optional [Bool] value should be extracted from an NSDictionary
 *
 * WHEN:  the value is of incorrect type
 *
 * THEN:  then an error should be thrown
 */
- (void)test_OnInvalidOptionalBool_ThrowError {
    NSMutableDictionary *mockDictionary = [NSMutableDictionary new];
    mockDictionary[@"example-key"] = @"hello";
    XCTAssertThrows([mockDictionary optionalBoolForKey:@"example-key"]);
}

/*
 * GIVEN: a [Bool] value should be extracted from an NSDictionary
 *
 * WHEN:  the value is a valid Bool
 *
 * THEN:  then the method should return the Bool
 */
- (void)test_OnValidOptionalBool_ReturnBool {
    NSMutableDictionary *mockDictionary = [NSMutableDictionary new];
    mockDictionary[@"example-key"] = @YES;
    XCTAssertTrue([mockDictionary optionalBoolForKey:@"example-key"]);
}

/*
 * GIVEN: a [HEX NSString] value should be extracted from an NSDictionary
 *
 * WHEN:  the value is missing
 *
 * THEN:  then an error should be thrown
 */
- (void)test_OnMissingHEXString_ThrowError {
    NSMutableDictionary *mockDictionary = [NSMutableDictionary new];
    mockDictionary[@"example-key"] = [NSNull new];
    XCTAssertThrows([mockDictionary hexColorForKey:@"example-key"]);
}

/*
 * GIVEN: a [HEX NSString] value should be extracted from an NSDictionary
 *
 * WHEN:  the value is of incorrect type
 *
 * THEN:  then an error should be thrown
 */
- (void)test_OnInvalidHEXString_ThrowError {
    NSMutableDictionary *mockDictionary = [NSMutableDictionary new];
    mockDictionary[@"example-key"] = @123;
    XCTAssertThrows([mockDictionary hexColorForKey:@"example-key"]);
}

/*
 * GIVEN: a [HEX NSString] value should be extracted from an NSDictionary
 *
 * WHEN:  the value is not a valid HEX value
 *
 * THEN:  then an error should be thrown
 */
- (void)test_OnInvalidHEXStringValue_ThrowError {
    NSMutableDictionary *mockDictionary = [NSMutableDictionary new];
    mockDictionary[@"example-key"] = @"hello";
    XCTAssertThrows([mockDictionary hexColorForKey:@"example-key"]);
}

/*
 * GIVEN: a [HEX NSString] value should be extracted from an NSDictionary
 *
 * WHEN:  the value is a valid HEX NSString
 *
 * THEN:  then the method should return the HEX NSString
 */
- (void)test_OnValidHEXString_ReturnHEXString {
    NSMutableDictionary *mockDictionary = [NSMutableDictionary new];
    mockDictionary[@"example-key"] = @"#FFFFFF";
    XCTAssertNotNil([mockDictionary hexColorForKey:@"example-key"]);
    XCTAssertTrue([[mockDictionary hexColorForKey:@"example-key"] isKindOfClass:NSString.class]);
}

@end
