class AddDefaultValueToLoggedInAttribute < ActiveRecord::Migration[5.0]
  def change
    change_column :users, :logged_in, :boolean, :default => false
  end
end
