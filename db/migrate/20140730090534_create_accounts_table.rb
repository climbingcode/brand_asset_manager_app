class CreateAccountsTable < ActiveRecord::Migration  

	def change
		create_table :accounts do |t|
			t.string :brand 
			t.string :email
			t.string :username 
			t.string :password
			t.string :website_url
			t.string :mission_statement
			t.text :story  
			t.timestamps
		end
	end

end