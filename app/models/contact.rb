# frozen_string_literal: true

class Contact < ApplicationRecord
  has_many :tasks

  validates :name, :email, :mobile, presence: true
  validates :email, uniqueness: true
end
