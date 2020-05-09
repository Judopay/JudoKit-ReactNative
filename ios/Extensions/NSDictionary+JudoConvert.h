//
//  NSDictionary+JudoConvert.h
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

@interface NSDictionary (JudoConvert)

/**
 * A method that extracts an [NSDictionary] instance from the dictionary and throws if failed
 *
 * @param key - the key used to find the NSDictionary instance
 *
 * @return a non-nullable NSDictionary instance
 */
- (nonnull NSDictionary *)dictionaryForKey:(nonnull NSString *)key;

/**
 * A method that extracts an optional [NSDictionary] instance from the dictionary and throws if failed
 *
 * @param key - the key used to find the NSDictionary instance
 *
 * @return a nullable NSDictionary instance
 */
- (nullable NSDictionary *)optionalDictionaryForKey:(nonnull NSString *)key;

/**
 * A method that extracts an [NSArray] instance from the dictionary and throws if failed
 *
 * @param key - the key used to find the NSArray instance
 *
 * @return a non-nullable NSArray instance
 */
- (nonnull NSArray *)arrayForKey:(nonnull NSString *)key;

/**
 * A method that extracts an optional [NSArray] instance from the dictionary and throws if failed
 *
 * @param key - the key used to find the NSArray instance
 *
 * @return a nullable NSArray instance
 */
- (nullable NSArray *)optionalArrayForKey:(nonnull NSString *)key;

/**
 * A method that extracts an [NSString] instance from the dictionary and throws if failed
 *
 * @param key - the key used to find the NSString instance
 *
 * @return a non-nullable NSString instance
 */
- (nonnull NSString *)stringForKey:(nonnull NSString *)key;

/**
 * A method that extracts an optional [NSString] instance from the dictionary and throws if failed
 *
 * @param key - the key used to find the NSString instance
 *
 * @return a nullable NSString instance
 */
- (nullable NSString *)optionalStringForKey:(nonnull NSString *)key;

/**
 * A method that extracts an [NSNumber] instance from the dictionary and throws if failed
 *
 * @param key - the key used to find the NSNumber instance
 *
 * @return a non-nullable NSNumber instance
 */
- (nonnull NSNumber *)numberForKey:(nonnull NSString *)key;

/**
 * A method that extracts an optional [NSNumber] instance from the dictionary and throws if failed
 *
 * @param key - the key used to find the NSNumber instance
 *
 * @return a nullable NSNumber instance
 */
- (nullable NSNumber *)optionalNumberForKey:(nonnull NSString *)key;

/**
 * A method that extracts an [Bool NSNumber] instance from the dictionary and throws if failed
 *
 * @param key - the key used to find the Bool NSNumber instance
 *
 * @return a non-nullable Bool NSNumber instance
 */
- (nonnull NSNumber *)boolForKey:(nonnull NSString *)key;

/**
 * A method that extracts an optional [Bool NSNumber] instance from the dictionary and throws if failed
 *
 * @param key - the key used to find the Bool NSNumber instance
 *
 * @return a nullable Bool NSNumber instance
 */
- (nullable NSNumber *)optionalBoolForKey:(nonnull NSString *)key;

/**
 * A method that extracts a valid [HEX Color NSString] instance from the dictionary and throws if failed
 *
 * @param key - the key used to find the HEX NSString instance
 *
 * @return a non-nullable HEX NSString instance
 */
- (nonnull NSString *)hexColorForKey:(nonnull NSString *)key;

@end
