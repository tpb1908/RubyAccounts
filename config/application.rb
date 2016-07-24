require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module App
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    config.after_initialize  do
      $users_online = 0
      User.all.each do |n|
        if n.logged_in then $users_online += 1 end
      end
      puts 'Users online ' + $users_online.to_s
    end
  end



end
