# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_01_16_032254) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "categories", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", default: -> { "CURRENT_TIMESTAMP" }, null: false
    t.datetime "updated_at", default: -> { "CURRENT_TIMESTAMP" }, null: false
    t.index ["name"], name: "index_categories_on_name", unique: true
  end

  create_table "competitors", force: :cascade do |t|
    t.string "account"
    t.string "instagram_link"
    t.datetime "created_at", default: -> { "CURRENT_TIMESTAMP" }, null: false
    t.datetime "updated_at", default: -> { "CURRENT_TIMESTAMP" }, null: false
    t.index ["account"], name: "index_competitors_on_account"
  end

  create_table "delayed_jobs", force: :cascade do |t|
    t.integer "priority", default: 0, null: false
    t.integer "attempts", default: 0, null: false
    t.text "handler", null: false
    t.text "last_error"
    t.datetime "run_at"
    t.datetime "locked_at"
    t.datetime "failed_at"
    t.string "locked_by"
    t.string "queue"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.index ["priority", "run_at"], name: "delayed_jobs_priority"
  end

  create_table "jobs", force: :cascade do |t|
    t.string "status"
    t.string "bookmark_cursor"
    t.integer "bookmark_profile"
    t.datetime "start_time"
    t.datetime "end_time"
    t.bigint "user_id"
    t.bigint "competitor_id"
    t.string "error"
    t.datetime "created_at", default: -> { "CURRENT_TIMESTAMP" }, null: false
    t.datetime "updated_at", default: -> { "CURRENT_TIMESTAMP" }, null: false
    t.string "mode"
    t.integer "price_cents", default: 0, null: false
    t.string "price_currency", default: "USD", null: false
    t.integer "profiles"
    t.datetime "completion_estimate"
    t.index ["competitor_id"], name: "index_jobs_on_competitor_id"
    t.index ["user_id"], name: "index_jobs_on_user_id"
  end

  create_table "profiles", force: :cascade do |t|
    t.bigint "profile_id"
    t.string "instagram_link"
    t.string "account"
    t.boolean "private"
    t.string "description"
    t.integer "followers"
    t.integer "following"
    t.decimal "followers_to_following"
    t.decimal "followers_to_num_posts"
    t.decimal "recent_average_post_likes"
    t.decimal "recent_average_post_comments"
    t.decimal "engagement_rate"
    t.integer "total_posts"
    t.string "phone_number"
    t.string "profile_picture"
    t.string "contact_info"
    t.string "category_type"
    t.bigint "category_id"
    t.datetime "created_at", default: -> { "CURRENT_TIMESTAMP" }, null: false
    t.datetime "updated_at", default: -> { "CURRENT_TIMESTAMP" }, null: false
    t.text "tags", default: [], array: true
    t.text "relevant_links", default: [], array: true
    t.index ["category_id"], name: "index_profiles_on_category_id"
    t.index ["profile_id"], name: "index_profiles_on_profile_id", unique: true
  end

  create_table "relationships", force: :cascade do |t|
    t.bigint "competitor_id"
    t.bigint "profile_id"
    t.text "degree"
    t.datetime "created_at", default: -> { "CURRENT_TIMESTAMP" }, null: false
    t.datetime "updated_at", default: -> { "CURRENT_TIMESTAMP" }, null: false
    t.index ["profile_id", "competitor_id"], name: "index_relationships_on_profile_id_and_competitor_id", unique: true
  end

  create_table "scrappers", force: :cascade do |t|
    t.string "email"
    t.string "username"
    t.string "password"
    t.string "status"
    t.string "job_status"
    t.datetime "created_at", default: -> { "CURRENT_TIMESTAMP" }, null: false
    t.datetime "updated_at", default: -> { "CURRENT_TIMESTAMP" }, null: false
    t.index ["email"], name: "index_scrappers_on_email"
    t.index ["status"], name: "index_scrappers_on_status"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.string "first_name"
    t.string "last_name"
    t.string "account_type"
    t.string "status"
    t.string "business_name"
    t.boolean "business"
    t.datetime "last_scrape_job_date"
    t.integer "current_num_jobs"
    t.datetime "created_at", default: -> { "CURRENT_TIMESTAMP" }, null: false
    t.datetime "updated_at", default: -> { "CURRENT_TIMESTAMP" }, null: false
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "jobs", "competitors"
  add_foreign_key "jobs", "users"
  add_foreign_key "profiles", "categories"
  add_foreign_key "relationships", "competitors"
  add_foreign_key "relationships", "profiles"
end
