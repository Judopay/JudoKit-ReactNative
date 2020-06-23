//
//  RNPBBAButton.m
//  RNJudo
//
//  Created by Mihai Petrenco on 6/23/20.
//  Copyright © 2020 Alternative Payments Ltd. All rights reserved.
//

#import <React/RCTViewManager.h>
#import <JudoKit-iOS/JudoKit_iOS.h>

@interface RNPBBAButtonManager: RCTViewManager
@end

@implementation RNPBBAButtonManager

RCT_EXPORT_MODULE(RNPBBAButton)

- (UIView *)view {
    return [JPPBBAButton new];
}

@end
