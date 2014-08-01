class Bampdf < Prawn::Document 

	def initialize(account)
		super()
		@account = account 
	end

end