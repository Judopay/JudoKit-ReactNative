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

- (nonnull NSDictionary *)dictionaryForKey:(nonnull NSString *)key;
- (nullable NSDictionary *)optionalDictionaryForKey:(nonnull NSString *)key;

- (nonnull NSArray *)arrayForKey:(nonnull NSString *)key;
- (nullable NSArray *)optionalArrayForKey:(nonnull NSString *)key;

- (nonnull NSString *)stringForKey:(nonnull NSString *)key;
- (nullable NSString *)optionalStringForKey:(nonnull NSString *)key;

- (nonnull NSNumber *)numberForKey:(nonnull NSString *)key;
- (nullable NSNumber *)optionalNumberForKey:(nonnull NSString *)key;

- (nonnull NSNumber *)boolForKey:(nonnull NSString *)key;
- (nullable NSNumber *)optionalBoolForKey:(nonnull NSString *)key;

- (nonnull NSString *)hexColorForKey:(nonnull NSString *)key;
@end
