class AddUniqueToProfileIdProfiles < ActiveRecord::Migration[5.2]
  def change
    remove_index :profiles, :profile_id
    add_index :profiles, :profile_id, unique: true
  end
end
