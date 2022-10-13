const { Router } = require('express');
require('dotenv').config();
const { API_KEY } = process.env;
const axios = require('axios');
const { Videogame, Genres } = require('../db.js');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
// Configuracion get all videogames
const getApiInfo = async () => {
	let videoArr = [];
	let urlApi = `https://api.rawg.io/api/games?key=${API_KEY}`;

	try {
		for (let i = 0; i < 5; i++) {
			const urlData = await axios.get(urlApi);
			urlData.data.results.map((e) => {
				videoArr.push({
					id: e.id,
					name: e.name,
					image: e.background_image,
					released: e.released,
					rating: e.rating,
					platforms: e.platforms.map((e) => e.platform.name),
					genres: e.genres.map((e) => e.name),
				});
			});
			urlApi = urlData.data.next;
		}
		return videoArr;
	} catch (error) {
		console.log(error);
	}
};

//Configuracion get DataBase

const getDbInfo = async () => {
	const ArrGame = await Videogame.findAll({
		include: {
			model: Genres,
			attributes: ['name'],
			through: {
				attributes: [],
			},
		},
	});

	const arrGameLimpio = await ArrGame.map((e) => {
		return {
			id: e.id,
			name: e.name,
			background_image: e.background_image,
			released: e.released,
			rating: e.rating,
			platforms: e.platforms,
			createdInDb: e.createdInDb,
			genres: e.genres.map((el) => el.name),
		};
	});

	return arrGameLimpio;
};

/**
 * GetAllVideogames() devuelve una promesa que se resuelve en una matriz de objetos de videojuegos.
 * @returns Una matriz de objetos.
 */
const getAllVideogames = async () => {
	const apiInfo = await getApiInfo();
	const dbInfo = await getDbInfo();
	const allInfo = apiInfo.concat(dbInfo);
	return allInfo;
};

// Configuracion de busqueda por nombre
const apiName = async (name) => {
	try {
		const queryApi = await axios.gte(
			`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`,
		);
		const queryApiData = await queryApi.data.results;
		const queryApiLimpia = queryApiData.map((e) => {
			return {
				id: e.id,
				name: e.name,
				background_image: e.background_image,
				description: e.description,
				released: e.released,
				rating: e.rating,
				platforms: e.platforms.map((e) => e.platform.name),
				genres: e.genres.map((e) => e.name),
			};
		});
	} catch (error) {
		console.log(error);
	}
};

// Configiracion por nombre en base de datos
const dbQuery = async (name) => {
	try {
		const nameGame = await Videogame.findAll({
			where: {
				name: name,
			},
			include: {
				model: Genres,
				attributes: ['name'],
				through: {
					attributes: [],
				},
			},
		});
		const nameGameDetail = await nameGame.map((e) => {
			return {
				id: e.id,
				name: e.name,
				background_image: e.background_image,
				description: e.description,
				released: e.released,
				rating: e.rating,
				platforms: e.platforms,
				createdInDb: e.createdInDb,
				genres: e.genres.map((el) => el.name),
			};
		});
		return nameGameDetail;
	} catch (error) {
		console.log(error);
	}
};

const allQueryN = async (name) => {
	const apiN = await apiName(name);
	const dbQ = await dbQuery(name);
	const allQuery = apiN.concat(dbQ);
	return allQuery;
};
// Configurar los routers videojuegos

router.get('/videogames', async (req, res) => {
	const { name } = req.query;
	console.log(name);

	const allGames = await getAllVideogames();

	if (name) {
		const totalGames = await allQueryN(name);
		totalGames.length
			? res.send(totalGames.slice(0, 20))
			: res.status(404).send('No se encontraron juegos con ese nombre');
		return;
	} else {
		res.status(200).send(allGames);
		return;
	}
});

// Configuracion de busqueda por id
const apiID = async (id) => {
	try {
		const idApi = await axios.get(
			`https://api.rawg.io/api/games/${id}?key=${API_KEY}`,
		);
		const idApiData = await idApi.data;
		const idApiLimpia = {
			id: idApiData.id,
			name: idApiData.name,
			background_image: idApiData.background_image,
			description: idApiData.description,
			released: idApiData.released,
			rating: idApiData.rating,
			platforms: idApiData.platforms.map((e) => e.platform.name),
			genres: idApiData.genres.map((e) => e.name),
		};
		return idApiLimpia;
	} catch (error) {
		console.log(error);
	}
};

// Configuracion de busqueda por id en base de datos
const dbID = async (id) => {
	try {
		const dbGames = await Videogame.findByPK(id, { include: Genres });
		return {
			id: dbGames.id,
			name: dbGames.name,
			background_image: dbGames.background_image,
			description: dbGames.description,
			released: dbGames.released,
			rating: dbGames.rating,
			platforms: dbGames.platforms,
			createdInDb: dbGames.createdInDb,
			genres: dbGames.genres.map((el) => el.name),
		};
	} catch (error) {
		console.log(error);
	}
};

const allGameId = async (id) => {
	const uuId = id.include('-');
	if (uuId) {
		const dbIdInfi = await dbID(id);
		return dbIdInfi;
	} else {
		const apiIdInfo = await apiID(id);
		return apiIdInfo;
	}
};

router.get('/videogames/:id', async (req, res) => {
	const { id } = req.params;
	const allId = await allGameId(id);
	allId
		? res.send(allId)
		: res.status(404).send('No se encontraron juegos con ese id');
});

// Configuracion de generos de videojuegos
const allGenre = async () => {
	const genreDb = await Genres.findAll({
		attributes: {
			exclude: ['createdAt', 'updatedAt'],
		},
	});
	if (!genreDb.length) {
		try {
			const genreApi = await axios.get(
				`https://api.rawg.io/api/genres?key=${API_KEY}`,
			);
			const genreData = await genreApi.data.results;
			const genreLimpia = await genreData.map((e) => e.name);
			genreLimpia.map(
				async (e) =>
					await Genres.findOrCreate({
						where: {
							name: e,
						},
					}),
			);
			return genreLimpia;
		} catch (error) {
			console.log(error);
		}
	}
};

router.get('/genres', async (req, res) => {
	const allGenreInfo = await allGenre();
	res.send(allGenreInfo);
});

// Configuracion de creacion de videojuegos

router.post('/videogame', async (req, res) => {
	const {
		name,
		description,
		released,
		rating,
		platforms,
		genres,
		createdInDb,
		background_image,
	} = req.body;

	const newGame = await Videogame.create({
		name,
		description,
		released,
		rating,
		platforms,
		createdInDb,
		background_image,
	});

	let genreDb = await Genres.findAll({
		where: {
			name: genres,
		},
	});
	newGame.addGenres(genreDb);
	res.send('Juego creado');
});

module.exports = router;
