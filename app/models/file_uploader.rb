class FileUploader < CarrierWave::Uploader::Base
  
  def store_dir
    'app/public/my/upload/directory'
  end

end
