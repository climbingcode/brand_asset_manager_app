class FileUploader < CarrierWave::Uploader::Base
  
  include CarrierWave::MiniMagick
  
  def store_dir
    'app/public/my/upload/directory'
  end


end
