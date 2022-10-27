import React from 'react';
import s from './Paginado.module.css';

export default function pagination({
	allVideogames,
	gamesPerPage,
	paginate,
	nextPage,
	backPage,
}) {
	const pageNumbers = [];

	for (let i = 1; i <= Math.ceil(allVideogames / gamesPerPage); i++) {
		pageNumbers.push(i);
	}
	return (
		<nav className={s.nav}>
			<div className={s.pagination}>
				<button onClick={backPage} className={s.btn}>
					Prev
				</button>
				{pageNumbers &&
					pageNumbers.map((number) => {
						return (
							<ul key={number}>
								<button className={s.pag} onClick={() => paginate(number)}>
									{number}
								</button>
							</ul>
						);
					})}
				<button onClick={nextPage} className={s.btn}>
					Next
				</button>
			</div>
		</nav>
	);
}
