class AddIndexToTests < ActiveRecord::Migration[5.0]
  def change
  	add_column :tests, :user_id, :integer
  	add_index :tests, [:user_id, :created_at]
  end
end
