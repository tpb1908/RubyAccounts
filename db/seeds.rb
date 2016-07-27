200.times do |n|
  name  = Faker::Name.name
  username = Faker::Internet.password(19,20)
  email = "example-#{n+1}@example.com"
  password = "password"
  User.create!(name:  name,
               username: username,
               email: email,
               password:              password,
               password_confirmation: password,
               activated: true,
               activated_at: Time.zone.now)
end
