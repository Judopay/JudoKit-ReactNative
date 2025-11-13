
def bump_build_number(app:, environment:)
  firebase_app_id = app.firebase_app_id(environment: environment)

  if firebase_app_id.nil?
    puts("Firebase app ID is not set for the specified app. Skipping build number increment.")
    return
  end

  latest_release = firebase_app_distribution_get_latest_release(app: firebase_app_id)
  current_version = latest_release.nil? ? 0 : latest_release[:buildVersion].to_i
  
  increment_build_number({
    xcodeproj: app.project,
    build_number:  current_version + 1
  })
  puts("Bumped build number to #{current_version + 1}")
end

class SampleApp
  attr_reader :app_name, :path, :platform, :scheme

  def initialize(firebase_app_id:, path:, platform:, scheme: '')
    @app_name = File.basename(path)
    @firebase_app_id = firebase_app_id
    @path = path
    @platform = platform
    @scheme = scheme
  end

  def copy_apks_to_destination(environment:, destination:)
    FileUtils.mkdir_p(destination) if !File.directory?(destination)

    [
      {
        source: "#{@path}/build/outputs/apk/debug/#{@app_name}-debug.apk",
        destination: "#{destination}/#{debug_apk(environment: environment)}"
      },
      {
        source: "#{@path}/build/outputs/apk/androidTest/debug/#{@app_name}-debug-androidTest.apk",
        destination: "#{destination}/#{testsuite_apk(environment: environment)}"
      },
      {
        source: "#{@path}/build/outputs/apk/release/#{@app_name}-release.apk",
        destination: "#{destination}/#{release_apk(environment: environment)}"
      }
    ].each do |file|
      if File.file?(file[:source])
        puts("Copying #{file[:source]} to #{file[:destination]}")
        FileUtils.cp(file[:source], file[:destination])
      else
        puts("#{file[:source]} was not found. Will not be copied.")
      end
    end
  end

  def debug_apk(environment:)
    return "#{@app_name}-#{environment}-debug.apk"
  end

  def firebase_app_id(environment:)
    return @firebase_app_id.fetch(:"#{environment}", nil)
  end

  def project
    project_path = "#{@path}/#{scheme}.xcodeproj"
    return File.directory?(project_path) ? project_path : nil
  end

  def plist
    plist_path = "#{@path}/#{scheme}/Info.plist"
    return File.file?(plist_path) ? plist_path : nil
  end

  def podfile
    podfile_path = "#{@path}/Podfile"
    return File.file?(podfile_path) ? podfile_path : nil
  end

  def release_apk(environment:)
    return "#{@app_name}-#{environment}-release.apk"
  end

  def testsuite_apk(environment:)
    return "#{@app_name}-#{environment}-debug-androidTest.apk"
  end

  def ui_test_plan
    test_plan = "#{scheme}TestPlan"
    return File.file?("#{@path}/#{ui_test_scheme}/#{test_plan}.xctestplan") ? test_plan : nil
  end

  def ui_test_scheme
    ui_test_scheme = "#{scheme}UITests"
    return File.directory?("#{@path}/#{ui_test_scheme}") && Dir["#{@path}/#{ui_test_scheme}/*"].length > 1 ? ui_test_scheme : nil
  end

  def unit_test_scheme
    unit_test_scheme = "#{scheme}Tests"
    return File.directory?("#{@path}/#{unit_test_scheme}") ? unit_test_scheme : nil
  end
  
  def workspace
    workspace_path = "#{@path}/#{scheme}.xcworkspace"
    return File.directory?(workspace_path) ? workspace_path : nil
  end
end