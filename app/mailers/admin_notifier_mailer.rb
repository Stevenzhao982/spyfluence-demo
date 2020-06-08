class AdminNotifierMailer < ApplicationMailer
    # send a signup email to the user, pass in the user object that   contains the user's email address
    def not_enough_scrappers(scrappers_needed)
        @scrappers = scrappers_needed

        mail( 
            to: ENV["ADMIN_EMAIL_STEVEN"],
            subject: 'Need more scrappers' 
        )
    end
end
