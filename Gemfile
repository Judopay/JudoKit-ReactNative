# frozen_string_literal: true

source 'https://rubygems.org'
git_source(:github) {|repo_name| "https://github.com/#{repo_name}" }

# You may use http://rbenv.org/ or https://rvm.io/ to install and use this version
ruby '>= 2.6.10'

# Cocoapods 1.15 introduced a bug which break the build. We will remove the upper
# bound in the template on Cocoapods with next React Native release.
gem 'cocoapods', '>= 1.13', '< 1.15'
gem 'activesupport', '>= 6.1.7.5', '< 7.1.0'

gem 'fastlane', '= 2.226.0'
gem 'colorize', '~> 1.1'

# temporary workaround: https://github.com/fastlane/fastlane/issues/21794#issuecomment-2102563823
gem 'rb-readline'

plugins_path = File.join(File.dirname(__FILE__), 'fastlane', 'Pluginfile')
eval_gemfile(plugins_path) if File.exist?(plugins_path)
