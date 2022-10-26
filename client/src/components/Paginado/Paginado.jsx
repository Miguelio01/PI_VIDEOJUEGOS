import React from 'react';
import s from './Paginado.module.css';

export default function Paginado({
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
					back
				</button>
				{pageNumbers &&
					pageNumbers.map((n) => {
						return (
							<ul key={n}>
								<button className={s.btn} onClick={() => paginado(n)}>
									{n}
								</button>
							</ul>
						);
					})}
				<button onClick={netPrePage} className={s.btn}>
					next
				</button>
			</div>
		</nav>
	);
}
