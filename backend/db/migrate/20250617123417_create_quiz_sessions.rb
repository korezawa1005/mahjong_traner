class CreateQuizSessions < ActiveRecord::Migration[7.1]
  def change
    create_table :quiz_sessions do |t|
      t.references :user, null: false, foreign_key: true
      t.references :category, null: false, foreign_key: true
      t.integer :correct_count

      t.timestamps
    end
  end
end
