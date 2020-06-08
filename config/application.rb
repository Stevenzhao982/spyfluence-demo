require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Spyfluence
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 5.2

    # remove SAMEORIGIN x-frame-header from request headers
    config.action_dispatch.default_headers.clear

    # Load all models, including models from subfolders
    config.autoload_paths += Dir[ Rails.root.join('app', 'models', '**/') ]

    
    # Custom directories with classes and modules you want to be autoloadable.
    # config.autoload_paths += %W(#{config.root}/extras)
    # config.autoload_paths << Rails.root.join("#{config.root}/lib/")

    # Only load the plugins named here, in the order given (default is alphabetical).
    # :all can be used as a placeholder for all plugins not explicitly named.
    # config.plugins = [ :exception_notification, :ssl_requirement, :all ]

    # Activate observers that should always be running.
    # config.active_record.observers = :cacher, :garbage_collector, :forum_observer

    # Set Time.zone default to the specified zone and make Active Record auto-convert to this zone.
    # Run "rake -D time" for a list of tasks for finding time zone names. Default is UTC.
    config.time_zone = 'Eastern Time (US & Canada)'
    config.active_record.default_timezone = :local

     # The default locale is :en and all translations from config/locales/*.rb,yml are auto loaded.
    # config.i18n.load_path += Dir[Rails.root.join('my', 'locales', '*.{rb,yml}').to_s]
    # config.i18n.default_locale = :de

    # Configure the default encoding used in templates for Ruby 1.9.
    config.encoding = "utf-8"

    # Enable escaping HTML in JSON.
    config.active_support.escape_html_entities_in_json = true

    # Custom error messages
    config.exceptions_app = self.routes

    # Specify how background jobs will be handled
    config.active_job.queue_adapter = :delayed_job

    config.enable_dependency_loading = true
    config.autoload_paths << Rails.root.join('lib')

    config.assets.paths << "#{Rails.root}/vendor/assets"

    config.assets.initialize_on_precompile = false
    
    config.action_dispatch.default_headers = {
        'X-Frame-Options' => 'ALLOWALL'
    }    

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration can go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded after loading
    # the framework and any gems in your application.
  end
end
