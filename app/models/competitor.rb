class Competitor < ApplicationRecord
  has_many :relationships
  has_many :profiles, :through => :relationships
  has_many :jobs
  has_many :users, :through => :jobs
  validates_uniqueness_of :account
end
