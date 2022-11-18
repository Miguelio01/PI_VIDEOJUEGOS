import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGenres, postVideogame } from '../../redux/actions/index.js';
import s from './CreateForm.module.css';
import image from '../../assets/BG-02.png';
import logo from '../../assets/Logo.png';

// function validate(input) {
// 	let errors = {};

// 	errors.button = false;
// 	if (input.name || input.name === '') {
// 		errors.name = 'Debes ingresar el nombre del Videojuego';
// 		errors.button = true;
// 	}
// 	return errors;
// }

// function validate(input) {
// 	let errors = {};
// 	input.name ? (errors.name = '') : (errors.name = 'Debe nombrar el juego');
// 	input.description
// 		? (errors.description = '')
// 		: (errors.description = 'Debe proporcionar un descripción');
// 	input.released
// 		? (errors.released = '')
// 		: (errors.released = 'Debes proporcionar una fecha');
// 	input.platforms === 0
// 		? (errors.platforms = 'Debes seleccionar al menos una plataforma')
// 		: (errors.platforms = '');
// 	input.genres === 0
// 		? (errors.genres = 'Debes seleccionar almenos uno de los generos')
// 		: (errors.genres = '');

// 	if (!input.rating) {
// 		errors.rating = 'You must provide a healthScore';
// 	} else if (input.rating > 5 || input.rating < 0) {
// 		errors.rating = 'The range must be between 1 and 100';
// 	}
// 	const imgValidate = /(https?:\/\/.*\.(?:png|jpg))/;
// 	if (!input.background_image || !imgValidate.test(input.background_image)) {
// 		errors.background_image = 'Insertar URL valida de la imagen';
// 	} else {
// 		errors.background_image = '';
// 	}

// return errors;
// }
export default function CreateForm() {
	const dispatch = useDispatch();
	const genres = useSelector((state) => state.genres);

	const allPlatforms = [
		'PC',
		'Mac',
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
		'SEGA',
		'Dreamcast',
		'3Ds',
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

	const handleSelect = (e) => {};

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
			<div className={s.logo}>
				<img className={s.logo} src={logo} alt='' />
			</div>
			<div className={s.crea}>
				<form className={s.form} onSubmit={handleSubmit}>
					<h2>Crear VideoJuego!</h2>
					<div className={s.orden1}>
						<div className={s.orden2}>
							<div>
								<label> Nombre:</label>
								<input
									className={s.input}
									type='text'
									placeholder='Nombre del Juego '
									onChange={(e) =>
										setObjeto({ ...objeto, name: e.target.value })
									}
								/>
							</div>
							<br />
							<div>
								<label>Descripcion:</label>
								<textarea
									type='text'
									placeholder='Descripcion del Juego'
									onChange={(e) =>
										setObjeto({ ...objeto, description: e.target.value })
									}
								/>
							</div>
							<br />
						</div>
						<div className={s.orden2}>
							<div>
								<label>Imagen:</label>
								<input
									className={s.input}
									type='text'
									placeholder='URL de la imagen'
									onChange={(e) =>
										setObjeto({ ...objeto, background_image: e.target.value })
									}
								/>
							</div>
							<br />
							<div>
								<label>Fecha de Lanzamiento:</label>
								<input
									className={s.input}
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
									className={s.input}
									type='number'
									placeholder='de 0 a 5'
									onChange={(e) =>
										setObjeto({ ...objeto, rating: e.target.value })
									}
								/>
							</div>
							<br />
						</div>
					</div>

					<div className={s.che}>
						<label>Generos:</label>
						<div className={s.grid}>
							{genres?.map((e) => (
								<div key={e.id}>
									<p key={e} className={s.uno}>
										<input
											type='checkbox'
											name={e}
											value={e}
											onChange={handleGenres}
										/>
										{e}
									</p>
								</div>
							))}
						</div>
					</div>
					<br />
					<div className={s.che}>
						<label>Plataformas:</label>
						<div className={s.grid}>
							{allPlatforms.map((e) => (
								<div key={e.id}>
									<p key={e} className={s.uno}>
										<input
											type='checkbox'
											name={e}
											value={e}
											onChange={handlePlatforms}
										/>
										{e}
									</p>
								</div>
							))}
						</div>
					</div>
					<br />
					<div>
						<button className={s.btnS} type='submit'>
							Agregar
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
