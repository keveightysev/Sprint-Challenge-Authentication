import React from 'react';
import axios from 'axios';

axios.interceptors.request.use(config => {
	config.headers.authorization = localStorage.getItem('token');
	return config;
});

export default function(Component) {
	return function Authenticated(props) {
		const token = localStorage.getItem('token');
		const notLoggedIn = <h2>You gotta log in to see these jokes</h2>;
		return <>{token ? <Component {...props} /> : notLoggedIn}</>;
	};
}
