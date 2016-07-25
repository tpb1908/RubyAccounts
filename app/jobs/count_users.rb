class CountUsers
    def self.count
        online = User.where('updated_at > ?', DateTime.now - 15.minutes)
        puts 'Users online is ' + online.count.to_s
        $users_online = online.count
    end

end
