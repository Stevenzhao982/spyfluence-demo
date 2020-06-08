class ChangeProfileFollowingsName < ActiveRecord::Migration[5.2]
  def change
    rename_column :profiles, :followings, :following
  end
end
