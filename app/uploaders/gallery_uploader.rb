# encoding: utf-8

class GalleryUploader < CarrierWave::Uploader::Base
  include CarrierWave::MiniMagick

  storage :file

  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end

  def size
    @image ||= MiniMagick::Image.open(file.path)
  end

  version :thumb do
    process resize_to_fill: [65, 65]
    # process :optimize
  end

  version :img do 
    process resize_to_limit: [1015, 690]

  end

  def optimize
    manipulate! do |img|
      img.strip
      img.combine_options do |c|
        c.quality "90"
        c.depth "8"
        c.interlace "plane"
      end
      img
    end
  end

end