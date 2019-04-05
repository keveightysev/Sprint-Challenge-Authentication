import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';

import Register from './components/Register';
import Jokes from './components/Jokes';

import './App.css';

class App extends Component {
	render() {
		return (
			<div className='App'>
				<header>
					<h1>You've Got Jokes</h1>
					<nav>
						<NavLink to='/register'>Register</NavLink>
						<NavLink to='/jokes'>Jokes</NavLink>
					</nav>
				</header>
				<main>
					<Route path='/' exact component={Default} />
					<Route path='/register' component={Register} />
					<Route path='/jokes' component={Jokes} />
				</main>
			</div>
		);
	}
}

const Default = () => {
	return (
		<>
			<h3>Welcome to jokes!</h3>
			<p>We've got the best jokes</p>
		</>
	);
};

export default App;
