class AddDetailToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :first_name, :string
    add_column :users, :last_name, :string
    add_column :users, :account_type, :string
    add_column :users, :status, :string
    add_column :users, :business_name, :string
    add_column :users, :business, :boolean
    add_column :users, :last_scrape_job_date, :datetime
    add_column :users, :current_num_jobs, :int
    add_column :users, :created_at, :datetime, null: false, default: -> { 'CURRENT_TIMESTAMP' }
    add_column :users, :updated_at, :datetime, null: false, default: -> { 'CURRENT_TIMESTAMP' }
  end
end
