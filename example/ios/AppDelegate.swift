import UIKit
import React
import React_RCTAppDelegate
import ReactAppDependencyProvider
import Wormholy

@main
class AppDelegate: UIResponder, UIApplicationDelegate {
  
  var window: UIWindow?

  var reactNativeDelegate: ReactNativeDelegate?
  var reactNativeFactory: RCTReactNativeFactory?

  func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]? = nil
  ) -> Bool {
    let delegate = ReactNativeDelegate()
    let factory = RCTReactNativeFactory(delegate: delegate)
    delegate.dependencyProvider = RCTAppDependencyProvider()

    reactNativeDelegate = delegate
    reactNativeFactory = factory

    window = UIWindow(frame: UIScreen.main.bounds)

    factory.startReactNative(
      withModuleName: "JudoKitReactNativeExample",
      in: window,
      launchOptions: launchOptions
    )

    WormholySetup.configure()
    return true
  }
  
}

class ReactNativeDelegate: RCTDefaultReactNativeFactoryDelegate {
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

@objc class WormholySetup: NSObject {
  @objc static func configure() {
    // 'SwiftyLoad' is necessary to initialize the Wormholy (otherwise doesn't display its UI on shake).
    Wormholy.swiftyLoad()
    // This step swaps impl. of URLSessionConfiguration.default (otherwise API requests are not displayed in Wormholy).
    let originalSelector = #selector(getter: URLSessionConfiguration.default)
    let swizzledSelector = #selector(URLSessionConfiguration.wormholy_default)
    let originalMethod = class_getClassMethod(URLSessionConfiguration.self, originalSelector)
    let swizzledMethod = class_getClassMethod(URLSessionConfiguration.self, swizzledSelector)
    if let originalMethod = originalMethod, let swizzledMethod = swizzledMethod {
        method_exchangeImplementations(originalMethod, swizzledMethod)
    }
  }
}

extension URLSessionConfiguration {
  @objc class func wormholy_default() -> URLSessionConfiguration {
    let config = wormholy_default()
    Wormholy.enable(true, sessionConfiguration: config)
    return config
  }
}
