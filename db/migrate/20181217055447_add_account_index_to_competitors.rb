class AddAccountIndexToCompetitors < ActiveRecord::Migration[5.2]
  def change
    add_index :competitors, :account
  end
end
