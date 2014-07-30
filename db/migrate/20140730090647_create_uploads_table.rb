class CreateUploadsTable < ActiveRecord::Migration 

	def change
		create_table :uploads do |t|
			t.references :user
			t.string :name 
			t.string :description 
			t.string :filetype
			t.string :file_path  
			t.timestamps 
		end
	end

end