#!/usr/bin/env ruby

require_relative 'helpers'

# This script is used to format the android native codebase using ktlint.
# Used by the CI pipeline to ensure that all code is formatted correctly.
# Used by developers to ensure that their code is formatted correctly before committing.

# Ensure that ktlint is installed
check_binary_installed('ktlint')

script_dir = __dir__
root_dir = File.expand_path('..', script_dir)
android_dir = File.join(root_dir, 'android')

def check_formatting(directory)
  # Run ktlint on the directory
  info "Checking formatting for #{directory}"
  run_command("ktlint #{directory}")
end

def format_files(directory)
  # Run ktlint on the directory
  info "Formatting #{directory}"
  run_command("ktlint -F #{directory}")
end

# By default, don't auto format, only check formatting
if ARGV[0] == 'format'
  format_files(android_dir)
else
  check_formatting(android_dir)
end
