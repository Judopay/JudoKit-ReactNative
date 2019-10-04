#import <UIKit/UIKit.h>

#import <React/RCTView.h>

@interface RNNativePayButton : RCTView

@property (nonatomic, copy) RCTBubblingEventBlock onPayPress;

@end
