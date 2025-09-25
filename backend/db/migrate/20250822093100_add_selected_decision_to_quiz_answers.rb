class AddSelectedDecisionToQuizAnswers < ActiveRecord::Migration[7.1]
  def change
    add_column :quiz_answers, :selected_decision, :string
    change_column_null :quiz_answers, :selected_tile_id, true
  end
end
