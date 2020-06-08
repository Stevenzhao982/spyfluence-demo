class Job < ApplicationRecord
  monetize :price_cents
  belongs_to :user
  belongs_to :competitor
  has_many :campaigns
end
