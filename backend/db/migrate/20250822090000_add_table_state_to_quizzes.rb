class AddTableStateToQuizzes < ActiveRecord::Migration[7.1]
  def change
    add_column :quizzes, :table_state, :text
  end
end
