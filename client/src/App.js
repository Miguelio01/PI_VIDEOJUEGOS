import './App.css';
import { Route, useLocation } from 'react-router-dom';
import LandingPage from './components/landing/LandingPage';
import HomePage from './components/home/HomePage';
import NavBar from './components/nav/NavBar';
import Detail from './components/detail/Detail';
import CreateForm from './components/createForm/CreateForm';

function App() {
	let location = useLocation();
	return (
		<div className='App'>
			{location.pathname !== '/' && <NavBar />}
			<Route path='/' exact component={LandingPage} />
			<Route exact path='/home' component={HomePage} />
			<Route exact path='/detail/:id' component={Detail} />
			<Route exact path='/create' component={CreateForm} />
		</div>
	);
}

export default App;
