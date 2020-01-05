#import "RNApplePayButton.h"
#import <React/RCTViewManager.h>
#import <PassKit/PassKit.h>

@interface RNApplePayButtonManager : RCTViewManager
@end

@implementation RNApplePayButtonManager

RCT_EXPORT_MODULE(RNApplePayButton)
RCT_EXPORT_VIEW_PROPERTY(onPayPress, RCTBubblingEventBlock)
RCT_CUSTOM_VIEW_PROPERTY(isDark, BOOL, RNApplePayButton) {
    view.isDark = [RCTConvert BOOL:json];
    [view addButtonToView];
}

- (UIView *)view {
    return [RNApplePayButton new];
}

@end

@implementation RNApplePayButton {
    PKPaymentButton *applePayButton;
}

- (instancetype)initWithFrame:(CGRect)frame {
    if ((self = [super initWithFrame:frame])) {
        [self addButtonToView];
    }
    return self;
}

- (void)addButtonToView {
    if (applePayButton) {
        [applePayButton removeTarget:self action:@selector(onPress:) forControlEvents:UIControlEventTouchUpInside];
        [applePayButton removeFromSuperview];
        applePayButton = nil;
    }

    PKPaymentButtonStyle style = self.isDark ? PKPaymentButtonStyleBlack : PKPaymentButtonStyleWhite;
    applePayButton = [PKPaymentButton buttonWithType:PKPaymentButtonTypePlain style:style];
    [self addSubview:applePayButton];
    [applePayButton addTarget:self action:@selector(onPress:) forControlEvents:UIControlEventTouchUpInside];

    applePayButton.translatesAutoresizingMaskIntoConstraints = NO;
    [self addConstraints:[NSLayoutConstraint
                          constraintsWithVisualFormat:@"H:|-0-[applePayButton]-0-|"
                          options:NSLayoutFormatDirectionLeadingToTrailing
                          metrics:nil
                          views:NSDictionaryOfVariableBindings(applePayButton)]];
    [self addConstraints:[NSLayoutConstraint
                          constraintsWithVisualFormat:@"V:|-0-[applePayButton]-0-|"
                          options:NSLayoutFormatDirectionLeadingToTrailing
                          metrics:nil
                          views:NSDictionaryOfVariableBindings(applePayButton)]];
}

- (void)onPress:(id)sender {
    if (_onPayPress) {
        _onPayPress(@{});
    }
}

@end
