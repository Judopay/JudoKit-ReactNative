//
//  NSException+JudoValidationExceptions.h
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

@interface NSException (JudoValidationExceptions)

/**
 * An exception which triggers when the value for a specified dictionary key is not defined
 *
 * @param key - the key of the undefined value
 *
 * @returns a nonnull NSException instance
 */
+ (nonnull NSException *)exceptionUndefinedConfigurationWithKey:(nonnull NSString *)key;

/**
 * An exception which triggers when the value for a specified dictionary key does not match the desired type
 *
 * @param key - the key of the undefined value
 * @param aClass - the expected class type
 *
 * @returns a nonnull NSException instance
 */
+ (nonnull NSException *)exceptionUnexpectedClassOfConfigurationWithKey:(nonnull NSString *)key
                                                               andClass:(nonnull Class)aClass;

/**
 * An exception which triggers when the value for a specified dictionary key does not match the desired format
 *
 * @param key - the key of the undefined value
 * @param format - the expected NSString format
 *
 * @returns a nonnull NSException instance
 */
+ (nonnull NSException *)exceptionUnexpectedFormatConfigurationWithKey:(nonnull NSString *)key
                                                        expectedFormat:(nonnull NSString *)format;

@end
