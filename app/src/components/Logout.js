import React, { useEffect } from 'react';

const Logout = props => {
	useEffect(() => {
		localStorage.removeItem('token');
		props.history.push('/');
	}, []);

	return <h2>Logging out...</h2>;
};

export default Logout;
