class ApplicationController < ActionController::Base
  # Default layout
  layout 'main/layout-2'

  def current_page_path?(p)
    request.path.start_with? p
  end

  before_action :configure_permitted_parameters, if: :devise_controller?
  helper_method :current_page_path?

  rescue_from ActiveRecord::RecordNotFound do |exception|
    render_error 404
  end

  def render_error(status)
    respond_to do |format|
      format.html { render 'error_' + status.to_s() + '.html', :status => status, :layout => 'errors'}
      format.all { render :nothing => true, :status => status }
    end
  end

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:first_name, :last_name, :email, :password, :remember_me])
    devise_parameter_sanitizer.permit(:sign_in, keys: [:email, :password, :remember_me])
    devise_parameter_sanitizer.permit(:account_update, keys: [:first_name, :last_name, :email, :password, :current_password, :business_name, :remember_me])
  end
end
