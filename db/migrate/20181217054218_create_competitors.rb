class CreateCompetitors < ActiveRecord::Migration[5.2]
  def change
    create_table :competitors do |t|
      t.string :account
      t.string :instagram_link

      t.timestamps
    end
  end
end
