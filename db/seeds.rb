# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.create(name: 'Chris', username: 'cwk', email:'ck@c.com')
User.create(name: 'Haami', username: 'h1', email: 'h@h.com')
User.create(name: 'Regina', username: 'rrg1414', email: 'r@r.com')

Score.create(score: 99, user_id: 1)
Score.create(score: 66, user_id: 2)
Score.create(score: 1, user_id: 2)
