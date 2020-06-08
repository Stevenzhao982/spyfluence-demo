class CreateProfiles < ActiveRecord::Migration[5.2]
  def change
    create_table :profiles do |t|
      t.bigint :profile_id
      t.string :instagram_link
      t.string :account
      t.boolean :private
      t.string :description
      t.integer :followers
      t.integer :followings
      t.decimal :followers_to_following
      t.decimal :followers_to_num_posts
      t.decimal :recent_average_post_likes
      t.decimal :recent_average_post_comments
      t.decimal :engagement_rate
      t.integer :total_posts
      t.string :phone_number
      t.string :profile_picture
      t.string :relevant_links
      t.string :contact_info
      t.string :tags
      t.string :category_type
      t.references :category, foreign_key: true

      t.timestamps
    end
  end
end
