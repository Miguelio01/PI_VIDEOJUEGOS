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
// import { Link } from 'react-router-dom';
import Car from '../card/Car';
import Paginado from '../paginado/Paginado';
import image from '../../assets/BG-02.png';

export default function HomePage() {
	const dispatch = useDispatch();
	const allVideogames = useSelector((state) => state.videogames);
	const allGenres = useSelector((state) => state.genres);
	const [currentPage, setCurrentPage] = useState(1);
	const [setOrden] = useState('');
	const [gamesPerPage] = useState(15);
	const indexOfLastGame = currentPage * gamesPerPage;
	const indexOfFirstGame = indexOfLastGame - gamesPerPage;
	const currentGames = allVideogames.slice(indexOfFirstGame, indexOfLastGame);

	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	useEffect(() => {
		dispatch(getVideogames());
		dispatch(getGenres());
	}, [dispatch]);

	// function handleClick(e) {
	// 	e.preventDefault();
	// 	dispatch(getVideogames());
	// }

	function handleFilterGenre(e) {
		dispatch(filterByGenre(e.target.value));
		setCurrentPage(1);
	}

	function handleFilterCreated(e) {
		dispatch(filterByCreated(e.target.value));
		setCurrentPage(1);
	}

	function handleOrderName(e) {
		e.preventDefault();
		dispatch(orderByName(e.target.value));
		setOrden(`Ordenado ${e.target.value}`);
		setCurrentPage(1);
	}

	function handleOrderRating(e) {
		e.preventDefault();
		dispatch(orderByRating(e.target.value));
		setOrden(`Ordenado ${e.target.value}`);
		setCurrentPage(1);
	}

	return (
		<div className={s.backg}>
			<img className={s.image} src={image} alt='' />
			<div>
				<select onChange={(e) => handleOrderName(e)}>
					<option value='asc'>A-Z</option>
					<option value='desc'>Z-A</option>
				</select>
				<select onChange={(e) => handleOrderRating(e)}>
					<option value='asc'>Ascendente</option>
					<option value='desc'>Descendente</option>
				</select>
				<select onChange={(e) => handleFilterGenre(e)}>
					<option value='All'>Todos</option>
					{allGenres?.map((e) => (
						<option key={e} value={e}>
							{e}
						</option>
					))}
				</select>
				<select onChange={(e) => handleFilterCreated(e)}>
					<option value='All'>Todos</option>
					<option value='created'>Creados</option>
					<option value='api'>Existente</option>
				</select>

				{/* <button
					onClick={(e) => {
						handleClick(e);
					}}>
					Volver a cargar
				</button> */}
			</div>
			<div>
				<Paginado
					videogamesPerPage={gamesPerPage}
					allVideogames={allVideogames.length}
					paginado={paginate}
				/>
			</div>

			<div className={s.cads}>
				{currentGames &&
					currentGames.map((game) => {
						return (
							<Car
								key={game.id}
								id={game.id}
								name={game.name}
								background_image={game.background_image}
								genres={game.genres}
							/>
						);
					})}
				,
			</div>
		</div>
	);
}
