class CreateQuizAnswers < ActiveRecord::Migration[7.1]
  def change
    create_table :quiz_answers do |t|
      t.references :quiz, null: false, foreign_key: true
      t.references :quiz_session, null: false, foreign_key: true
      t.references :selected_tile, null: false, foreign_key: { to_table: :tiles }
      t.boolean :correct

      t.timestamps
    end
  end
end
