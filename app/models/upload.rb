class Upload < ActiveRecord::Base 

	belongs_to :account

  validates :file, presence: true  

	mount_uploader :file, FileUploader


  def check_if_uploaded? 
    if self.file != nil 
      return true 
    else
      false 
    end
  end
  
end
