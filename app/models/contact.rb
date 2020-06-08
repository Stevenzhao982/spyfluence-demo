class Contact < MailForm::Base
    attribute :name, validate: true
    attribute :email, validate: URI::MailTo::EMAIL_REGEXP
    attribute :message, validate: true

    def headers 
        {
            subject: "Spyfluence Contact Form Question",
            # to: ENV['ADMIN_EMAIL'],
            to: "stevenzhao982throwaway@gmail.com",
            from: %("#{name}" <#{email}>)
        }
    end
end