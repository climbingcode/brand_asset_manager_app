class CreateFontsTable < ActiveRecord::Migration 

  def change
    create_table :fonts do |t|
      t.references :account
      t.string :headline
      t.string :body 
      t.timestamps 
    end
  end

end
