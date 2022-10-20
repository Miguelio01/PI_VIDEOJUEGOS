import './App.css';
import { Route } from 'react-router-dom';
import LandingPage from './components/landing/LandingPage';
import HomePage from './components/home/HomePage';

function App() {
	return (
		<div className='App'>
			<Route path='/' exact component={LandingPage} />
			<Route exact path='/home' component={HomePage} />
		</div>
	);
}

export default App;
