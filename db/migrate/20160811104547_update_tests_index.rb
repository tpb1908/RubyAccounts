class UpdateTestsIndex < ActiveRecord::Migration[5.0]
  def change
  	add_column :tests, :user_id, :integer
  	remove_index :tests, :created_at
  	add_index :tests, [:user_id, :created_at]
  end
end
