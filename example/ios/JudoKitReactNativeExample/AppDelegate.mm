#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
@import Wormholy;

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"JudoKitReactNativeExample";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};

// This is a quick hack to workaround the fact that the `static void __attribute__ ((constructor)) wormholy_constructor(void)` is not invoked; hence we do it manually below.
// TODO: Research the issue and eliminate this hack.
#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wundeclared-selector"
  [Wormholy.class performSelector:@selector(applicationDidFinishLaunching)];
#pragma clang diagnostic pop

  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self getBundleURL];
}

- (NSURL *)getBundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
