class ContactsController < ApplicationController
    def create
        @contact = Contact.new(params[:contact])
        @contact.request = request
        if @contact.deliver
            flash.now[:notice] = nil
            redirect_to root_path
        else
            flash.now[:notice] = 'Cannot send message'
            render :new
        end
    end

    def new
        @contact = Contact.new
    end
end