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

ActiveRecord::Schema.define(version: 20160824174227) do

  create_table "tests", force: :cascade do |t|
    t.text     "params"
    t.integer  "cpm"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string   "language"
    t.integer  "user_id"
    t.index ["user_id", "created_at"], name: "index_tests_on_user_id_and_created_at"
  end

  create_table "users", force: :cascade do |t|
    t.string   "name"
    t.string   "email"
    t.datetime "created_at",                           null: false
    t.datetime "updated_at",                           null: false
    t.string   "password_digest"
    t.string   "remember_digest"
    t.boolean  "admin"
    t.string   "activation_digest"
    t.boolean  "activated",            default: false
    t.datetime "activated_at"
    t.string   "reset_digest"
    t.datetime "reset_sent_at"
    t.string   "username"
    t.integer  "tests_taken",          default: 0
    t.integer  "average_wpm",          default: 0
    t.boolean  "owner",                default: false
    t.integer  "average_standard_wpm", default: 0
    t.integer  "standard_tests_taken", default: 0
    t.string   "logins"
    t.index ["email"], name: "index_users_on_email", unique: true
  end

  create_table "word_sets", force: :cascade do |t|
    t.text     "words"
    t.datetime "created_at",                       null: false
    t.datetime "last_update"
    t.boolean  "public",           default: true
    t.boolean  "uses_special"
    t.text     "name"
    t.datetime "updated_at",                       null: false
    t.integer  "user_id"
    t.integer  "cpm"
    t.string   "language"
    t.boolean  "should_randomise", default: false
    t.index ["user_id"], name: "index_word_sets_on_user_id"
  end

end
