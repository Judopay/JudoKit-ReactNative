//
//  RNThemeTests.m
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
#import "RNMocks.h"
#import "RNWrappers.h"
#import "UIColor+RNAdditions.h"

@interface RNThemeTests : XCTestCase

@end

@implementation RNThemeTests

/*
* GIVEN: a UI configuration NSDictionary is passed to the wrapper with a valid [theme] property
*
* WHEN:  the [largeTitleFont] property of the [theme] dictionary is not an NSString
*
* THEN:  an 'invalid large title font' exception should be thrown
*/
- (void)test_OnInvalidLargeTitleFont_ThrowError {
    NSDictionary *props = [self propertiesWithThemeValue:@123 forKey:@"largeTitleFont"];
    XCTAssertThrows([RNWrappers configurationFromProperties:props]);
}

/*
* GIVEN: a UI configuration NSDictionary is passed to the wrapper with a valid [theme] property
*
* WHEN:  the [largeTitleSize] property of the [theme] dictionary is not an integer
*
* THEN:  an 'invalid large title size' exception should be thrown
*/
- (void)test_OnInvalidLargeTitleSize_ThrowError {
    NSDictionary *props = [self propertiesWithThemeValue:@"hello" forKey:@"largeTitleSize"];
    XCTAssertThrows([RNWrappers configurationFromProperties:props]);
}

/*
* GIVEN: a UI configuration NSDictionary is passed to the wrapper with a valid [theme] property
*
* WHEN:  the [titleFont] property of the [theme] dictionary is not an NSString
*
* THEN:  an 'invalid title font' exception should be thrown
*/
- (void)test_OnInvalidTitleFont_ThrowError {
    NSDictionary *props = [self propertiesWithThemeValue:@123 forKey:@"titleFont"];
    XCTAssertThrows([RNWrappers configurationFromProperties:props]);
}

/*
* GIVEN: a UI configuration NSDictionary is passed to the wrapper with a valid [theme] property
*
* WHEN:  the [titleSize] property of the [theme] dictionary is not an integer
*
* THEN:  an 'invalid title size' exception should be thrown
*/
- (void)test_OnInvalidTitleSize_ThrowError {
    NSDictionary *props = [self propertiesWithThemeValue:@"hello" forKey:@"titleSize"];
    XCTAssertThrows([RNWrappers configurationFromProperties:props]);
}

/*
* GIVEN: a UI configuration NSDictionary is passed to the wrapper with a valid [theme] property
*
* WHEN:  the [headlineFont] property of the [theme] dictionary is not an NSString
*
* THEN:  an 'invalid headline font' exception should be thrown
*/
- (void)test_OnInvalidHeadlineFont_ThrowError {
    NSDictionary *props = [self propertiesWithThemeValue:@123 forKey:@"headlineFont"];
    XCTAssertThrows([RNWrappers configurationFromProperties:props]);
}

/*
* GIVEN: a UI configuration NSDictionary is passed to the wrapper with a valid [theme] property
*
* WHEN:  the [headlineSize] property of the [theme] dictionary is not an integer
*
* THEN:  an 'invalid headline size' exception should be thrown
*/
- (void)test_OnInvalidHeadlineSize_ThrowError {
    NSDictionary *props = [self propertiesWithThemeValue:@"" forKey:@"headlineSize"];
    XCTAssertThrows([RNWrappers configurationFromProperties:props]);
}

/*
* GIVEN: a UI configuration NSDictionary is passed to the wrapper with a valid [theme] property
*
* WHEN:  the [headlineLightFont] property of the [theme] dictionary is not an NSString
*
* THEN:  an 'invalid headline light font' exception should be thrown
*/
- (void)test_OnInvalidHeadlineLightFont_ThrowError {
    NSDictionary *props = [self propertiesWithThemeValue:@123 forKey:@"headlineLightFont"];
    XCTAssertThrows([RNWrappers configurationFromProperties:props]);
}

/*
* GIVEN: a UI configuration NSDictionary is passed to the wrapper with a valid [theme] property
*
* WHEN:  the [headlineLightSize] property of the [theme] dictionary is not an integer
*
* THEN:  an 'invalid headline light size' exception should be thrown
*/
- (void)test_OnInvalidHeadlineLightSize_ThrowError {
    NSDictionary *props = [self propertiesWithThemeValue:@"hello" forKey:@"headlineLightSize"];
    XCTAssertThrows([RNWrappers configurationFromProperties:props]);
}

/*
* GIVEN: a UI configuration NSDictionary is passed to the wrapper with a valid [theme] property
*
* WHEN:  the [bodyFont] property of the [theme] dictionary is not an NSString
*
* THEN:  an 'invalid body font' exception should be thrown
*/
- (void)test_OnInvalidBodyFont_ThrowError {
    NSDictionary *props = [self propertiesWithThemeValue:@123 forKey:@"bodyFont"];
    XCTAssertThrows([RNWrappers configurationFromProperties:props]);
}

/*
* GIVEN: a UI configuration NSDictionary is passed to the wrapper with a valid [theme] property
*
* WHEN:  the [bodySize] property of the [theme] dictionary is not an integer
*
* THEN:  an 'invalid body size' exception should be thrown
*/
- (void)test_OnInvalidBodySize_ThrowError {
    NSDictionary *props = [self propertiesWithThemeValue:@"hello" forKey:@"bodySize"];
    XCTAssertThrows([RNWrappers configurationFromProperties:props]);
}

/*
* GIVEN: a UI configuration NSDictionary is passed to the wrapper with a valid [theme] property
*
* WHEN:  the [bodyBoldFont] property of the [theme] dictionary is not an NSString
*
* THEN:  an 'invalid body bold font' exception should be thrown
*/
- (void)test_OnInvalidBodyBoldFont_ThrowError {
    NSDictionary *props = [self propertiesWithThemeValue:@123 forKey:@"bodyBoldFont"];
    XCTAssertThrows([RNWrappers configurationFromProperties:props]);
}

/*
* GIVEN: a UI configuration NSDictionary is passed to the wrapper with a valid [theme] property
*
* WHEN:  the [bodyBoldSize] property of the [theme] dictionary is not an integer
*
* THEN:  an 'invalid body bold size' exception should be thrown
*/
- (void)test_OnInvalidBodyBoldSize_ThrowError {
    NSDictionary *props = [self propertiesWithThemeValue:@"hello" forKey:@"bodyBoldSize"];
    XCTAssertThrows([RNWrappers configurationFromProperties:props]);
}

/*
* GIVEN: a UI configuration NSDictionary is passed to the wrapper with a valid [theme] property
*
* WHEN:  the [captionFont] property of the [theme] dictionary is not an NSString
*
* THEN:  an 'invalid caption font' exception should be thrown
*/
- (void)test_OnInvalidCaptionFont_ThrowError {
    NSDictionary *props = [self propertiesWithThemeValue:@123 forKey:@"captionFont"];
    XCTAssertThrows([RNWrappers configurationFromProperties:props]);
}

/*
* GIVEN: a UI configuration NSDictionary is passed to the wrapper with a valid [theme] property
*
* WHEN:  the [captionSize] property of the [theme] dictionary is not an integer
*
* THEN:  an 'invalid caption size' exception should be thrown
*/
- (void)test_OnInvalidCaptionSize_ThrowError {
    NSDictionary *props = [self propertiesWithThemeValue:@"hello" forKey:@"captionSize"];
    XCTAssertThrows([RNWrappers configurationFromProperties:props]);
}

/*
* GIVEN: a UI configuration NSDictionary is passed to the wrapper with a valid [theme] property
*
* WHEN:  the [captionBoldFont] property of the [theme] dictionary is not an NSString
*
* THEN:  an 'invalid caption font' exception should be thrown
*/
- (void)test_OnInvalidCaptionBoldFont_ThrowError {
    NSDictionary *props = [self propertiesWithThemeValue:@123 forKey:@"captionBoldFont"];
    XCTAssertThrows([RNWrappers configurationFromProperties:props]);
}

/*
* GIVEN: a UI configuration NSDictionary is passed to the wrapper with a valid [theme] property
*
* WHEN:  the [captionBoldSize] property of the [theme] dictionary is not an integer
*
* THEN:  an 'invalid caption size' exception should be thrown
*/
- (void)test_OnInvalidCaptionBoldSize_ThrowError {
    NSDictionary *props = [self propertiesWithThemeValue:@"hello" forKey:@"captionBoldSize"];
    XCTAssertThrows([RNWrappers configurationFromProperties:props]);
}

/*
* GIVEN: a UI configuration NSDictionary is passed to the wrapper with a valid [theme] property
*
* WHEN:  the [jpBlackColor] property of the [theme] dictionary is not an NSString
*
* THEN:  an 'invalid JPBlack color' exception should be thrown
*/
- (void)test_OnInvalidJPBlackColor_ThrowError {
    NSDictionary *props = [self propertiesWithThemeValue:@123 forKey:@"jpBlackColor"];
    XCTAssertThrows([RNWrappers configurationFromProperties:props]);
}

/*
* GIVEN: a UI configuration NSDictionary is passed to the wrapper with a valid [theme] property
*
* WHEN:  the [jpBlackColor] value is not a valid HEX format (#••••••)
*
* THEN:  an 'invalid JPBlack color format' exception should be thrown
*/
- (void)test_OnInvalidJPBlackColorFormat_ThrowError {
    NSDictionary *props = [self propertiesWithThemeValue:@"FFFFFF" forKey:@"jpBlackColor"];
    XCTAssertThrows([RNWrappers configurationFromProperties:props]);
}

/*
* GIVEN: a UI configuration NSDictionary is passed to the wrapper with a valid [theme] property
*
* WHEN:  the [jpBlackColor] value is a valid HEX format (#••••••)
*
* THEN:  the JPConfiguration object should be succesfully initialized with a valid color
*/
- (void)test_OnValidJPBlackColorFormat_ThrowError {
    NSDictionary *props = [self propertiesWithThemeValue:@"#FFFFFF" forKey:@"jpBlackColor"];
    JPConfiguration *config = [RNWrappers configurationFromProperties:props];
    UIColor *color = [UIColor colorFromHexString:@"#FFFFFF"];
    XCTAssertTrue([config.uiConfiguration.theme.jpBlackColor isEqual:color]);
}

/*
* GIVEN: a UI configuration NSDictionary is passed to the wrapper with a valid [theme] property
*
* WHEN:  the [jpDarkGrayColor] property of the [theme] dictionary is not an NSString
*
* THEN:  an 'invalid JPDarkGray color' exception should be thrown
*/
- (void)test_OnInvalidJPDarkGrayColor_ThrowError {
    NSDictionary *props = [self propertiesWithThemeValue:@123 forKey:@"jpDarkGrayColor"];
    XCTAssertThrows([RNWrappers configurationFromProperties:props]);
}

/*
* GIVEN: a UI configuration NSDictionary is passed to the wrapper with a valid [theme] property
*
* WHEN:  the [jpDarkGrayColor] value is not a valid HEX format (#••••••)
*
* THEN:  an 'invalid JPDarkGray color format' exception should be thrown
*/
- (void)test_OnInvalidJPDarkGrayColorFormat_ThrowError {
    NSDictionary *props = [self propertiesWithThemeValue:@"FFFFFF" forKey:@"jpDarkGrayColor"];
    XCTAssertThrows([RNWrappers configurationFromProperties:props]);
}

/*
* GIVEN: a UI configuration NSDictionary is passed to the wrapper with a valid [theme] property
*
* WHEN:  the [jpDarkGrayColor] value is a valid HEX format (#••••••)
*
* THEN:  the JPConfiguration object should be succesfully initialized with a valid color
*/
- (void)test_OnValidJPDarkGrayColorFormat_ThrowError {
    NSDictionary *props = [self propertiesWithThemeValue:@"#FFFFFF" forKey:@"jpDarkGrayColor"];
    JPConfiguration *config = [RNWrappers configurationFromProperties:props];
    UIColor *color = [UIColor colorFromHexString:@"#FFFFFF"];
    XCTAssertTrue([config.uiConfiguration.theme.jpDarkGrayColor isEqual:color]);
}

/*
* GIVEN: a UI configuration NSDictionary is passed to the wrapper with a valid [theme] property
*
* WHEN:  the [jpGrayColor] property of the [theme] dictionary is not an NSString
*
* THEN:  an 'invalid JPGray color' exception should be thrown
*/
- (void)test_OnInvalidJPGrayColor_ThrowError {
    NSDictionary *props = [self propertiesWithThemeValue:@123 forKey:@"jpGrayColor"];
    XCTAssertThrows([RNWrappers configurationFromProperties:props]);
}

/*
* GIVEN: a UI configuration NSDictionary is passed to the wrapper with a valid [theme] property
*
* WHEN:  the [jpGrayColor] value is not a valid HEX format (#••••••)
*
* THEN:  an 'invalid JPGray color format' exception should be thrown
*/
- (void)test_OnInvalidJPGrayColorFormat_ThrowError {
    NSDictionary *props = [self propertiesWithThemeValue:@"FFFFFF" forKey:@"jpGrayColor"];
    XCTAssertThrows([RNWrappers configurationFromProperties:props]);
}

/*
* GIVEN: a UI configuration NSDictionary is passed to the wrapper with a valid [theme] property
*
* WHEN:  the [jpGrayColor] value is a valid HEX format (#••••••)
*
* THEN:  the JPConfiguration object should be succesfully initialized with a valid color
*/
- (void)test_OnValidJPGrayColorFormat_ThrowError {
    NSDictionary *props = [self propertiesWithThemeValue:@"#FFFFFF" forKey:@"jpGrayColor"];
    JPConfiguration *config = [RNWrappers configurationFromProperties:props];
    UIColor *color = [UIColor colorFromHexString:@"#FFFFFF"];
    XCTAssertTrue([config.uiConfiguration.theme.jpGrayColor isEqual:color]);
}

/*
* GIVEN: a UI configuration NSDictionary is passed to the wrapper with a valid [theme] property
*
* WHEN:  the [jpLightGrayColor] property of the [theme] dictionary is not an NSString
*
* THEN:  an 'invalid JPLightGray color' exception should be thrown
*/
- (void)test_OnInvalidJPLightGrayColor_ThrowError {
    NSDictionary *props = [self propertiesWithThemeValue:@123 forKey:@"jpLightGrayColor"];
    XCTAssertThrows([RNWrappers configurationFromProperties:props]);
}

/*
* GIVEN: a UI configuration NSDictionary is passed to the wrapper with a valid [theme] property
*
* WHEN:  the [jpLightGrayColor] value is not a valid HEX format (#••••••)
*
* THEN:  an 'invalid JPLightGray color format' exception should be thrown
*/
- (void)test_OnInvalidJPLightGrayColorFormat_ThrowError {
    NSDictionary *props = [self propertiesWithThemeValue:@"FFFFFF" forKey:@"jpLightGrayColor"];
    XCTAssertThrows([RNWrappers configurationFromProperties:props]);
}

/*
* GIVEN: a UI configuration NSDictionary is passed to the wrapper with a valid [theme] property
*
* WHEN:  the [jpLightGrayColor] value is a valid HEX format (#••••••)
*
* THEN:  the JPLightGray object should be succesfully initialized with a valid color
*/
- (void)test_OnValidJPLightGrayColorFormat_ThrowError {
    NSDictionary *props = [self propertiesWithThemeValue:@"#FFFFFF" forKey:@"jpLightGrayColor"];
    JPConfiguration *config = [RNWrappers configurationFromProperties:props];
    UIColor *color = [UIColor colorFromHexString:@"#FFFFFF"];
    XCTAssertTrue([config.uiConfiguration.theme.jpLightGrayColor isEqual:color]);
}

/*
* GIVEN: a UI configuration NSDictionary is passed to the wrapper with a valid [theme] property
*
* WHEN:  the [jpRedColor] property of the [theme] dictionary is not an NSString
*
* THEN:  an 'invalid JPRed color' exception should be thrown
*/
- (void)test_OnInvalidJPRedColor_ThrowError {
    NSDictionary *props = [self propertiesWithThemeValue:@123 forKey:@"jpRedColor"];
    XCTAssertThrows([RNWrappers configurationFromProperties:props]);
}

/*
* GIVEN: a UI configuration NSDictionary is passed to the wrapper with a valid [theme] property
*
* WHEN:  the [jpRedColor] value is not a valid HEX format (#••••••)
*
* THEN:  an 'invalid JPRed color format' exception should be thrown
*/
- (void)test_OnInvalidJPRedColorFormat_ThrowError {
    NSDictionary *props = [self propertiesWithThemeValue:@"FFFFFF" forKey:@"jpRedColor"];
    XCTAssertThrows([RNWrappers configurationFromProperties:props]);
}

/*
* GIVEN: a UI configuration NSDictionary is passed to the wrapper with a valid [theme] property
*
* WHEN:  the [jpRedColor] value is a valid HEX format (#••••••)
*
* THEN:  the JPRed object should be succesfully initialized with a valid color
*/
- (void)test_OnValidJPRedColorFormat_ThrowError {
    NSDictionary *props = [self propertiesWithThemeValue:@"#FFFFFF" forKey:@"jpRedColor"];
    JPConfiguration *config = [RNWrappers configurationFromProperties:props];
    UIColor *color = [UIColor colorFromHexString:@"#FFFFFF"];
    XCTAssertTrue([config.uiConfiguration.theme.jpRedColor isEqual:color]);
}

/*
* GIVEN: a UI configuration NSDictionary is passed to the wrapper with a valid [theme] property
*
* WHEN:  the [jpWhiteColor] property of the [theme] dictionary is not an NSString
*
* THEN:  an 'invalid JPWhite color' exception should be thrown
*/
- (void)test_OnInvalidJPWhiteColor_ThrowError {
    NSDictionary *props = [self propertiesWithThemeValue:@123 forKey:@"jpWhiteColor"];
    XCTAssertThrows([RNWrappers configurationFromProperties:props]);
}

/*
* GIVEN: a UI configuration NSDictionary is passed to the wrapper with a valid [theme] property
*
* WHEN:  the [jpWhiteColor] value is not a valid HEX format (#••••••)
*
* THEN:  an 'invalid JPWhite color format' exception should be thrown
*/
- (void)test_OnInvalidJPWhiteColorFormat_ThrowError {
    NSDictionary *props = [self propertiesWithThemeValue:@"FFFFFF" forKey:@"jpWhiteColor"];
    XCTAssertThrows([RNWrappers configurationFromProperties:props]);
}

/*
* GIVEN: a UI configuration NSDictionary is passed to the wrapper with a valid [theme] property
*
* WHEN:  the [jpWhiteColor] value is a valid HEX format (#••••••)
*
* THEN:  the JPWhite object should be succesfully initialized with a valid color
*/
- (void)test_OnValidJPWhiteColorFormat_ThrowError {
    NSDictionary *props = [self propertiesWithThemeValue:@"#FFFFFF" forKey:@"jpWhiteColor"];
    JPConfiguration *config = [RNWrappers configurationFromProperties:props];
    UIColor *color = [UIColor colorFromHexString:@"#FFFFFF"];
    XCTAssertTrue([config.uiConfiguration.theme.jpWhiteColor isEqual:color]);
}

/*
* GIVEN: a UI configuration NSDictionary is passed to the wrapper with a valid [theme] property
*
* WHEN:  the [buttonColor] property of the [theme] dictionary is not an NSString
*
* THEN:  an 'invalid button color' exception should be thrown
*/
- (void)test_OnInvalidButtonColor_ThrowError {
    NSDictionary *props = [self propertiesWithThemeValue:@123 forKey:@"buttonColor"];
    XCTAssertThrows([RNWrappers configurationFromProperties:props]);
}

/*
* GIVEN: a UI configuration NSDictionary is passed to the wrapper with a valid [theme] property
*
* WHEN:  the [buttonColor] value is not a valid HEX format (#••••••)
*
* THEN:  an 'invalid button color format' exception should be thrown
*/
- (void)test_OnInvalidButtonColorFormat_ThrowError {
    NSDictionary *props = [self propertiesWithThemeValue:@"FFFFFF" forKey:@"buttonColor"];
    XCTAssertThrows([RNWrappers configurationFromProperties:props]);
}

/*
* GIVEN: a UI configuration NSDictionary is passed to the wrapper with a valid [theme] property
*
* WHEN:  the [buttonColor] value is a valid HEX format (#••••••)
*
* THEN:  the button color should be succesfully initialized with a valid color
*/
- (void)test_OnValidButtonColorFormat_ThrowError {
    NSDictionary *props = [self propertiesWithThemeValue:@"#FFFFFF" forKey:@"buttonColor"];
    JPConfiguration *config = [RNWrappers configurationFromProperties:props];
    UIColor *color = [UIColor colorFromHexString:@"#FFFFFF"];
    XCTAssertTrue([config.uiConfiguration.theme.buttonColor isEqual:color]);
}

/*
* GIVEN: a UI configuration NSDictionary is passed to the wrapper with a valid [theme] property
*
* WHEN:  the [buttonTitleColor] property of the [theme] dictionary is not an NSString
*
* THEN:  an 'invalid button title color' exception should be thrown
*/
- (void)test_OnInvalidButtonTitleColor_ThrowError {
    NSDictionary *props = [self propertiesWithThemeValue:@123 forKey:@"buttonTitleColor"];
    XCTAssertThrows([RNWrappers configurationFromProperties:props]);
}

/*
* GIVEN: a UI configuration NSDictionary is passed to the wrapper with a valid [theme] property
*
* WHEN:  the [buttonTitleColor] value is not a valid HEX format (#••••••)
*
* THEN:  an 'invalid button title color format' exception should be thrown
*/
- (void)test_OnInvalidButtonTitleColorFormat_ThrowError {
    NSDictionary *props = [self propertiesWithThemeValue:@"FFFFFF" forKey:@"buttonTitleColor"];
    XCTAssertThrows([RNWrappers configurationFromProperties:props]);
}

/*
* GIVEN: a UI configuration NSDictionary is passed to the wrapper with a valid [theme] property
*
* WHEN:  the [buttonTitleColor] value is a valid HEX format (#••••••)
*
* THEN:  the button title color should be succesfully initialized with a valid color
*/
- (void)test_OnValidButtonTitleColorFormat_ThrowError {
    NSDictionary *props = [self propertiesWithThemeValue:@"#FFFFFF" forKey:@"buttonTitleColor"];
    JPConfiguration *config = [RNWrappers configurationFromProperties:props];
    UIColor *color = [UIColor colorFromHexString:@"#FFFFFF"];
    XCTAssertTrue([config.uiConfiguration.theme.buttonTitleColor isEqual:color]);
}

/*
* GIVEN: a UI configuration NSDictionary is passed to the wrapper with a valid [theme] property
*
* WHEN:  the [backButtonImage] property of the [theme] dictionary is not an NSString
*
* THEN:  an 'invalid back button image' exception should be thrown
*/
- (void)test_OnInvalidBackButtonImage_ThrowError {
    NSDictionary *props = [self propertiesWithThemeValue:@123 forKey:@"backButtonImage"];
    XCTAssertThrows([RNWrappers configurationFromProperties:props]);
}

/*
* GIVEN: a UI configuration NSDictionary is passed to the wrapper with a valid [theme] property
*
* WHEN:  the [buttonCornerRadius] property of the [theme] dictionary is not a double
*
* THEN:  an 'invalid button corner radius' exception should be thrown
*/
- (void)test_OnInvalidButtonCornerRadius_ThrowError {
    NSDictionary *props = [self propertiesWithThemeValue:@"hello" forKey:@"buttonCornerRadius"];
    XCTAssertThrows([RNWrappers configurationFromProperties:props]);
}

#pragma mark - Helpers

- (NSMutableDictionary *)propertiesWithThemeValue:(id)value
                                           forKey:(NSString *)key{
    
    NSMutableDictionary *mockProps = RNMocks.properties;
    NSMutableDictionary *mockConfig = RNMocks.configuration;
    NSMutableDictionary *uiConfiguration = [mockConfig[@"uiConfiguration"] mutableCopy];
    NSMutableDictionary *theme = [uiConfiguration[@"theme"] mutableCopy];
    
    theme[key] = value;
    
    uiConfiguration[@"theme"] = theme;
    mockConfig[@"uiConfiguration"] = uiConfiguration;
    mockProps[@"configuration"] = mockConfig;
    
    return mockProps;
}


@end
