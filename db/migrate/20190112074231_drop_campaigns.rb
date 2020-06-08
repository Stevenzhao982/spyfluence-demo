class DropCampaigns < ActiveRecord::Migration[5.2]
  def change
    drop_table :campaigns
  end
end
