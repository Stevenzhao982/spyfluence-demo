require 'json'
require 'base64'
require 'securerandom'

class ChargesController < ApplicationController
    skip_before_action :verify_authenticity_token, :only => [:create]

    # From our scrape view, we dynamically render new html elements in to buildup the checkout flow (for security reasons)
    # This must be done because we make the ajax call to check the instagram profiles information first, which means we can't
    # cleanly redirect to our neccessary checkout view (we could use a hidden form, but this method seems more clean)
    #
    # So first after scrape is rendered and the js runs, it'll call charges/new to get some calculated values (e.g. total, duration)
    # and safely retrieve the stripe key. We then call charges/checkoutForm to get the html for the checkout form and replace our
    # scrape page's body html with that, then setting up the forms values using our previously retrieved values from charges/new

    def new
        render :json => 
            { 
                key: ENV['STRIPE_PUBLISHABLE_KEY'], amount: params["amount"], mode: params["mode"], competitor: params["account"],
                total: calculate_total(params["amount"].to_f), duration: calculate_duration(params["amount"].to_f)
            }
    end

    def checkoutForm
        render layout: false
    end

    def create
        return redirect_to '/422' unless (params[:stripeAmount].to_i > 50)

        # charge creation works on successful charge, otherwise an error is returned
        begin
            charge = Stripe::Charge.create({
                amount: params[:stripeAmount].to_i,
                source: params[:stripeToken],
                currency: 'usd',
                description: "Charge for #{current_user.email}:#{current_user.id}",
                receipt_email: current_user.email
            })
            Rails.logger.tagged('PAYMENT') { Rails.logger.info("Payment charge of amount #{params[:stripeAmount]} successful for user #{current_user.id} #{current_user.email}") }
        
            setup_job(params[:stripeAmount].to_i, params[:competitor], params[:mode], params[:duration].to_f)
        rescue Stripe::CardError => e
            Rails.logger.tagged('PAYMENT') { Rails.logger.info("Payment charge of amount #{params[:stripeAmount]} failed for user #{current_user.id} #{current_user.email}") }
            session[:referrer] = 'charges/create'
            return redirect_to(charges_failure_path)
        end
    end

    private

    def setup_job(amount, competitor, mode, duration)
        competitor = Competitor.where(account: competitor.downcase, instagram_link: "https://www.instagram.com/#{competitor}/").first_or_create
        job = Job.create(price_cents: amount, status: "created", profiles: 0, user: current_user, competitor: competitor, mode: mode, start_time: Time.current.utc,
            completion_estimate: Time.current + (duration*60*60))

        Rails.logger.tagged('JOBS') { Rails.logger.info("Created Job #{job.id} successfully for user #{current_user.id} #{current_user.email}") }
    end

    def calculate_total(amount)
        (ENV['SCRAPE_COST_BASE'].to_f + (amount * ENV['SCRAPE_COST_PER_PROFILE'].to_f)).round
    end

    def calculate_duration(amount)
        '%.1f' % (((amount * ENV['SCRAPE_TIME_PER_PROFILE'].to_i) + (amount * ENV['SCRAPE_TIME_PER_PROFILE'].to_i / 60 / 60 / 2 * 300)) / 60 / 60)
    end
end
