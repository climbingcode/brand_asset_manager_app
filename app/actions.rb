# Homepage (Root path)

get '/' do
	@session = nil
	erb :index
end

get '/:id' do
	@session = Account.find_by(params[:id].to_i)
	hex = @session.hexcolors.where(account_id: @session.id)
	@hexcolor = hex.pluck(:hextriplet)
  erb :index
end

get '/account/:id' do
	
	erb :'account/index'
end

post '/signin' do
	@account = Account.where(username: params[:username] ).where(password: params[:password] )
	if @account[0] != nil
		redirect "account/#{ @account[0].id }"
	else
		raise "This is not an account"
	end
end

post '/account/:id' do

	redirect "/#{params[:id]}"
end