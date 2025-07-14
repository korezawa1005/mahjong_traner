class ChangeUserIdNullOnQuizSessions < ActiveRecord::Migration[7.1]
  def change
    change_column_null :quiz_sessions, :user_id, true
  end
end
