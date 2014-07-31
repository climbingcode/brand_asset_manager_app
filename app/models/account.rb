require 'uri'

class Account < ActiveRecord::Base 
	has_many :uploads 
	has_many :hexcolors
	# has_secure_password
	validates :brand, :username, :email, :password, presence: true
	validate :website_url, :validates_url, on: :create
	validates :website_url, allow_blank: true, uniqueness: true
	validates :email, uniqueness: true, format: {with: /\A^\S+@\S+\.[a-z]{3,6}\z/}
	
	def validates_url
		if self.website_url != nil
			#self.website_url ~= URI::regex
		end
	end


end
