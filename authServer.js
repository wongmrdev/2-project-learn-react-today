

console.log("started express authServer")
require('dotenv').config()
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

app.use(express.json())

let refreshTokens = []

app.post('/token', (req, res) => {
	const refreshToken = req.body.token
	console.log('refreshToken: '+ refreshToken)
	if(refreshToken == null) return res.sendStatus(401)
	console.log(refreshTokens)
	if(!refreshTokens.includes(refreshToken)) return res.sendStatus(401)
	console.log('refresh token matches: ' + refreshToken)
	jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
		if(err) return res.sendStatus(403)

		const accessToken = generateAccessToken({ name: user.name })
		res.json({ accessToken: accessToken })

	})

})

app.post('/login', (req,res) => {
	//Auth the user
	const username = req.body.username
	const user = {
		name: username
	}

	const accessToken = generateAccessToken(user)
	const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
	refreshTokens.push(refreshToken)
	console.log(refreshToken)

	res.json({ accessToken: accessToken , refreshToken: refreshToken })

})

app.delete('/logout', (req, res) => {
	refreshTokens = refreshTokens.filter(token => token !== req.body.token)
	res.sendStatus(204)


})

function generateAccessToken(user){
	return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '60s' })
}
app.listen(process.env.PORT || 4001)
