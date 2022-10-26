import React from 'react';
import { Link } from 'react-router-dom';
import s from './NavBar.module.css';
import logo from '../../assets/Logo.png';
import SearchBar from '../searchBar/SearchBar';
class NavBar extends React.Component {
	render() {
		return (
			<div className={s.conten}>
				<Link to='/'>
					<img src={logo} alt='' height='50px' />
				</Link>
				<Link to='/home' className={s.links}>
					Home
				</Link>
				{/* <Link to='/detail/:id'>Videogames</Link> */}
				<Link to='/create' className={s.links}>
					Create
				</Link>
				<SearchBar />
			</div>
		);
	}
}

export default NavBar;
