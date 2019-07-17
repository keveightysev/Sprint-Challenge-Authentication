import React from 'react';
import { Route, NavLink } from 'react-router-dom';

import Register from './components/Register';
import Jokes from './components/Jokes';
import Login from './components/Login';
import Logout from './components/Logout';

import './App.css';

const App = props => {
	return (
		<div className='App'>
			<header>
				<h1>You've Got Jokes</h1>
				<nav>
					<NavLink to='/register'>Register</NavLink>
					&nbsp; | &nbsp;
					<NavLink to='/login'>Login</NavLink>
					<NavLink to='/jokes'>Jokes</NavLink>
					&nbsp; | &nbsp;
					<NavLink to='/logout'>Log Out</NavLink>
				</nav>
			</header>
			<main>
				<Route path='/' exact component={Default} />
				<Route path='/register' component={Register} />
				<Route path='/jokes' component={Jokes} />
				<Route path='/login' component={Login} />
				<Route path='/logout' component={Logout} />
			</main>
		</div>
	);
};

const Default = () => {
	return (
		<>
			<h3>Welcome to jokes!</h3>
			<p>We've got the best jokes</p>
		</>
	);
};

export default App;
