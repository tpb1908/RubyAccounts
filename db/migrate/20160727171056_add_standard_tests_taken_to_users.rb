class AddStandardTestsTakenToUsers < ActiveRecord::Migration[5.0]
  def change
  	add_column :users, :standard_tests_taken, :integer, :default => 0
  end
end
