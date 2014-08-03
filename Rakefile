require 'rake'
require "sinatra/activerecord/rake"
require ::File.expand_path('../config/environment', __FILE__)
require 'factory_girl'
require 'faker'

Rake::Task["db:create"].clear
Rake::Task["db:drop"].clear

# NOTE: Assumes SQLite3 DB
desc "create the database"
task "db:create" do
  touch 'db/db.sqlite3'
end

desc "drop the database"
task "db:drop" do
  rm_f 'db/db.sqlite3'
end

desc 'Retrieves the current schema version number'
task "db:version" do
  puts "Current version: #{ActiveRecord::Migrator.current_version}"
end

desc "add fake data"
task "faker" do

	Factory.define :account do |u|
	  u.brand Faker::Company.name
	  u.email Faker::Internet.email
	 	u.username Faker::Internet.user_name
	 	u.password Faker::Internet.password(8)
	 	u.website_url Faker::Internet.url
	 	u.mission_statement Faker::Company.catch_phrase
	 	u.story Faker::Lorem.sentence(3, true)
	end

	Factory.define :fonts do |u|
		u.headline ["proxima nova", "alternate nova", "adelle"]
		u.body
		after_build do |account|
			account.fonts << FactoryGirl.build(:fonts, :account => account )
		end
	end

colour = "%06x" % (rand * 0xffffff)

	Factory.define :hexcolors do |u|
		u.hextriplet color
		after_build do |account|
			account.hexcolors << FactoryGirl.build(:fonts, :account => account )
		end
	end

	Factory.define :uploads do |u|
		u.file Faker::Company.logo
	  after_build do |account|
	  	account.uploads << FactoryGirl.build(:uploads, :acount => account)
	  end
	end
end
