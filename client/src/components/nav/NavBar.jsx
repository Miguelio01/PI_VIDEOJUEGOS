import React from 'react';
import { Link } from 'react-router-dom';
import s from './NavBar.module.css';
import logo from '../../assets/Logo.png';
import SearchBar from '../searchBar/SearchBar';
class NavBar extends React.Component {
	render() {
		return (
			<div className={s.conten}>
				<img src={logo} alt='' height='50px' />
				<Link to='/'>Home</Link>
				<Link to='/videogames'>Videogames</Link>
				<Link to='/create'>Create</Link>
				<SearchBar />
			</div>
		);
	}
}

export default NavBar;
