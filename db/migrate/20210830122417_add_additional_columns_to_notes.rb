# frozen_string_literal: true

class AddAdditionalColumnsToNotes < ActiveRecord::Migration[6.1]
  def up
    add_column :notes, :tags, :string, array: true, default: []
    add_column :notes, :due_date, :datetime

    add_column :notes, :assignee_id, :uuid, index: true
    add_foreign_key :notes, :contacts, column: :assignee_id
  end

  def down
    remove_column :notes, :tags
    remove_column :notes, :due_date
    remove_foreign_key :notes, :contacts, column: :assignee_id
    remove_column :notes, :assignee_id
  end
end
