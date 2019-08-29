class Message < ApplicationRecord
  mount_uploader :image, ImageUploader
  belongs_to :group
  belongs_to :user
  validates :content, presence: true, unless: :image?
end

