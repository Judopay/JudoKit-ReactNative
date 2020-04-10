//
//  RNWrappers.h
//  JudoPay
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


#import <JudoKitObjC/JudoKitObjC.h>

@interface RNWrappers : NSObject

/**
 * A method that returns a configured JudoKit instance based on the passed dictionary parameters
 * JudoKit initializes the Judo session based on a provided token and secret
 *
 * @param properties - an NSDictionary that contains the complete configuration properties set by the merchant
 *
 * @returns a configured JudoKit instance
 */
+ (JudoKit *)judoSessionFromProperties:(NSDictionary *)properties;

/**
 * A method that returns the correct TransactionType value based on the passed dictionary parameters
 * TransactionType is set to switch between Payment, PreAuth, Register Card, Check Card and Save Card transactions
 *
 * @param properties - an NSDictionary that contains the complete configuration properties set by the merchant
 *
 * @returns a TransactionType value
 */
+ (TransactionType)transactionTypeFromProperties:(NSDictionary *)properties;

/**
 * A method that returns the correct TransactionMode value based on the passed dictionary parameters
 * TransactionMode is set to switch between Payment and PreAuth transactions
 *
 * @param properties - an NSDictionary that contains the complete configuration properties set by the merchant
 *
 * @returns a TransactionMode value
 */
+ (TransactionMode)transactionModeFromProperties:(NSDictionary *)properties;

/**
 * A method that returns a configured JPConfiguration instance based on the passed dictionary parameters.
 * The JPConfiguration instance sets the required parameters for making transactions as well as customizing the payment flow
 *
 * @param properties - an NSDictionary that contains the complete configuration properties set by the merchant
 *
 * @returns a configured JPConfiguration instance
 */
+ (JPConfiguration *)configurationFromProperties:(NSDictionary *)properties;

/**
 * A method that returns the correct CardNetwork values based on the passed dictionary parameters.
 * CardNetwork is a bitmask that allows selection of multiple card networks. Once set, only these networks would be accepted.
 *
 * @param properties - an NSDictionary that contains the complete configuration properties set by the merchant
 *
 * @returns a configured JPConfiguration instance
 */
+ (CardNetwork)cardNetworksFromConfiguration:(NSDictionary *)configuration;

@end
