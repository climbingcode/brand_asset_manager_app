class Upload < ActiveRecord::Base 

	belongs_to :account

	mount_uploader :file, FileUploader


  def check_if_uploaded? 
    if self.file.file != nil
    	binding.pry
       true 
    else
       false 
    end
  end
  
end
