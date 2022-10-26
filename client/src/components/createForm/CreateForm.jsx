import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGenres, postVideogame } from '../../redux/actions/index.js';
import s from './CreateForm.module.css';
import image from '../../assets/BG-02.png';

export default function CreateForm() {
	const dispatch = useDispatch();
	const genres = useSelector((state) => state.genres);

	const allPlatforms = [
		'PC',
		'PlayStation',
		'Xbox',
		'Nintendo Switch',
		'iOS',
		'Android',
		'PS Vita',
		'PSP',
		'Wii',
		'GameCube',
		'Game Boy',
		'SNES',
		'NES',
		'Commodore',
		'Atari',
		'Genesis',
		' SEGA',
		'Dreamcast',
		'3DO',
		'Jaguar',
		'Game Gear',
		'Neo Geo',
	];

	useEffect(() => {
		dispatch(getGenres());
	}, [dispatch]);

	const [objeto, setObjeto] = useState({
		name: '',
		description: '',
		released: '',
		rating: '',
		platforms: [],
		genres: [],
		background_image: '',
	});

	const handlePlatforms = (e) => {
		if (e.target.checked) {
			setObjeto({
				...objeto,
				platforms: [...objeto.platforms, e.target.value],
			});
		}
		if (!e.target.checked) {
			setObjeto({
				...objeto,
				platforms: objeto.platforms.filter((p) => p !== e.target.value),
			});
		}
	};

	const handleGenres = (e) => {
		if (e.target.checked) {
			setObjeto({
				...objeto,
				genres: [...objeto.genres, e.target.value],
			});
		}
		if (!e.target.checked) {
			setObjeto({
				...objeto,
				genres: objeto.genres.filter((el) => e.target.value !== el),
			});
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!objeto.name) return alert('El nombre es obligatorio');
		if (!objeto.description)
			return alert('El campo descripcion es obligatorio');
		if (!objeto.released)
			return alert('El campo fecha de lanzamiento es obligatorio');
		if (!objeto.background_image)
			return alert('La imagen es un campo obligatorio');
		if (!objeto.genres.length)
			return alert('Debes seleccionar al menos una categoria');
		if (!objeto.platforms.length)
			return alert('Debes seleccionar al menos una plataforma');
		if (!objeto.rating || objeto.rating < 0 || objeto.rating > 5)
			return alert(
				'El campo rating es obligatorio y debe ser mayor a 0 y menor a 5',
			);

		dispatch(postVideogame(objeto));
		alert('Videojuego Agregado Exitosamente!');
	};

	return (
		<div className={s.conten}>
			<img className={s.image} src={image} alt='' />

			<h1>Crear VideoJuego!</h1>

			<form onSubmit={handleSubmit}>
				<div className={s.form}>
					<div>
						<label> Nombre:</label>
						<input
							type='text'
							onChange={(e) => setObjeto({ ...objeto, name: e.target.value })}
						/>
					</div>
					<br />
					<div>
						<label>Descripcion:</label>
						<input
							type='text'
							onChange={(e) =>
								setObjeto({ ...objeto, description: e.target.value })
							}
						/>
					</div>
					<br />
					<div>
						<label>Imagen:</label>
						<input
							type='text'
							onChange={(e) =>
								setObjeto({ ...objeto, background_image: e.target.value })
							}
						/>
					</div>
					<br />
					<div>
						<label>Fecha de Lanzamiento:</label>
						<input
							type='date'
							onChange={(e) =>
								setObjeto({ ...objeto, released: e.target.value })
							}
						/>
					</div>
					<br />
					<div>
						<label>Rating:</label>
						<input
							type='number'
							onChange={(e) => setObjeto({ ...objeto, rating: e.target.value })}
						/>
					</div>
					<br />
					<div>
						<label>Generos:</label>
						{genres?.map((e) => (
							<label key={e}>
								<input
									type='checkbox'
									name={e}
									value={e}
									onChange={handleGenres}
								/>
								{e}
							</label>
						))}
					</div>
					<br />
					<div>
						<label>Plataformas:</label>
						{allPlatforms.map((e) => (
							<label key={e}>
								<input
									type='checkbox'
									name={e}
									value={e}
									onChange={handlePlatforms}
								/>
								{e}
							</label>
						))}
					</div>
					<br />
					<div>
						<button type='submit'>Agregar Videojuego!</button>
					</div>
				</div>
			</form>
		</div>
	);
}
