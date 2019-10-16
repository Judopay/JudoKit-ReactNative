#import <UIKit/UIKit.h>

#import <React/RCTView.h>

@interface RNApplePayButton : RCTView

@property (nonatomic, copy) RCTBubblingEventBlock onPayPress;
@property (nonatomic, strong) NSNumber *styleId;

- (void) addButtonToView;

@end
