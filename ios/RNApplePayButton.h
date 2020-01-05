#import <UIKit/UIKit.h>
#import <React/RCTView.h>

@interface RNApplePayButton : RCTView

@property (nonatomic, assign) BOOL isDark;
@property (nonatomic, copy) RCTBubblingEventBlock onPayPress;
- (void) addButtonToView;

@end
