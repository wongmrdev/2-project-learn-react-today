console.log("started express authServerLogin")
require('dotenv').config()
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

const users = []

app.use(express.json())
app.get('/users', (req, res) => {
	res.json(users)
})

app.post('/users', async (req, res) => {
	try {
		const salt = await bcrypt.genSalt()
		const hashedPassword = await bcrypt.hash(req.body.password, salt)
		console.log(salt)
		console.log(hashedPassword)
		const user = req.body
		users.push( {name: user.name , password: hashedPassword } )
		res.sendStatus(204,'user accepted')
	}
	catch {
		res.status(500)
	}
	
})

app.post('/users/login', async (req, res) => {
	console.log(req.body.name)
	users.map(user => console.log(user))
	const user = users.find(user => user.name === req.body.name)
	if (user == null) {
		return res.status(400).send('cannot find user')
	}

	try {
		if(await bcrypt.compare(req.body.password, user.password)) {
			res.send('success') 
		}
		else {
			res.send('not allowed')
		}
	}
	catch {
		res.status(500)
	}
})
app.listen(5001)
