class AddLanguageToTests < ActiveRecord::Migration[5.0]
  def change
    add_column :tests, :language, :varchar
  end
end
