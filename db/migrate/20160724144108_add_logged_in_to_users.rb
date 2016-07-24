class AddLoggedInToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :logged_in, :boolean
  end
end
