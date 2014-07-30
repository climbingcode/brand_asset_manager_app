# Homepage (Root path)
get '/' do
	hexcolor = Hexcolor.first 
	@hexcolor = hexcolor.hextriplet 
  erb :index
end

get '/account' do
	erb :'account/index'
end

post '/signin' do

end