class AddDecisionFieldsToQuizzes < ActiveRecord::Migration[7.1]
  def change
    add_column :quizzes, :decision_options, :jsonb, default: []
    add_column :quizzes, :correct_decision, :string
  end
end
