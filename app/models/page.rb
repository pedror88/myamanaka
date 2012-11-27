class Page
  include Mongoid::Document
  include Mongoid::Publish
  include Mongoid::Slug
  include Mongoid::Textile
  include MediaMagick::Model

  field :name,          type: String
  field :description

  validates_presence_of :name 


  slug :name, history: true

  textilize :description
end
