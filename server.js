

console.log("started express server.js")
require('dotenv').config()
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');


const posts = [
	{
		username: 'Matt',
		title: 'Dinoshark 1',
		description: 'blue, round, white, smile'
	},
	{
		username: 'Matt',
		title: 'shark 2'
	},
	{
		username: 'Matt',
		title: 'daidai 3'
	},
	{
		username: 'nunnybunny',
		title: 'Post 1'
	},
	{
		username: 'nunnybunny',
		title: 'Post 2'
	},
	{
		username: 'nunnybunny',
		title: 'Post 3'
	}

]

app.use(express.json())
app.get('/posts', authenticateToken, (req,res) => {

	res.json(posts.filter(post => post.username === req.user.name))

})

function authenticateToken (req, res, next) {
	const authHeader = req.headers['authorization']
	const token = authHeader && authHeader.split(' ')[1]
	//Bearer TOKEN
	if(token == null) return res.sendStatus(401)

	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
		if(err) return res.sendStatus(403)

		req.user = user 
		next()
	})
}
app.listen(3001)
