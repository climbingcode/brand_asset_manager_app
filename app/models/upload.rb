class Upload < ActiveRecord::Base 

	belongs_to :account

	mount_uploader :file, FileUploader
end