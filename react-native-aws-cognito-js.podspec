require 'json'

package = JSON.parse(File.read(File.join(__dir__, 'package.json')))

Pod::Spec.new do |s|
  s.name         = package['name']
  s.version      = package['version']
  s.summary      = package['description']
  s.author       = package['author']
  s.homepage     = package['homepage']
  s.license      = package['license']
  s.author       = { "Jon Parsons" => "jonparsons@gmail.com" }
  s.source       = { :git => "https://github.com/AirLabsTeam/react-native-aws-cognito-js.git", :tag => "v#{s.version}" }
  s.platform     = :ios, "8.0"
  s.source_files = "ios/JKBigInteger/**/*.{h,c,m}", "ios/*.{h,m}"
  s.requires_arc = true
  s.dependency 'React'
end
