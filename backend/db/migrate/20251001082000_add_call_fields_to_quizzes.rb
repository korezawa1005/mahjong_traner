class AddCallFieldsToQuizzes < ActiveRecord::Migration[7.1]
  def change
    add_column :quizzes, :call_options, :jsonb, default: []
    add_column :quizzes, :correct_calls, :jsonb, default: []
  end
end
