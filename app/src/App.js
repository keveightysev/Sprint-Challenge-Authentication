import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';

class App extends Component {
	render() {
		return (
			<div className='App'>
				<header>
					<h1>You've Got Jokes</h1>
					<nav>
						<Link to='/register'>Register</Link>
					</nav>
				</header>
				<main>
					<Route path='/' exact component={Default} />
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
