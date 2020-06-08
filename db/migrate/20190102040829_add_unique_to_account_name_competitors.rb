class AddUniqueToAccountNameCompetitors < ActiveRecord::Migration[5.2]
  def change
    change_column :competitors, :account, :string, unique: true
  end
end
