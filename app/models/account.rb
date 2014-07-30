class Account < ActiveRecord::Base 

	# has_secure_password

	has_many :uploads 
	has_many :hexcolors

end
