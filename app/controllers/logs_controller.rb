class LogsController < ApplicationController
    # for using the rails logger via .js
    def create
      Rails.logger.tagged('JOBS') { Rails.logger.info(params['message']) }
      render body: nil
    end
end
