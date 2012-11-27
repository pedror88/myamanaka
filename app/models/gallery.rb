class Gallery
  include Mongoid::Document
  include Mongoid::MultiParameterAttributes
  include Mongoid::Timestamps
  include Mongoid::Publish
  include Mongoid::Slug
  include Mongoid::Textile
  include MediaMagick::Model

  field :name,          type: String
  field :date,          type: Date
  field :description,   type: String

  validates_presence_of :name 

  attaches_many :images, uploader: GalleryUploader do
    field :description
end

  slug :name, history: true
  textilize :description

end
