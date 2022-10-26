import React from 'react';
import s from './Paginado.module.css';

export default function Paginado({ gamesPerPage, allGames, paginado }) {
	const pageNumbers = [];
	for (let i = 1; i <= Math.ceil(allGames / gamesPerPage); i++) {
		pageNumbers.push(i);
	}
	return (
		<nav>
			<div className={s.nav}>
				{pageNumbers &&
					pageNumbers.map((number) => {
						return (
							<ul key={number}>
								<button className={s.pag} onClick={() => paginado(number)}>
									{number}
								</button>
							</ul>
						);
					})}
			</div>
		</nav>
	);
}
