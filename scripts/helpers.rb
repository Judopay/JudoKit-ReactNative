require 'colorize'

# Print an info message
# @param string [String] The info message to print
def info(string)
  puts "[#{$0}] [INFO] #{string}".blue
end

# Print a warning message
# @param string [String] The warning message to print
def warn(string)
  puts "[#{$0}] [WARN] #{string}".red
end

# Print an error message and exit
# @param string [String] The error message to print
def die(string)
  abort "[#{$0}] [ERROR] #{string}".red
end

# Run a command
# @param command [String] The command to run
# @param raise_on_failure [Boolean] Whether to raise an exception if the command fails, defaults to true
def run_command(command, raise_on_failure = true)
  system(command.to_s)
  return unless $?.exitstatus != 0
  puts "Failed to execute command: #{command}".red
  raise if raise_on_failure
end

# Get the relative filepath from an absolute filepath
# @param absolute_filepath [String] The absolute filepath
# @param base_directory [String] The base directory to get the relative filepath from
# @return [String] The relative filepath
def relative_filepath_from_absolute(absolute_filepath, base_directory)
  absolute_filepath = File.expand_path(absolute_filepath)
  base_directory = File.expand_path(base_directory)

  # Use relative_path_to to get the relative path
  Pathname.new(absolute_filepath).relative_path_from(Pathname.new(base_directory)).to_s
end

# Checks if a binary is installed
# @param binary_name [String] The name of the binary to check
# @return [Boolean] True if the binary is installed, false otherwise
def binary_installed?(binary_name)
  system("which #{binary_name} > /dev/null 2>&1")
end

# Checks if a binary is installed, and exits if it is not
# @param binary_name [String] The name of the binary to check
def check_binary_installed(binary_name)
  if binary_installed?(binary_name)
    info "#{binary_name} is installed on the system, moving on."
  else
    die "#{binary_name} is not installed on the system, please install it. You can install by running `brew install #{binary_name}`."
  end
end
