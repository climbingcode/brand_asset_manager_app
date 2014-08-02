class Hexcolor < ActiveRecord::Base 

	belongs_to :account
	
	# validates :hextriplet, format: { :with => /\A#(?:[0-9a-fA-F]{3}){1,2}$\Z/ }
	validate :count

	before_save :remove_hash 

  def remove_hash 
 	  if self.hextriplet.chars.count >= 7
		  self.hextriplet[1..-1]
 	  end	
	end

	def count
		
		account = Account.find(self.account_id).hexcolors.pluck(:hextriplet)
		
		if account.count > 3
			 errors.add(:to_many_hexcolors, "is not active")
		end
	end

end