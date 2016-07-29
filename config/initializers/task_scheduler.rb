require 'rubygems'
require 'rufus/scheduler'

SessionsController.count_users
scheduler = Rufus::Scheduler.new

scheduler.every '1m' do 
    SessionsController.count_users
end