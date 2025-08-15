class AddAcceptTilesToQuizzes < ActiveRecord::Migration[7.1]
  def change
    add_column :quizzes, :accept_tiles, :jsonb
  end
end
