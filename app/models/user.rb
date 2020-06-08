class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :confirmable
  has_many :jobs
  has_many :competitors, :through => :jobs

  validates :first_name, :presence => {:message => "can't be blank" }
  validates :last_name, :presence => {:message => "can't be blank"}
end
