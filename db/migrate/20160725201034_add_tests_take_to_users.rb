class AddTestsTakeToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :tests_taken, :integer
  end
end
