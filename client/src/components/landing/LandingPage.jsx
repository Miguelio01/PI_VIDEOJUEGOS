import React from 'react';
import { Link } from 'react-router-dom';
import s from './LandingPage.module.css';
import image from '../../assets/BN-Home.png';

export default function LandingPage() {
	return (
		<div className={s.backgraun}>
			<Link to='/home'>
				<div className={s.btn}>
					<img src={image} alt='boton ' />
				</div>
			</Link>
		</div>
	);
}
