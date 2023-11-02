require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "RNJudopay"
  s.version      = package["version"]
  s.summary      = "React Native module for Judopay"
  s.description  = package["description"]
  s.homepage     = "https://github.com/judopay/judo-reactnative"
  s.license      = { :file => 'LICENSE' }
  s.author       = { "Judopay" => "devteam@judopayments.com" }
  s.platform     = :ios, "11.0"
  s.source       = { :path => 'ios' }
  s.source_files = "ios/Classes/**/*.{h,m}"
  s.requires_arc = true
  s.dependency "React"
  s.dependency "JudoKit-iOS", "3.2.6"

  s.test_spec 'RNJudoTests' do |test_spec|
    test_spec.source_files = 'ios/RNJudoTests/**/*.{h,m}'
  end

end
