class AddArraysAndDefaultAndRelationsToProfiles < ActiveRecord::Migration[5.2]
  def change
    remove_column :profiles, :tags
    remove_column :profiles, :relevant_links
    add_column :profiles, :tags, :text, array:true, default: []
    add_column :profiles, :relevant_links, :text, array:true, default: []
    add_index :profiles, :profile_id
  end
end
