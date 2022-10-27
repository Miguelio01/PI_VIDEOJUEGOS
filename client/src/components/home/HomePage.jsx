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
import Paginado from '../Paginado/Paginado';
import image from '../../assets/BG-02.png';
import Loading from '../loading/Loading';
import NotFound from '../notFound/NotFound';

export default function HomePage() {
	const dispatch = useDispatch();
	const allVideogames = useSelector((state) => state.videogames);
	const allGenres = useSelector((state) => state.genres);
	const [loading, setLoading] = useState(true);

	const [currentPage, setCurrentPage] = useState(1);
	const [setOrden] = useState('');
	const [gamesPerPage] = useState(10);

	const indexOfLastGame = currentPage * gamesPerPage;
	const indexOfFirstGame = indexOfLastGame - gamesPerPage;
	const currentGames = allVideogames?.slice(indexOfFirstGame, indexOfLastGame);

	if (allVideogames.length > 0 && loading) {
		setLoading(false);
	}

	const paginate = (pageNumber) => setCurrentPage(pageNumber);
	const netPrePage = () => setCurrentPage(currentPage + 1);
	const backPrepage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	useEffect(() => {
		dispatch(getGenres());
		dispatch(getVideogames());
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
			<div className={s.filtro}>
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
			</div>
			<div>
				<Paginado
					gamesPerPage={gamesPerPage}
					allVideogames={allVideogames.length}
					paginate={paginate}
					netPrePage={netPrePage}
					backPrepage={backPrepage}
				/>
			</div>

			<div className={s.cads}>
				{currentGames.length > 0 && !loading ? (
					currentGames &&
					currentGames.map((game) => {
						return (
							<div key={game.id}>
								<Car
									key={game.id}
									id={game.id}
									name={game.name}
									background_image={game.background_image}
									genres={game.genres}
								/>
							</div>
						);
					})
				) : !currentGames.length > 0 && loading ? (
					<Loading />
				) : (
					<NotFound />
				)}
				,
			</div>
			<br />

			<div>
				<Paginado
					gamesPerPage={gamesPerPage}
					allVideogames={allVideogames.length}
					paginate={paginate}
					netPrePage={netPrePage}
					backPrepage={backPrepage}
				/>
			</div>
		</div>
	);
}
