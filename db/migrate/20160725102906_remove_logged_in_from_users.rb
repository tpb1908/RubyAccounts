class RemoveLoggedInFromUsers < ActiveRecord::Migration[5.0]
  def change
    remove_column :users, :logged_in
  end
end
