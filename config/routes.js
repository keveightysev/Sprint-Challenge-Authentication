const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('../database/dbConfig.js');

const { authenticate } = require('../auth/authenticate');

module.exports = server => {
	server.post('/api/register', register);
	server.post('/api/login', login);
	server.get('/api/jokes', authenticate, getJokes);
};

async function register(req, res) {
	const user = req.body;
	if (!user.username) {
		res
			.status(406)
			.json({ message: 'You cannot register without a username!' });
		return;
	} else if (!user.password) {
		res
			.status(406)
			.json({ message: 'Uh, we kind of need a password to register you' });
		return;
	}
	user.password = bcrypt.hashSync(user.password, 8);
	try {
		const [id] = await db('users').insert(user);
		const newUser = await db('users')
			.where({ id })
			.first();
		res.status(201).json(newUser);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: 'Server error creating new user' });
	}
}

async function login(req, res) {
	let { username, password } = req.body;
	try {
		const user = await db('users')
			.where({ username })
			.first();
		if (user && bcrypt.compareSync(password, user.password)) {
			const token = generateToken(user);
			res.status(200).json({
				message: `Welcome, ${user.username}! Token for your troubles?`,
				token,
			});
		} else {
			res.status(401).json({ message: 'Invalid credentials!' });
		}
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: 'Server error while logging in' });
	}
}

function getJokes(req, res) {
	const requestOptions = {
		headers: { accept: 'application/json' },
	};

	axios
		.get('https://icanhazdadjoke.com/search', requestOptions)
		.then(response => {
			res.status(200).json(response.data.results);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ message: 'Error Fetching Jokes', error: err });
		});
}

function generateToken(user) {
	const payload = {
		subject: user.id,
		username: user.username,
	};

	const secret =
		process.env.JWT_SECRET ||
		'add a .env file to root of project with the JWT_SECRET variable';

	const options = {
		expiresIn: '7d',
	};

	return jwt.sign(payload, secret, options);
}
