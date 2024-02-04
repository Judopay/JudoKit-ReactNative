#!/usr/bin/env ruby

require_relative 'helpers'

# This script is used to format the codebase using clang-format.
# Used by the CI pipeline to ensure that all code is formatted correctly.
# Used by developers to ensure that their code is formatted correctly before committing.

# Format all ObjectiveC files in the project with clang-format
# @param directory [String] The directory to search for files in
# @param extensions [Array<String>] The extensions to search for, defaults to h, m and mm
def format_files(directory, *extensions)
  extensions.empty? ? extensions = %w[h m mm] : extensions = extensions

  # Use Dir.glob to find files with any of the specified extensions
  files = Dir.glob(File.join(directory, '**', "*.{#{extensions.join(',')}}"))

  # Check if any files are found
  if files.empty?
    warn "No files with extensions #{extensions.join(', ')} found in #{directory} and its subdirectories."
    return
  end

  # Print the list of files
  info "Found #{files.count.to_s} files with extensions #{extensions.join(', ')} in #{directory} and its subdirectories, formatting."

  # Run clang-format on each file
  files.each do |file|
    info "Formatting #{relative_filepath_from_absolute(file, directory)}"
    run_command("clang-format -i -style=file #{file}")
  end
end

# Detect badly formatted files in the project with clang-format
# @param file_paths [Array<String>] The file paths to check
def detect_badly_formatted_files(file_paths)
  badly_formatted_files = []

  file_paths.each do |file_path|
    # Run clang-format with -output-replacements-xml
    xml_output = `clang-format -style=file -output-replacements-xml #{file_path}`

    # Check if the XML output contains any replacements
    if xml_output.include?('<replacement ')
      badly_formatted_files << file_path
    end
  end

  badly_formatted_files
end

# Check formatting for all ObjectiveC files in the project with clang-format
# @param directory [String] The directory to search for files in
# @param extensions [Array<String>] The extensions to search for, defaults to h, m and mm
def check_formatting(directory, *extensions)
  extensions.empty? ? extensions = %w[h m mm] : extensions = extensions
  # Use Dir.glob to find files with any of the specified extensions
  files = Dir.glob(File.join(directory, '**', "*.{#{extensions.join(',')}}"))

  # Check if any files are found
  if files.empty?
    warn "No files with extensions #{extensions.join(', ')} found in #{directory} and its subdirectories."
    return
  end

  # Print the list of files
  info "Found #{files.count.to_s} files with extensions #{extensions.join(', ')} in #{directory} and its subdirectories, checking formatting."

  badly_formatted_files = detect_badly_formatted_files(files)
  if badly_formatted_files.empty?
    info "All files are formatted correctly."
  else
    die "The following files are not formatted correctly: #{badly_formatted_files.map { |str| relative_filepath_from_absolute(str, directory) }.join(', ')}, please run scripts/clang_format.rb to format them."
  end
end

# Ensure that clang-format is installed
check_binary_installed('clang-format')

script_dir = __dir__
root_dir = File.expand_path('..', script_dir)
ios_dir = File.join(root_dir, 'ios')

# By default, don't auto format, only check formatting
if ARGV[0] == 'format'
  format_files(ios_dir)
else
  check_formatting(ios_dir)
end
