class AddDefaultToTimestamps < ActiveRecord::Migration[5.2]
  def change
    change_column :scrappers, :created_at, :datetime, default: -> { 'CURRENT_TIMESTAMP' }
    change_column :scrappers, :updated_at, :datetime, default: -> { 'CURRENT_TIMESTAMP' }
    change_column :relationships, :created_at, :datetime, default: -> { 'CURRENT_TIMESTAMP' }
    change_column :relationships, :updated_at, :datetime, default: -> { 'CURRENT_TIMESTAMP' }
    change_column :profiles, :created_at, :datetime, default: -> { 'CURRENT_TIMESTAMP' }
    change_column :profiles, :updated_at, :datetime, default: -> { 'CURRENT_TIMESTAMP' }
    change_column :jobs, :created_at, :datetime, default: -> { 'CURRENT_TIMESTAMP' }
    change_column :jobs, :updated_at, :datetime, default: -> { 'CURRENT_TIMESTAMP' }
    change_column :competitors, :created_at, :datetime, default: -> { 'CURRENT_TIMESTAMP' }
    change_column :competitors, :updated_at, :datetime, default: -> { 'CURRENT_TIMESTAMP' }
    change_column :categories, :created_at, :datetime, default: -> { 'CURRENT_TIMESTAMP' }
    change_column :categories, :updated_at, :datetime, default: -> { 'CURRENT_TIMESTAMP' }
  end
end
