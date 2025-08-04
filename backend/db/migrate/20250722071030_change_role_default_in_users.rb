class ChangeRoleDefaultInUsers < ActiveRecord::Migration[7.1]
  def change
    change_column_default :users, :role, 0
    change_column_null :users, :role, false, 0
  end
end
