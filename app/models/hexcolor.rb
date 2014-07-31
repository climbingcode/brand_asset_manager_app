class Hexcolor < ActiveRecord::Base 

	belongs_to :account
	
	# # validates :hextriplet, format: { :with => /\A#(?:[0-9a-fA-F]{3}){1,2}$\Z/ }

	# before_save :remove_hash 

  def remove_hash 

 	  if self.hextriplet.chars.count >= 7
		  self.hextriplet[1..-1]
 	  end	
	end

end