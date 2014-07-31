# Homepage (Root path)
require_relative '../app/helpers/application_helpers.rb'

helpers do 

end

get '/' do
	@user = nil
	@photo = nil
	erb :index
end


get '/account/:id' do
	erb :'account/index'
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
			raise "there was a problem"
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

	if (@hexcolor1.save || @hexcolor1.hextriplet == nil) && (@hexcolor2.save || @hexcolor2.hextriplet == nil) && (@hexcolor3.save || @hexcolor3.hextriplet == nil)
		redirect "/#{Account.find(params[:id]).brand}"
	else
		raise "these did not save"
	end
end


get '/:name' do
	@session = session[:id]


	if @session != nil
		
		@user = Account.find(@session)

		if @user.uploads[0].file != nil 
			@photo1 = @user.uploads[0].file
		end
		if @user.uploads[1].file != nil 
			@photo2 = @user.uploads[1].file
		end
		if @user.uploads[2].file != nil 
			@photo3 = @user.uploads[2].file
		end	
	end

	if @user.hexcolors != []
		hex = @user.hexcolors.where(account_id: @user.id)
		@hexcolor = hex.pluck(:hextriplet)
	end
  erb :index
end








