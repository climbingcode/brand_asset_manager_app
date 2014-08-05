require 'prawn'
require 'prawn/table'

class Bampdf < Prawn::Document 

	attr_accessor :hexcolors

	def initialize(account)
		super() 
		@hexcolors = account.hexcolors.pluck(:hextriplet)
		@uploads = account.uploads
		@account = account
		@fonts = account.fonts
		define_grid(:columns => 10, :rows => 10, :gutter => 10)  
	


 bounding_box([bounds.left, bounds.top], :width => bounds.width) do
        cell :background_color => 'EEEEEE',
             :width => bounds.width,
             :height => 70,
             :align => :center,
             :text_color => "001B76",
             :borders => [:bottom],
             :border_width => 2,
             :border_color => '000000',
             :padding => 12
      end

  bounding_box [bounds.left, bounds.bottom + 50], :width  => bounds.width do
        cell :content => 'This contains copyrighted material',
             :background_color => '333333',
             :width => bounds.width,
             :height => 50,
             :align => :center,
             :text_color => "FFFFFF",
             :borders => [:top],
             :border_width => 2,
             :border_color => '000000',
             :padding => 12
      end

 	grid([1,0], [8,1]).bounding_box do 
 		cell 	:background_color => 'eeeeee',
 					:width => 100,
 					:height => 595
 	end


page_count.times do |i|
   go_to_page(i+1)
   	file1 = @uploads.first.file
		ask = "#{file1.root}#{file1.url}"
    image ask, :at => [30, 720], :width => 50	
  end
	#brand
	stroke_color "000000"
	
	if account.hexcolors.first != nil
		fill_color "#{account.hexcolors.first.hextriplet}"
	else
		
	end

	grid([0,2], [0,8]).bounding_box do 
		font_size(80) do
			 text_rendering_mode(:fill_stroke) do
			 	move_down 20
				text "#{account.brand}'s design specs", :mode => :stroke, :overflow => :shrink_to_fit, :align => :center
			end
		end	
	end


grid([1,0], [4,2]).bounding_box do
	move_down 20
	table hex_colors_rows do

      row(0).font_style = :bold
      self.header = true
      self.row_colors = @hexcolors
      self.column_widths = [80, 300, 200]
  end
end

grid([4,0], [6,1]).bounding_box do
	table fonts_headline_rows do
      row(0).font_style = :bold
      self.header = true
      self.row_colors = @fonts
      self.column_widths = [80, 300, 200]
  end
end

grid([7,0], [9,1]).bounding_box do
	table fonts_body_rows do
      row(0).font_style = :bold
      self.header = true
      self.row_colors = @fonts
      self.column_widths = [80, 300, 200]
  end
end
	#LOGOS

	if @uploads.first != nil
		file1 = @uploads.first.file
 		file_path1 = "#{file1.root}#{file1.url}"
 	end

 	if @uploads[1] != nil
 		file2 = @uploads[1].file
 		file_path2 = "#{file2.root}#{file2.url}"	
 	end

 	if @uploads[2] != nil
 		file3 = @uploads[2].file
 		file_path3 = "#{file3.root}#{file3.url}"	
 	end
		
 	grid([1,3], [1,8]).bounding_box do
 		move_down 15
		text "ASSETS", :width => 300, :height => 50, :align => :center, size: 35, style: :bold
	end

	if @uploads.count == 1
		grid([1,4], [300,7] ).bounding_box do
			begin 
				image file_path1, :height => 200, :width => 200, :align => :center
			rescue
			end
		end
	end
	
	if @uploads.count == 2
		grid([2,2], [4,6] ).bounding_box do
				begin 
					image file_path1, :height => 120, :width => 120 
				rescue
				end

				grid([0,4], [3,9] ).bounding_box do
				begin 
				image file_path2, :height => 120, :width => 120, :align => :center
				rescue
				end
			end
		end
	end
	
	if @uploads.count >= 3
		grid([2,2], [3,4] ).bounding_box do
					begin 
						image file_path1, :height => 100, :width => 100
					rescue
					end	
				end
					grid([2,4], [3,6] ).bounding_box do
					begin 
						image file_path2, :height => 100, :width => 100, :position => :center
					rescue
					end
				end
					grid([2,7], [3,9]).bounding_box do
	 			begin 
					image file_path3, :height => 100, :width => 100, :position => :center
				rescue
				end
		end
	end	

	

	if @account.mission_statement != nil

		grid([4,3], [4,8]).bounding_box do
		move_down 15
		text "MISSION STATEMENT", :width => 300, :height => 50, :align => :center, size: 15, style: :bold, :font => "new times roman"
	end
		string = @account.mission_statement

	 	grid([4,3], [4,8]).bounding_box do
	 		move_down 30
			y_position = cursor - 10
			[:center].each_with_index do |mode, i|
	 		text_box string, :at => [i * 600, y_position],
	 		:width => 300, :height => 50, :align => :center
	 		
			end
		end
	end


if account.hexcolors.first != nil
		fill_color "#{account.hexcolors.first.hextriplet}"
end

	if @account.mission_statement != nil 
		string = @account.story

		grid([6,2], [6,8]).bounding_box do
			text "STORY", :width => 400, :height => 50, :align => :center, size: 15, style: :bold
		end

		grid([6,2], [6,9]).bounding_box do
		move_down 20
		y_position = cursor - 20
		[:center].each_with_index do |mode, i|
		text_box string, :at => [i * 600, y_position],
		:width => 400, :height => 200, :align => :center
			end
		end
	end
end


def box_content(images)
 text images
 transparent(0.5) { stroke_bounds }
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
      text "Story", size: 15
      text @account.story
    end
 
  end
 
  
    # This makes a call to product_rows and gets back an array of data that will populate the columns and rows of a table
    # I then included some styling to include a header and make its text bold. I made the row background colors alternate between grey and white
    # Then I set the table column widths
   
    
   	def hex_colors_rows
    	[['Hexcolors']] +
      @hexcolors.map do |colors| 
      	[colors] 
      end
  	end

  		def fonts_headline_rows
    	[['Headline']] +
      @fonts.map do |fonts| 
      	[fonts.headline] 
      end
  	end

  		def fonts_body_rows
    	[['Body']] +
      @fonts.map do |fonts| 
      	[fonts.body] 
      end
  	end


end