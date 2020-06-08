class DropUserCompetitorsJoinTable < ActiveRecord::Migration[5.2]
  def change
    drop_table :competitors_users
  end
end
