# Homepage (Root path)
require_relative '../app/helpers/application_helpers.rb'
require 'mini_magick'

helpers do 


end

get '/' do
	@user = nil
	@photo = nil
	@home_logos = Upload.all
	@logo = @home_logos.sample.file.file
	
	erb :index
end

get '/error' do
	erb :error
end

get '/account/:id' do
	if session[:id] && params[:id].to_i == session[:id]
		erb :'account/index'
	else
		redirect "/"
	end
end

post '/logout' do
	session.clear
	redirect '/'
end



post '/pdf/:name' do
	@user = Account.find_by(brand: params[:name])		

  content_type 'application/pdf'
  pdf = Bampdf.new(@user)
  pdf.render
end


post '/signin' do
	@account = Account.where(username: params[:username]).where(password: params[:password] )
	if @account[0] != nil 

		@session = (session[:id] = @account[0].id) 
		redirect "/#{@account[0].brand}"
	else
		redirect '/error'
	end
end

post '/signup' do

@errors = [] 

	@account = Account.new(
		brand: params[:brand],
		email: params[:email],
		username: params[:username],
		password: params[:password],
		website_url: params[:website]
	) 
		if @account.save 
			session[:id] = @account.id
			redirect "account/#{@account.id}"
		else 
			redirect "/"
     end
end

post '/account/:id' do

	@brand = Account.find(params[:id])


	if params[:upload1] != nil 
		@uploaded_file1 = @brand.uploads.new :file => params[:upload1]
		@uploaded_file1.save 
	end

	if params[:upload2] != nil
		@uploaded_file2 = @brand.uploads.new :file => params[:upload2]
		@uploaded_file2.save   
	end

	if params[:upload3] != nil
		@uploaded_file3 = @brand.uploads.new :file => params[:upload3]
		@uploaded_file3.save
	end


if params[:hexcolor1] != "000000"

	@hexcolor1 = Hexcolor.create(
		hextriplet: params[:hexcolor1],
		account_id: params[:id]
		)
end

if params[:hexcolor2] != "000000"
	@hexcolor2 = Hexcolor.create(
		hextriplet: params[:hexcolor2],
		account_id: params[:id]
		)
end

if params[:hexcolor3] != "000000"
	@hexcolor3 = Hexcolor.create(
		hextriplet: params[:hexcolor3],
		account_id: params[:id]
		)
end

	@type = Font.create(
		body: params[:bodytype],
		headline: params[:headlinetype],
		account_id: params[:id]
		)


	if (params[:mission_statement] != " ") && (params[:story] != " ")
			@copy = @brand.update_attributes(
		mission_statement: params[:mission_statement],
		story: params[:brand_story]
		)
	end

	redirect "/#{Account.find(params[:id]).brand}"

end

post '/dashboard' do
	session.clear
	redirect '/'
end


get '/:name' do
	@user = Account.find_by(brand: params[:name])

	@brand = @user
	

	if @user != nil
		@session = session[:id] == @user.id
	else
		redirect '/'
	end
	
 # FIRST THREE PHOTO VARIABLES 
	if @session != nil

		if @user.uploads[0] != nil 
			@logo1 = @user.uploads[0].file
				begin
					@jpeg1 = MiniMagick::Image.open("#{@logo1.path}") 
					@jpeg1.write "convert/logo1.jpg"
					@png1 = MiniMagick::Image.open("#{@logo1.path}") 
					@png1.write "convert/logo1.png"
				rescue
			end
		end
		if @user.uploads[1] != nil 
			@logo2 = @user.uploads[1].file
				begin 
					@jpeg2 = MiniMagick::Image.open("#{@logo2.path}") 
					@jpeg2.write "convert/logo2.jpg"
				rescue 
			end
		end
		if @user.uploads[2] != nil 
			@logo3 = @user.uploads[2].file
				begin
					@jpeg3 = MiniMagick::Image.open("#{@logo3.path}") 
					@jpeg3.write "convert/logo3.jpg"
				rescue 
			end
		end	


	# FIRST THREE HEXCOLORS VARIABLES 
		if @user.hexcolors[0] != nil 
			@hexcolor1 = @user.hexcolors[0].hextriplet
		end
		if @user.hexcolors[1] != nil 
			@hexcolor2 = @user.hexcolors[1].hextriplet
		end
		if @user.hexcolors[2] != nil 
			@hexcolor3 = @user.hexcolors[2].hextriplet
		end	

# FONTS 
begin 
		if @user.fonts != nil	
			@body = @user.fonts[0].body
		end

		if @user.fonts[0].headline != nil
			@headline = @user.fonts[0].headline
		end

	

		if @user.mission_statement != nil
			@mission = @user.mission_statement
		end

		if @user.story != nil
			@story = @user.story
		end 
rescue
end

	end

	erb :index
	# if @session != nil
	# 	hex = @user.hexcolors.where(account_id: @user.id)
	# 	@hexcolor = hex.pluck(:hextriplet)
	# end
  
end










