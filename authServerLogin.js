console.log("started express authServerLogin")
if(process.NODE_ENV !== 'production') {
		require('dotenv').config()
}
const express = require('express');
const app = express();
const uuidv4 = require('uuid/v4');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const UsersModel = require('./src/models/users');
const RecipesModel = require('./src/models/recipes');

//connect to mongodb  DATABASE_URL=mongodb://localhost:27017/recipes (already set to recipes database)

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true } )
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', function() {
	console.log("connected to mongoose")
})

async function createUser(user) {
	const yourPassword = user.password;
	const saltRounds = 10
	hashedPassword = bcrypt.hashSync(yourPassword, saltRounds)
	let sampleUser = {
						"id": uuidv4(),
					    "username": user.username,
					    "password":  hashedPassword,
					    "updated":  Date.now() 	
	}
	
	const newUser = new User(sampleUser);
	newUser.save(function (err) {
  		if (err) return handleError(err);
  		console.log(newUser.username + " saved to users collection.");
  	// saved! 
	})
}



async function handleUsersGet() {
	try {
		const users = await User.find({});
		//console.log("users: ", users)
		return users

	}
	catch(err) {
		console.log(err)
	}
}

async function handleRecipesGet() {
	try {
		const recipes = await RecipesModel.find({});
		//console.log("recipes: ", recipes)
		return recipes

	}
	catch(err) {
		console.log(err)
	}
}
app.use(express.json())
app.get('/users', async (req, res) => {
	res.json(await handleUsersGet())
})
app.get('/recipes', async (req, res) => {
	res.json(await handleRecipesGet())
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
app.listen(process.env.PORT || 5001)
