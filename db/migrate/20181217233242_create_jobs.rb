class CreateJobs < ActiveRecord::Migration[5.2]
  def change
    create_table :jobs do |t|
      t.string :status
      t.string :bookmark_cursor
      t.integer :bookmark_profile
      t.datetime :start_time
      t.datetime :end_time
      t.references :user, foreign_key: true
      t.references :competitor, foreign_key: true
      t.decimal :price
      t.string :error

      t.timestamps
    end
  end
end
