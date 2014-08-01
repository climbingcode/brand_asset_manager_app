# Homepage (Root path)
require_relative '../app/helpers/application_helpers.rb'

helpers do 


end

get '/' do
	@user = nil
	@photo = nil
	@@errors 
	erb :index
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

post '/signin' do
	@account = Account.where(username: params[:username] ).where(password: params[:password] )
	if @account[0] != nil
		@session = (session[:id] = @account[0].id) 
		redirect "/#{@account[0].brand}"
	else
		raise "This is not an account"
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
				@account && @account.errors.any?
        @account.errors.full_messages.each do |error| 
        	display_errors(error)
        end
      
      redirect '/' 
    end
end


post '/account/:id' do

	@brand = Account.find(params[:id])

	@uploaded_file1 = @brand.uploads.create :file => params[:upload1]
	
	@uploaded_file2 = @brand.uploads.create :file => params[:upload2]
	
	@uploaded_file3 = @brand.uploads.create :file => params[:upload3]
	

	if @uploaded_file1.check_if_uploaded? && @uploaded_file1.save  
		true 
	else 
		"these did not save"
	end

	if @uploaded_file1.check_if_uploaded? && @uploaded_file2.save  
		true 
	else 
		"these did not save"
	end

	if @uploaded_file1.check_if_uploaded? && @uploaded_file3.save  
		true 
	else 
		"these did not save"
	end
	# @file1 = File.open(File.join(APP_ROOT, '/uploads', params['upload1'][:filename]), "w") do |f|
	# 	f.write(params['upload1'][:tempfile].read)
	# end
	
	@hexcolor1 = Hexcolor.new(
		hextriplet: params[:hexcolor1],
		account_id: params[:id]
		)
	@hexcolor2 = Hexcolor.new(
		hextriplet: params[:hexcolor2],
		account_id: params[:id]
		)
	@hexcolor3 = Hexcolor.new(
		hextriplet: params[:hexcolor3],
		account_id: params[:id]
		)

	@type = Font.new(
		body: params[:bodytype],
		headline: params[:headlinetype],
		account_id: params[:id]
		)
	@type.save

	if (@hexcolor1.save || @hexcolor1.hextriplet == nil) && (@hexcolor2.save || @hexcolor2.hextriplet == nil) && (@hexcolor3.save || @hexcolor3.hextriplet == nil)
		redirect "/#{Account.find(params[:id]).brand}"
	else
		raise "these did not save"
	end

end



get '/:name' do
	@user = Account.find_by(brand: params[:name])
	@session = (session[:id] == @user.id)

		
 # FIRST THREE PHOTO VARIABLES 
	if @session != nil

		if @user.uploads[0].file != nil 
			@logo1 = @user.uploads[0].file
		end
		if @user.uploads[1].file != nil 
			@logo2 = @user.uploads[1].file
		end
		if @user.uploads[2].file != nil 
			@logo3 = @user.uploads[2].file
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
		if @user.fonts[0].body != nil
			@body = @user.fonts[0].body
		end

		if @user.fonts[0].headline != nil
			@headline = @user.fonts[0].headline
		end

	end

	erb :index
	# if @session != nil
	# 	hex = @user.hexcolors.where(account_id: @user.id)
	# 	@hexcolor = hex.pluck(:hextriplet)
	# end
  
end








