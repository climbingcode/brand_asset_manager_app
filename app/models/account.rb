require 'uri'
class Account < ActiveRecord::Base 

	# has_secure_password

	has_many :uploads 
	has_many :hexcolors
  has_many :fonts

  validates :brand, :username, presence: true, uniqueness: true
  validates :username, :password, length: {maximum: 12, minimum: 6} 
	#validates :email, format: {with: /\A^\S+@\S+\.[a-z]{3,6}/}
	validate :url_check?, on: :create

	before_validation :strip_whitespace, :only => [:brand, :username, :email, :password]

  private

  def strip_whitespace
  	self.brand = self.brand.strip
  	self.username = self.username.strip
  	self.email = self.email.strip
  	self.password = self.password.strip
	end

	def url_check? 
		return true	if self.website_url =~ URI::regexp
	end

end
