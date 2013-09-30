watch("app/controllers/(.*).php") do |match|
  run_test %{app/tests/#{match[1]}Test.php}
end

watch("app/tests/.*Test.php") do |match|
  run_test match[0]
end

watch("app/tests-integration/.*Test.php") do |match|
  run_test match[0]
end

watch("app/routes.php") do |match|
	run_test %{app/tests-integration/RoutesTest.php}
end

def run_test(file)
  clear_console
  unless File.exist?(file)
    puts "#{file} does not exist"
    return
  end
 
  puts "Running #{file}"
  result = `vendor/phpunit/phpunit/phpunit.php #{file}`
  puts result
  
  if result.match(/OK/)
    notify "SUCCESS!!!!" , "#{file}"
  elsif result.match(/FAILURES\!/)
    notify_failed "FAILURE #{file}", result
  end
end

def notify title, msg
  images_dir='~/.autotest/images'
  system "/Applications/Utilities/terminal-notifier.app/Contents/MacOS/terminal-notifier -title '#{title}' -message '#{msg}'"
end

def notify_failed cmd, result
  failed_examples = result.scan(/failure:\n\n(.*)\n/)
  notify "#{cmd}", failed_examples[0]
end

def clear_console
  puts "\e[H\e[2J"  #clear console
end