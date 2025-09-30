# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2025_08_22_093100) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "categories", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "comments", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "reviewer_id", null: false
    t.text "content"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "quiz_session_id"
    t.index ["quiz_session_id"], name: "index_comments_on_quiz_session_id"
    t.index ["reviewer_id"], name: "index_comments_on_reviewer_id"
    t.index ["user_id"], name: "index_comments_on_user_id"
  end

  create_table "jwt_denylist", force: :cascade do |t|
    t.string "jti", null: false
    t.datetime "exp", null: false
    t.index ["jti"], name: "index_jwt_denylist_on_jti", unique: true
  end

  create_table "quiz_answers", force: :cascade do |t|
    t.bigint "quiz_id", null: false
    t.bigint "quiz_session_id", null: false
    t.bigint "selected_tile_id"
    t.boolean "correct"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "selected_decision"
    t.index ["quiz_id"], name: "index_quiz_answers_on_quiz_id"
    t.index ["quiz_session_id"], name: "index_quiz_answers_on_quiz_session_id"
    t.index ["selected_tile_id"], name: "index_quiz_answers_on_selected_tile_id"
  end

  create_table "quiz_sessions", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "category_id", null: false
    t.integer "correct_count"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["category_id"], name: "index_quiz_sessions_on_category_id"
    t.index ["user_id"], name: "index_quiz_sessions_on_user_id"
  end

  create_table "quizzes", force: :cascade do |t|
    t.bigint "category_id", null: false
    t.json "quiz_tile_ids"
    t.json "dora_indicator_tile_ids"
    t.string "situation"
    t.text "explanation"
    t.bigint "correct_tile_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.jsonb "accept_tiles"
    t.text "table_state"
    t.jsonb "decision_options", default: []
    t.string "correct_decision"
    t.index ["category_id"], name: "index_quizzes_on_category_id"
    t.index ["correct_tile_id"], name: "index_quizzes_on_correct_tile_id"
  end

  create_table "tiles", force: :cascade do |t|
    t.string "name"
    t.string "suit"
    t.string "number"
    t.string "image_url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "name"
    t.integer "role", default: 0, null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "comments", "quiz_sessions"
  add_foreign_key "comments", "users"
  add_foreign_key "comments", "users", column: "reviewer_id"
  add_foreign_key "quiz_answers", "quiz_sessions"
  add_foreign_key "quiz_answers", "quizzes"
  add_foreign_key "quiz_answers", "tiles", column: "selected_tile_id"
  add_foreign_key "quiz_sessions", "categories"
  add_foreign_key "quiz_sessions", "users"
  add_foreign_key "quizzes", "categories"
  add_foreign_key "quizzes", "tiles", column: "correct_tile_id"
end
