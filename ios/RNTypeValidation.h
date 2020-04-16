//
//  RNTypeValidation.h
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

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface RNTypeValidation : NSObject

/**
* A method that checks if the provided dictionary with configurations has the right properties type.
*
* @param properties - an NSDictionary that contains the complete configuration properties set by the merchant
*
* @returns  nil if all propeties of the provided dictionary are of the correct type or the failure reason as a NSString
*/
+ (nullable NSString *)isConfigurationValid:(NSDictionary *)properties;

/**
* A method that checks if the provided dictionary with apple pay configurations has the righ propertiest type.
*
* @param properties - an NSDictionary that contains the complete configuration properties set by the merchant
*
* @returns  nil if all propeties of the provided dictionary are of the correct type  or the failure reason as a NSString
*/
+ (nullable NSString *)isApplePayConfigurationValid:(NSMutableDictionary *)properties;

@end

NS_ASSUME_NONNULL_END
