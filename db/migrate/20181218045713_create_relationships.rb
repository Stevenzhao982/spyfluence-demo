class CreateRelationships < ActiveRecord::Migration[5.2]
  def change
    create_table :relationships do |t|
      t.references :competitor, foreign_key: true
      t.references :profile, foreign_key: true
      t.text :degree

      t.timestamps
    end
  end
end
