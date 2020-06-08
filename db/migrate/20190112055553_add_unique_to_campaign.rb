class AddUniqueToCampaign < ActiveRecord::Migration[5.2]
  def change
    add_index :campaigns, [:user_id, :competitor_id, :jobs_id], :unique => true
  end
end
