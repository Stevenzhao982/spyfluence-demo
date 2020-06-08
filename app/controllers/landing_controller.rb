class LandingController < ApplicationController
    def landing
        render :landing, layout: "main/layout-1"
    end
end
  