import React, { useState, useEffect } from 'react';
import axios from 'axios';

import requiresAuth from './requiresAuth';

const Jokes = props => {
	const [jokes, setJokes] = useState([]);

	const fetchData = async () => {
		try {
			const res = await axios.get('http://localhost:3300/api/jokes');
			setJokes(res.data);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<section>
			<h2>Get ready to laugh...</h2>
			<ul>
				{jokes.map(joke => (
					<li key={joke.id}>{joke.joke}</li>
				))}
			</ul>
		</section>
	);
};

export default requiresAuth(Jokes);
