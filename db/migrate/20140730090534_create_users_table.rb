class CreateUsersTable < ActiveRecord::Migration  

	def change
		create_table :users do |t|
			t.string :brand 
			t.string :email
			t.string :username 
			t.string :password_digest
			t.string :website_url
			t.string :mission_statement
			t.text :story  
			t.timestamps
		end
	end

end