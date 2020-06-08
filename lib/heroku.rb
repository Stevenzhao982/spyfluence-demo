require 'platform-api'
require 'singleton'

class Heroku
    include Singleton
  
    def client
        @client ||= PlatformAPI.connect_oauth(ENV['HEROKU_OAUTH_TOKEN'])
    end 
end
