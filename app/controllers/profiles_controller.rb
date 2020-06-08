require 'csv'

class ProfilesController < ApplicationController
    before_action :job_exists, only: [:download, :index, :show]
    before_action :profile_competitor_relationship_exists, only: [:show]

    def index
        @profiles = Competitor.find(params["competitor_id"]).profiles.order(followers: :desc).page(params[:page])
    end

    def show
        @profile = Profile.find(params[:profile_id])
    end

    def download
        @competitor = Competitor.find(params["competitor_id"])

        respond_to do |format|
            format.csv do
                render_csv
            end
        end
    end

    private

    def render_csv
        set_csv_headers

        # setting the body to an enumerator, rails will iterate this enumerator
        self.response_body = csv_lines
        response.status = 200
    end

    def set_csv_headers
        # streaming headers
        headers.delete("Content-Length")
        headers["Cache-Control"] = "no-cache"
        headers['X-Accel-Buffering'] = 'no'

        # file headers
        headers["Content-Type"] = "text/csv; charset=utf-8"
        headers["Content-Disposition"] = "attachment; filename=\"#{@competitor.account}.csv\""
    end

    def csv_lines
        Enumerator.new do |csv_file|
            csv_file << Profile.csv_header.to_s

            @competitor.profiles.find_in_batches(batch_size: 1000) do |profiles|
                profiles.each do |profile|
                    csv_file << profile.to_csv_row.to_s
                end
            end
        end
    end

    # checks to ensure that the user isn't accessing results of a job that doesn't belong to them (competitor/:competitor_id)
    def job_exists
        redirect_to controller: 'errors', :action => 'not_found' if Job.where(competitor_id: params["competitor_id"], user: current_user).empty?
    end

    # checks to ensure, in conjunction with the above, that given the user has access to the competitor/job,
    # that the profile they're trying to access is associated with that competitor
    def profile_competitor_relationship_exists
        redirect_to controller: 'errors', :action => 'not_found' if Relationship.where(competitor_id: params["competitor_id"], profile_id: params["profile_id"]).empty?
    end
end