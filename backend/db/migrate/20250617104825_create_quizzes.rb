class CreateQuizzes < ActiveRecord::Migration[7.1]
  def change
    create_table :quizzes do |t|
      t.references :category, null: false, foreign_key: true
      t.json :quiz_tile_ids
      t.json :dora_indicator_tile_ids
      t.string :situation
      t.text :explanation
      t.references :correct_tile, null: false, foreign_key: { to_table: :tiles }

      t.timestamps
    end
  end
end
