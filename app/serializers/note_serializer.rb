# frozen_string_literal: true

class NoteSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :created_at, :tags, :due_date, :assignee_name

  def created_at
    self.object.created_at.strftime("%B %d, %Y")
  end

  def due_date
    self.object.due_date&.strftime("%B %d, %Y")
  end

  def assignee_name
    self.object.assignee&.name
  end
end
