require 'rubygems'
require 'rufus/scheduler'

scheduler = Rufus::Scheduler.new

scheduler.every '10m' do 
    CountUsers.count
end