class AddQuizSessionIdToComments < ActiveRecord::Migration[7.1]
  def change
    add_reference :comments, :quiz_session, null: true, foreign_key: true
  end
end
