class User < ActiveRecord::Base 

	has_secure_password

	has_many :uploads 
	has_many :hex_colors

end
