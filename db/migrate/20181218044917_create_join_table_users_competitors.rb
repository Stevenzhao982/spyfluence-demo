class CreateJoinTableUsersCompetitors < ActiveRecord::Migration[5.2]
  def change
    create_join_table :users, :competitors do |t|
      # t.index [:user_id, :competitor_id]
      # t.index [:competitor_id, :user_id]
    end
  end
end
