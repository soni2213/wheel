# frozen_string_literal: true

class Note < ApplicationRecord
  belongs_to :user
  belongs_to :assignee, foreign_key: :assignee_id, class_name: "Contact"

  validates :title, :description, presence: true
  validates :title, uniqueness: true
end
