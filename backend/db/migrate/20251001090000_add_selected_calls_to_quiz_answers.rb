class AddSelectedCallsToQuizAnswers < ActiveRecord::Migration[7.1]
  def change
    add_column :quiz_answers, :selected_calls, :jsonb, default: []
  end
end
