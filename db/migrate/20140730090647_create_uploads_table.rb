class CreateUploadsTable < ActiveRecord::Migration 

	def change
		create_table :uploads do |t|
			t.references :account
			t.string :name 
			t.string :description 
			t.string :filetype
			t.string :file  
			t.timestamps 
		end
	end

end