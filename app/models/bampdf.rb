require 'prawn'
require 'prawn/table'

class Bampdf < Prawn::Document 

	attr_accessor :hexcolors

	def initialize(account)
		super()
		@hexcolors = account.hexcolors
		@uploads = account.uploads
		@account = account

		gap = 20
		bounding_box([0, cursor], :width => 550, :height => 720) do
 		box_content("Fixed height")
 		bounding_box([gap, cursor - gap], :width => 500) do
 		images
 		bounding_box([gap, bounds.top - gap], :width => 600) do
 		table_content
		transparent(0.5) { dash(1); stroke_bounds; undash }
		 end
		 bounding_box([gap * 7, bounds.top - gap], :width => 100, :height => 200) do
		 box_content("Fixed height")
		 text_content
		 end
		 transparent(0.5) { dash(1); stroke_bounds; undash }
		 end
		 bounding_box([gap, cursor - gap], :width => 300, :height => 50) do
		 box_content("Fixed height")
		end
end

		
		
		table_content
		text_content
		
	end


def box_content(images)
 text images
 transparent(0.5) { stroke_bounds }
end


	def images
		bounding_box([0, cursor], :width => 550, :height => 300) do
	 	stroke_bounds

 		file1 = @uploads.first.file
 		file_path1 = "#{file1.root}#{file1.url}"

 		file2 = @uploads[1].file
 		file_path2 = "#{file2.root}#{file2.url}"
		
		image file_path1, :height => 100, :width => 100
		image file_path2, :height => 100, :width => 100		 
		end
	end	

 
  def text_content
    # The cursor for inserting content starts on the top left of the page. Here we move it down a little to create more space between the text and the image inserted above
    y_position = cursor - 50
 
    # The bounding_box takes the x and y coordinates for positioning its content and some options to style it
    bounding_box([0, y_position], :width => 270, :height => 300) do
      text "Mission Statement", size: 15, style: :bold
      text @account.mission_statement
    end
 
    bounding_box([300, y_position], :width => 270, :height => 300) do
      text "Story", size: 15, style: :bold
      text @account.story
    end
 
  end
 
  def table_content
    # This makes a call to product_rows and gets back an array of data that will populate the columns and rows of a table
    # I then included some styling to include a header and make its text bold. I made the row background colors alternate between grey and white
    # Then I set the table column widths
   
    
    table hex_colors_rows do

      row(0).font_style = :bold
      self.header = true
      self.row_colors = ["#444444"]
      self.column_widths = [80, 300, 200]
    end
  end
 
   def hex_colors_rows
    [['hexcolor']] +
      @hexcolors.map {|colors| [colors.hextriplet] }
  end




end