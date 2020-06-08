class HomeController < ApplicationController
  def index
    @title = 'Home'
  end

  def demo
    @profiles = Competitor.find_by_account('kyliejenner').profiles.order(followers: :desc).page(params[:page])
  end

  def pricing
  end
end
