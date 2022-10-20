import React from 'react';
import s from './HomePage.module.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	getVideogames,
	filterByCreated,
	orderByName,
	orderByRating,
	getGenres,
	filterByGenre,
} from '../../redux/actions/index';
import { Link } from 'react-router-dom';
import Car from '../card/Car';
import Paginado from '../Paginado/Paginado';


export default function HomePage() {
	const dispatch = useDispatch();
	const allVideogames = useSelector((state) => state.videogames);
	const allGenres = useSelector((state) => state.genres);
	const [currentPage, setCurrentPage] = useState(1);
	const [orden,setOrden] = useState('')
	const [gamesPerPage] = useState(15);
	const indexOfLastGame = currentPage * gamesPerPage;
	const indexOfFirstGame = indexOfLastGame - gamesPerPage;
	const currentGames = allVideogames.slice(indexOfFirstGame, indexOfLastGame);
	
	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	useEffect(() => {
		dispatch(getVideogames());
		dispatch(getGenres());
	}, [dispatch]);

	function handleClick(e) {
		e.preventDefault();
		dispatch(getVideogames();)
	}

	

	return <div className={s.backg}></div>;
}
