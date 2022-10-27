import React from 'react';
import s from './Paginado.module.css';

export default function Pagination({
	gamesPerPage,
	allGames,
	paginado,
	netPrePage,
	backPrePage,
}) {
	const pageNumbers = [];

	for (let i = 1; i <= Math.ceil(allGames / gamesPerPage); i++) {
		pageNumbers.push(i);
	}
	return (
		<nav className={s.nav}>
			<div className={s.pagination}>
				<button onClick={backPrePage} className={s.btn}>
					Prev
				</button>
				{pageNumbers &&
					pageNumbers.map((number) => {
						return (
							<ul key={number}>
								<button className={s.number} onClick={() => paginado(number)}>
									{number}
								</button>
							</ul>
						);
					})}
				<button onClick={netPrePage} className={s.btn}>
					Next
				</button>
			</div>
		</nav>
	);
}
