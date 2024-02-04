//
//  RNTypes.h
//  JudoKitReactNative
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

#define BitmaskContains(bitmask, value) (((bitmask) & (value)) == (value))

typedef NS_OPTIONS(NSUInteger, IOSPaymentMethod) {
    IOSPaymentMethodCard = 1 << 0,
    IOSPaymentMethodApplePay = 1 << 1,
    IOSPaymentMethodIDEAL = 1 << 3,
    IOSPaymentMethodAll = 1 << 5,
};

typedef NS_OPTIONS(NSUInteger, IOSCardNetwork) {
    IOSCardNetworkVisa = 1 << 0,
    IOSCardNetworkMastercard = 1 << 1,
    IOSCardNetworkMaestro = 1 << 2,
    IOSCardNetworkAmex = 1 << 3,
    IOSCardNetworkChinaUnionPay = 1 << 4,
    IOSCardNetworkJCB = 1 << 5,
    IOSCardNetworkDiscover = 1 << 6,
    IOSCardNetworkDinersClub = 1 << 7,
    IOSCardNetworkAll = 1 << 8,
};

typedef NS_OPTIONS(NSUInteger, IOSApplePayCapability) {
    IOSApplePayCapability3DS = 1 << 0,
    IOSApplePayCapabilityEMV = 1 << 1,
    IOSApplePayCapabilityCredit = 1 << 2,
    IOSApplePayCapabilityDebit = 1 << 3,
    IOSApplePayCapabilityAll = 1 << 4,
};

typedef NS_OPTIONS(NSUInteger, IOSAppleContactField) {
    IOSAppleContactFieldPostalAddress = 1 << 0,
    IOSAppleContactFieldPhone = 1 << 1,
    IOSAppleContactFieldEmail = 1 << 2,
    IOSAppleContactFieldName = 1 << 3,
    IOSAppleContactFieldAll = 1 << 4,
};

typedef NS_OPTIONS(NSUInteger, IOSAppleReturnedInfo) {
    IOSAppleReturnedInfoBilling = 1 << 0,
    IOSAppleReturnedInfoShipping = 1 << 1,
    IOSAppleReturnedInfoAll = 1 << 2,
};

typedef NS_ENUM(NSUInteger, IOSShippingType) {
    IOSShippingTypeShipping,
    IOSShippingTypeDelivery,
    IOSShippingTypeStorePickup,
    IOSShippingTypeServicePickup,
};

typedef NS_ENUM(NSUInteger, IOSCalendarUnit) {
    IOSCalendarUnitYear = 1,
    IOSCalendarUnitMonth,
    IOSCalendarUnitDay,
    IOSCalendarUnitHour,
    IOSCalendarUnitMinute,
};
