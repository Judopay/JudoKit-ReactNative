
#import "RNNativePayButton.h"

#import <React/RCTBridge.h>
#import <React/RCTRootView.h>
#import <React/RCTRootViewDelegate.h>
#import <React/RCTViewManager.h>
#import <PassKit/PassKit.h>

@interface RNApplePayButtonManager : RCTViewManager

@end

@implementation RNApplePayButtonManager

RCT_EXPORT_MODULE(RNNativePayButton);
RCT_EXPORT_VIEW_PROPERTY(onPayPress, RCTBubblingEventBlock);

RCT_CUSTOM_VIEW_PROPERTY(setThemeStyle, NSNumber, RNNativePayButton) {
  [view setStyleId:json ? [RCTConvert NSNumber:json] : [NSNumber numberWithInt: 0]];
  [view addButtonToView];
}

- (UIView *)view
{
  return [RNNativePayButton new];
}

@end

@implementation RNNativePayButton
{
  PKPaymentButton *_applePayButton;
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
  if (_applePayButton != nil) {
    [_applePayButton removeFromSuperview];
  }
  PKPaymentButtonStyle style = PKPaymentButtonStyleWhite;
  if ([self.styleId intValue] == 1) {
    style = PKPaymentButtonStyleBlack;
  }
  _applePayButton = [PKPaymentButton buttonWithType: PKPaymentButtonTypePlain
                                              style: style];
  [_applePayButton addTarget:self action:@selector(onPayPress:) forControlEvents:UIControlEventTouchUpInside];
  [self addSubview:_applePayButton];
}

- (void)onPayPress:(id)sender
{
  self.onPayPress(@{});
}

- (void)layoutSubviews
{
  float rootViewWidth = self.bounds.size.width;
  float rootViewHeigh = self.bounds.size.height;
  [_applePayButton setFrame:CGRectMake(0, 0, rootViewWidth, rootViewHeigh)];
}

- (NSArray<UIView<RCTComponent> *> *)reactSubviews
{
  // this is to avoid unregistering our RCTRootView when the component is removed from RN hierarchy
  (void)[super reactSubviews];
  return @[];
}

@end
