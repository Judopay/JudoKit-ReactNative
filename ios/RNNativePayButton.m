
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

- (UIView *)view
{
  return [RNNativePayButton new];
}

@end

@interface RNNativePayButton () <RCTRootViewDelegate>

@property (nonatomic, strong) NSNumber *styleId;

@end

@implementation RNNativePayButton
{
  PKPaymentButton *_applePayButton;
}

- (instancetype)initWithFrame:(CGRect)frame
{
  if ((self = [super initWithFrame:frame])) {
    PKPaymentButtonStyle style = PKPaymentButtonStyleBlack;
//    if ([self.styleId intValue] == 0) {
//      style = PKPaymentButtonStyleWhite;
//    }
    _applePayButton = [PKPaymentButton buttonWithType: PKPaymentButtonTypePlain
                                                style: style];
    [_applePayButton addTarget:self action:@selector(onPayPress:) forControlEvents:UIControlEventTouchUpInside];
    [self addSubview:_applePayButton];
  }
  return self;
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

RCT_CUSTOM_VIEW_PROPERTY(setThemeStyle, NSNumber, RNNativePayButton)
{
  NSNumber *style = json ? [RCTConvert NSNumber:json] : 0;
  self.styleId = style;
  [self reactSubviews];
}

@end
