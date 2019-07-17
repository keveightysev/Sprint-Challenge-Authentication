import React from 'react';
import axios from 'axios';

import { useInput } from './useInput';

const Login = props => {
	const {
		value: username,
		bind: bindUsername,
		reset: resetUsername,
	} = useInput('');

	const {
		value: password,
		bind: bindPassword,
		reset: resetPassword,
	} = useInput('');

	const handleSubmit = async e => {
		e.preventDefault();
		try {
			const res = await axios.post('http://localhost:3300/api/login', {
				username,
				password,
			});
			localStorage.setItem('token', res.data.token);
			resetUsername();
			resetPassword();
			props.history.push('/jokes');
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<section>
			<h2>Please log in to view jokes</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<input
						type='text'
						id='username'
						placeholder='username'
						{...bindUsername}
					/>
				</div>
				<div>
					<input
						type='password'
						id='password'
						placeholder='password'
						{...bindPassword}
					/>
				</div>
				<button>Login</button>
			</form>
		</section>
	);
};

export default Login;
