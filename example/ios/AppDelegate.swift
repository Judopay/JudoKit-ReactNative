// import UIKit
// import React

// @objc(AppDelegate)
// class AppDelegate: UIResponder, UIApplicationDelegate {

//   var window: UIWindow?

//   func application(
//     _ application: UIApplication,
//     didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]? = nil
//   ) -> Bool {

//     let bridge = RCTBridge(delegate: self, launchOptions: launchOptions)
//     let rootView = RCTRootView(bridge: bridge!, moduleName: "JudoKitReactNativeExample", initialProperties: nil)

//     let rootViewController = UIViewController()
//     rootViewController.view = rootView

//     window = UIWindow(frame: UIScreen.main.bounds)
//     window?.rootViewController = rootViewController
//     window?.makeKeyAndVisible()

//     return true
//   }
// }

// extension AppDelegate: RCTBridgeDelegate {
//   func sourceURL(for bridge: RCTBridge!) -> URL! {
// #if DEBUG
//     return RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index", fallbackExtension: nil)
// #else
//     return Bundle.main.url(forResource: "main", withExtension: "jsbundle")
// #endif
//   }
// }

import UIKit
import React
import React_RCTAppDelegate
import ReactAppDependencyProvider

@main
class AppDelegate: RCTAppDelegate {
  override func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey : Any]? = nil) -> Bool {
    self.moduleName = "JudoKitReactNativeExample"
    self.dependencyProvider = RCTAppDependencyProvider()
    self.initialProps = [:]
    return super.application(application, didFinishLaunchingWithOptions: launchOptions)
  }
  
  override func sourceURL(for bridge: RCTBridge) -> URL? {
    self.bundleURL()
  }
  
  override func bundleURL() -> URL? {
#if DEBUG
    RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
#else
    Bundle.main.url(forResource: "main", withExtension: "jsbundle")
#endif
  }
}
