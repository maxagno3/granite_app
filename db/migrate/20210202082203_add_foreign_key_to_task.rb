class AddForeignKeyToTask < ActiveRecord::Migration[6.1]
  def change
    add_foreign_key :tasks, :users, column: :user_id, on_delete: :cascade
    # From table => tasks with the key column.
    # To table => users with the primary key.
    # Column => the value of column here is user_id which is our custom name for the column.
  end
end
