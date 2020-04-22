//
//  UIColor+Additions.h
//  RNJudo
//
//  Created by Andrei Galkin on 4/22/20.
//  Copyright © 2020 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface UIColor (Additions)

/**
 * A method which returns an UIImage based on a HEX value
 */
+ (UIColor *)colorFromHexString:(NSString *)hexString;

@end
