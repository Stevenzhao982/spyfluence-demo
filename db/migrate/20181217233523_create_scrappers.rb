class CreateScrappers < ActiveRecord::Migration[5.2]
  def change
    create_table :scrappers do |t|
      t.string :email
      t.string :username
      t.string :password
      t.string :status
      t.string :job_status

      t.timestamps
    end
  end
end
