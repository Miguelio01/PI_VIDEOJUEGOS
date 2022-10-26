import React from 'react';
import s from './NotFound.module.css';
import image from '../../assets/404 error-01.jpg';

export default function NotFound() {
	return (
		<div>
			<img className={s.notFound} src={image} alt='' />
		</div>
	);
}
