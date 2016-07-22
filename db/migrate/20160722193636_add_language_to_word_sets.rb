class AddLanguageToWordSets < ActiveRecord::Migration[5.0]
  def change
    add_column :word_sets, :language, :string
  end
end
