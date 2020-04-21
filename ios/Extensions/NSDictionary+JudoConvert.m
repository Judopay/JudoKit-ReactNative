//
//  NSDictionary+JudoConvert.m
//  RNJudopay
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

#import "NSDictionary+JudoConvert.h"
#import "NSException+JudoValidationExceptions.h"

@implementation NSDictionary (JudoConvert)

- (NSDictionary *)dictionaryForKey:(NSString *)key {
    return [self objectForKey:key shouldBeInstanceOfClass:NSDictionary.class andNonNil:YES];
}

- (NSDictionary *)optionalDictionaryForKey:(NSString *)key {
    return [self objectForKey:key shouldBeInstanceOfClass:NSDictionary.class andNonNil:NO];
}

- (NSArray *)arrayForKey:(NSString *)key {
    return [self objectForKey:key shouldBeInstanceOfClass:NSArray.class andNonNil:YES];
}

- (NSArray *)optionalArrayForKey:(NSString *)key {
    return [self objectForKey:key shouldBeInstanceOfClass:NSArray.class andNonNil:NO];
}

- (NSString *)stringForKey:(NSString *)key {
    return [self objectForKey:key shouldBeInstanceOfClass:NSString.class andNonNil:YES];
}

- (NSString *)optionalStringForKey:(NSString *)key {
    return [self objectForKey:key shouldBeInstanceOfClass:NSString.class andNonNil:NO];
}

- (NSNumber *)numberForKey:(NSString *)key {
    return [self objectForKey:key shouldBeInstanceOfClass:NSNumber.class andNonNil:YES];
}

- (NSNumber *)optionalNumberForKey:(NSString *)key {
    return [self objectForKey:key shouldBeInstanceOfClass:NSNumber.class andNonNil:NO];
}

- (NSNumber *)boolForKey:(NSString *)key {
    return [self objectForKey:key shouldBeInstanceOfClass:@(YES).class andNonNil:YES];
}

- (NSNumber *)optionalBoolForKey:(NSString *)key {
    return [self objectForKey:key shouldBeInstanceOfClass:@(YES).class andNonNil:NO];
}

- (NSNumber *)intForKey:(NSString *)key {
    return [self objectForKey:key shouldBeInstanceOfClass:@(1).class andNonNil:YES];
}

- (NSNumber *)optionalIntForKey:(NSString *)key {
    return [self objectForKey:key shouldBeInstanceOfClass:@(1).class andNonNil:NO];
}

- (id)objectForKey:(NSString *)key shouldBeInstanceOfClass:(Class)aClass andNonNil:(BOOL)forceNonNil {
    
    if ([self.allKeys containsObject:key]) {
        
        id object = [self objectForKey:key andInstanceOfClass:aClass];

        if (!object && forceNonNil) {
            @throw [NSException exceptionNilConfigurationWithKey:key];
        }
        
        return object;
    }

    if (forceNonNil) {
        @throw [NSException exceptionUndefinedConfigurationWithKey:key];
    }
    
    return nil;
}

- (id)objectForKey:(NSString *)key andInstanceOfClass:(Class)aClass {
    id object = [self objectForKey:key];

    if (!object || [object isKindOfClass:NSNull.class]) {
        return nil;
    }

    if ([object isKindOfClass:aClass]) {
        return object;
    }
    
    @throw [NSException exceptionUnexpectedClassOfConfigurationWithKey:key andClass:aClass];
}

@end
