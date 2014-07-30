class CreateHexColorsTable < ActiveRecord::Migration 

	def change
		create_table :hexcolors do |t|
			t.references :user 
			t.string :description 
			t.string :hextriplet
			t.boolean :primary, default: false  
			t.timestamps
		end
	end

end