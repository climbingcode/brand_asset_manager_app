require 'uri'
class Account < ActiveRecord::Base 

	# has_secure_password

	has_many :uploads 
	has_many :hexcolors
  has_many :fonts

 #  validates :brand, :username, presence: true, uniqueness: true
 #  validates :username, :password, length: {maximum: 12, minimum: 6} 
	# #validates :email, format: {with: /\A^\S+@\S+\.[a-z]{3,6}/}
	# validate :url_check?, on: :create

	def url_check? 
		return true	if self.website_url =~ URI::regexp
	end

end
