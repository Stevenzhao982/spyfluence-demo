class AddDefaultAndIndexToScrappers < ActiveRecord::Migration[5.2]
  def change
    add_index :scrappers, :email
    add_index :scrappers, :status
  end
end
