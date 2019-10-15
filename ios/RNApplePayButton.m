
#import "RNApplePayButton.h"

#import <React/RCTBridge.h>
#import <React/RCTRootView.h>
#import <React/RCTRootViewDelegate.h>
#import <React/RCTViewManager.h>
#import <PassKit/PassKit.h>

@interface RNApplePayButtonManager : RCTViewManager

@end

@implementation RNApplePayButtonManager

RCT_EXPORT_MODULE(RNApplePayButton);
RCT_EXPORT_VIEW_PROPERTY(onPayPress, RCTBubblingEventBlock);

RCT_CUSTOM_VIEW_PROPERTY(setThemeStyle, NSNumber, RNApplePayButton) {
  [view setStyleId:json ? [RCTConvert NSNumber:json] : [NSNumber numberWithInt: 0]];
  [view addButtonToView];
}

- (UIView *)view
{
  return [RNApplePayButton new];
}

@end

@implementation RNApplePayButton
{
  PKPaymentButton *applePayButton;
}

- (instancetype)initWithFrame:(CGRect)frame
{
  if ((self = [super initWithFrame:frame])) {
    [self addButtonToView];
  }
  return self;
}

- (void) addButtonToView
{
  if (applePayButton != nil) {
    [applePayButton removeFromSuperview];
  }
  PKPaymentButtonStyle style = PKPaymentButtonStyleWhite;
  if ([self.styleId intValue] == 1) {
    style = PKPaymentButtonStyleBlack;
  }
  applePayButton = [PKPaymentButton buttonWithType: PKPaymentButtonTypePlain
                                              style: style];
  [applePayButton addTarget:self action:@selector(onPayPress:) forControlEvents:UIControlEventTouchUpInside];
  [self addSubview: applePayButton];
}

- (void)onPayPress:(id)sender
{
  self.onPayPress(@{});
}

- (void)layoutSubviews
{
  float width = self.bounds.size.width;
  float height = self.bounds.size.height;
  [applePayButton setFrame:CGRectMake(0, 0, width, height)];
}

- (NSArray<UIView<RCTComponent> *> *)reactSubviews
{
  // this is to avoid unregistering our RCTRootView when the component is removed from RN hierarchy
  [super reactSubviews];
  return @[];
}

@end
