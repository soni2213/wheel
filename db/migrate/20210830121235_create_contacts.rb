# frozen_string_literal: true

class CreateContacts < ActiveRecord::Migration[6.1]
  def change
    create_table :contacts, id: :uuid do |t|
      t.string :name, null: false
      t.string :email, null: false
      t.string :mobile, null: false
      t.string :department, array: true, default: []
      t.boolean :in_basecamp, default: false

      t.timestamps
    end
  end
end
