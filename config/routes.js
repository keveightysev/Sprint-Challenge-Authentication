const axios = require('axios');
const bcrypt = require('bcryptjs');

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
			.select('id', 'username')
			.where({ id })
			.first();
		res.status(201).json(newUser);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: 'Server error creating new user' });
	}
}

function login(req, res) {
	// implement user login
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
			res.status(500).json({ message: 'Error Fetching Jokes', error: err });
		});
}
