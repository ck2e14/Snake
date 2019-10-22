class CreateScores < ActiveRecord::Migration[6.0]
  def change
    create_table :scores do |t|
      t.integer :score
      t.references :user, foregin_key: true

      t.timestamps
    end
  end
end
