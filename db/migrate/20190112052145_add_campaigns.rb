class AddCampaigns < ActiveRecord::Migration[5.2]
  def change
    create_table :campaigns do |t|
      t.references :competitor, foreign_key: true
      t.references :user, foreign_key: true
      t.references :jobs, foreign_key: true

      t.timestamps
    end
  end
end
