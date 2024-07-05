const { conn } = require('../db/dbconnect')
const jtoken = require('jsonwebtoken')
const crypt = require('bcryptjs')
const jwtconfig = require('./../config/jwtconfig.js')

module.exports = {
	/*loginRegistro: async (req, res) => {
		const {user, password} = req.body
		const encriptado = await crypt.hash(password, 5)
		const [creado] = await conn.query(`INSERT INTO users (user, password) VALUES (?, ?);`, [user, encriptado])
		res.redirect('/login.html')
	},

	login: async (req, res) => {
		const {user, password} = req.body
		const[[valido]] = await conn.query(`SELECT * FROM users WHERE user = ?`, user)
		console.log(valido)
		if(valido === undefined){
			res.status(404).send('Usuario no encontrado')
		} else if (!(await crypt.compare(password, valido.password))){
			res.status(401).send({auth: false, token: null})
		} else { 
			token = jtoken.sign({id: valido.id}, jwtconfig.secretKey, {expiresIn: jwtconfig.tokenExpiresIn})
			req.session.userId = valido.id // identificar a la sesion
			res.status(201).send({auth: true, token})
		}
	},

	logout: async (req, res) => {
		req.session.userId = null // poner nulo el identificador
		res.redirect('/login.html')
	}*/
}