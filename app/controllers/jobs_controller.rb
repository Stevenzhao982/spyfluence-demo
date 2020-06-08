class JobsController < ApplicationController
    def index
        @jobs = jobs
    end

    def campaigns
        @jobs = jobs
    end

    private

    def jobs
        current_user.jobs.order(:created_at).page(params[:page]).includes(:competitor)
    end
end