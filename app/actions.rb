# Homepage (Root path)

get '/' do
	@user = nil
	erb :index
end


get '/account/:id' do
	erb :'account/index'
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
		password: params[:password]
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

	@hexcolor1 = Hexcolor.new(
		hextriplet: params[:hexcolor1],
		account_id: @brand.id,
		primary: true
		)
	@hexcolor2 = Hexcolor.new(
		hextriplet: params[:hexcolor2],
		account_id: @brand.id
		)
	@hexcolor3 = Hexcolor.new(
		hextriplet: params[:hexcolor3],
		account_id: @brand.id
		)

	if @hexcolor1.save && @hexcolor2.save && @hexcolor3.save
		redirect "/#{Account.find(params[:id]).brand}"
	else
		raise "these did not save"
	end
end



get '/:name' do
	@session = session[:id]
	@user = Account.find(@session)
	if @user.hexcolors != []
		hex = @user.hexcolors.where(account_id: @user.id)
		@hexcolor = hex.pluck(:hextriplet)
	end
  erb :index
end








