class Font < ActiveRecord::Base 

  # has_secure_password
  belongs_to :account

  validate :to_many_headlines
	validate :to_many_body

	def to_many_headlines
		account = Account.find(self.account_id).fonts.pluck(:headline)
		if account.count > 3
			 errors.add(:to_many_hexcolors, "is not active")
		end
	end

		def to_many_body
		account = Account.find(self.account_id).fonts.pluck(:body)
		if account.count > 3
			 errors.add(:to_many_hexcolors, "is not active")
		end
	end

end
