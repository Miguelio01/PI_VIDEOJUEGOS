import React from 'react';
import s from './Paginado.module.css';

export default function pagination({
	allVideogames,
	gamesPerPage,
	paginado,
	page,
}) {
	const pageNumbers = [];
	const numOfPages = Math.ceil(allVideogames / gamesPerPage);

	for (let i = 1; i <= numOfPages; i++) {
		pageNumbers.push(i);
	}
	return (
		<nav className={s.nav}>
			<ul>
				{page === 1 || !numOfPages ? (
					<></>
				) : (
					<li className={s.Paginate}>
						<button
							className={s.ButPaginate}
							key='-1'
							onClick={() => paginado('-')}>
							◄
						</button>
					</li>
				)}
				{pageNumbers &&
					pageNumbers.map((number) => (
						<li className={s.Paginate} key={number}>
							<button
								className={number === page ? s.actual : s.ButPaginate}
								onClick={() => paginado(number)}>
								{number}
							</button>
						</li>
					))}

				{page === numOfPages || !numOfPages ? (
					<></>
				) : (
					<li className={s.Paginate}>
						<button
							className={s.ButPaginate}
							key='+1'
							onClick={() => paginado('+')}>
							►
						</button>
					</li>
				)}
			</ul>
		</nav>
	);
}
