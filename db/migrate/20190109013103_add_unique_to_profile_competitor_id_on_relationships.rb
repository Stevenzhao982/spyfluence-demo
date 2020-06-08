class AddUniqueToProfileCompetitorIdOnRelationships < ActiveRecord::Migration[5.2]
  def change
    remove_index :relationships, :profile_id
    remove_index :relationships, :competitor_id
    add_index :relationships, [:profile_id, :competitor_id], unique: true
  end
end
