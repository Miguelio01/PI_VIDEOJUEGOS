import React from 'react';
import { Link } from 'react-router-dom';
import s from './Car.module.css';

export default function Car({ id, background_image, name, genres }) {
	return (
		<div className={s.card}>
			<div className={s.img}>
				<img src={background_image} alt='' height='100px' />
			</div>
			<div className={s.info}>
				<h3>{name}</h3>
				<p>{genres}</p>
				<Link to={`/videogame/${id}`}>Ver más</Link>
			</div>
		</div>
	);
}
