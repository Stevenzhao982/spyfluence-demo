require 'csv'

class Profile < ApplicationRecord
  belongs_to :category
  has_many :relationships
  has_many :competitors, :through => :relationships

  def self.csv_header
    CSV::Row.new(
      [:id, :account, :instagram_link, :description, :followers, :following, :followers_to_following, :recent_average_post_likes,
      :recent_average_post_comments, :engagement_rate, :phone_number, :contact_info, :tags, :relevant_links], 
      ['id', 'account', 'instagram link', 'description', 'followers', 'following', 'followers to following', 'recent average post likes',
        'recent average post comments', 'recent engagement rate', 'phone number', 'contact info', 'recently used tags', 'relevant links'],  
      true)
  end

  def to_csv_row
    CSV::Row.new(
      [:id, :account, :instagram_link, :description, :followers, :following, :followers_to_following, :recent_average_post_likes,
        :recent_average_post_comments, :engagement_rate, :phone_number, :contact_info, :tags, :relevant_links], 
      [id, account, instagram_link, description, followers, following, followers_to_following, recent_average_post_likes, 
        recent_average_post_comments, engagement_rate, phone_number, contact_info, tags, relevant_links], 
      true)
  end
end
