class ChangeUsersTestsTakenDefaultValue < ActiveRecord::Migration[5.0]
  def change
  	change_column :users, :tests_taken, :integer, :default => 0
  end
end
