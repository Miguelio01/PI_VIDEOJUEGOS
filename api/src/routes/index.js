require('dotenv').config();
const { API_KEY } = process.env;
const { Router } = require('express');
const axios = require('axios');
const { Videogame, Genres } = require('../db');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//creo una funcion async, todas las func async devuelven promesas
//VIDEOGAMES
const getApiInfo = async () => {
	let videogamesArr = [];
	let urlApi = `https://api.rawg.io/api/games?key=${API_KEY}`;
	try {
		for (let i = 0; i < 5; i++) {
			const urlData = await axios.get(urlApi); //prometo darte los juegos, los juegos son muchos objetos
			urlData.data.results //aca guardo la respuesta de results (results es un array con esos objetos)que son los objetos de videojuegos
				.map((e) => {
					//le paso un map para q me pase un nuevo array solo con esas propiedades
					videogamesArr.push({
						id: e.id,
						name: e.name,
						background_image: e.background_image,
						released: e.released,
						rating: e.rating,
						platforms: e.platforms.map((e) => e.platform.name),
						genres: e.genres.map((e) => e.name),
					});
				});
			urlApi = urlData.data.next;
			//  console.log(arrLimpio);
		}
		return videogamesArr; //retorno ese array nuevo ya pasado en limpio
	} catch (error) {
		console.log(error); //por si me salta algun error
	}
};

const getDbInfo = async () => {
	//traigo todos los juegos que haya en mi db con su relacion generos
	const arrGames = await Videogame.findAll({
		include: {
			model: Genres,
			attributes: ['name'],
			through: {
				attributes: [],
			},
		},
	});
	const arrGamesLimpios = await arrGames.map((e) => {
		//le paso un map para q me pase un nuevo array solo con esas propiedades
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
	return arrGamesLimpios;
};

const getAllVideogames = async () => {
	//concateno las 2 la api y la de db en una sola funcion q voy a llamar cuando quiera todosm los juegos
	const apiInfo = await getApiInfo();
	const dbInfo = await getDbInfo();
	const infoTotal = apiInfo.concat(dbInfo);
	return infoTotal;
};
//VIDEOGAMES QUERY
const apiName = async (name) => {
	try {
		const queryApi = await axios.get(
			`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`,
		);
		const queryApiData = await queryApi.data.results;
		const queryApiLimpia = queryApiData.map((e) => {
			return {
				id: e.id,
				background_image: e.background_image,
				name: e.name,
				description: e.description,
				released: e.released,
				rating: e.rating,
				platforms: e.platforms.map((e) => e.platform.name),
				genres: e.genres.map((e) => e.name),
			};
		});
		//console.log(queryApiLimpia);
		return queryApiLimpia;
	} catch (error) {
		console.log(error);
	}
};

const dbQuery = async (name) => {
	try {
		const nombreGame = await Videogame.findAll({
			//busco en todos los juegos de mi db los que cumplan con la condicion where, o sea q coincida el nombre
			where: { name: name },
			include: {
				model: Genres,
				attributes: ['name'],
				through: {
					attributes: [],
				},
			},
		});
		const nombreGameDetalle = nombreGame.map((e) => {
			return {
				id: e.id,
				background_image: e.background_image,
				name: e.name,
				description: e.description,
				released: e.released,
				rating: e.rating,
				platforms: e.platforms,
				genres: e.genres.map((el) => el.name),
			};
		});
		// console.log(nombreGameDetalle);
		return nombreGameDetalle;
	} catch (error) {
		console.log(error);
	}
};

const todoQueryName = async (name) => {
	const apiInfoQ = await apiName(name);
	const dbInfoQ = await dbQuery(name);
	const todosQuery = dbInfoQ.concat(apiInfoQ);
	return todosQuery;
};
//RUTA DOBLE DE VIDEOGAMES
router.get('/videogames', async (req, res) => {
	const { name } = req.query;
	// console.log(name);
	const todosGam = await getAllVideogames(); //creo por fuera la const para llamarla si no me pasan name en el else abajo de todo
	if (name) {
		const videogamesTotal = await todoQueryName(name);
		videogamesTotal.length //si mi funcion concatenada de api y db tenia coincidencias o sea elementos
			? res.send(videogamesTotal.slice(0, 15)) //solo los primeros 15
			: res.status(404).send('this game does not exist'); //sino msj adecuado
		return;
	} else {
		res.status(200).send(todosGam);
		return;
	}
});

//ID
//funcion que me traiga los videojuegos y su relacion generos

const apiId = async (id) => {
	//obtiene ID de la api
	try {
		const idApi = await axios.get(
			`https://api.rawg.io/api/games/${id}?key=${API_KEY}`,
		);
		const idApiData = await idApi.data; //me trae directamente el objeto, le pido que me traiga especificamente esto
		const idDataLimpia = {
			id: idApiData.id,
			background_image: idApiData.background_image,
			name: idApiData.name,
			description: idApiData.description,
			released: idApiData.released,
			rating: idApiData.rating,
			platforms: idApiData.platforms.map((e) => e.platform.name),
			genres: idApiData.genres.map((e) => e.name),
		};
		//console.log(idDataLimpia);
		return idDataLimpia;
	} catch (error) {
		console.log(error);
	}
};

//obtiene id de la db

const dbId = async (id) => {
	try {
		const dbGame = await Videogame.findByPk(id, { include: Genres }); //que busque el que coincida con ese id que me pasan con pk lo hago
		return {
			id: dbGame.id,
			background_image: dbGame.background_image,
			name: dbGame.name,
			description: dbGame.description,
			released: dbGame.released,
			rating: dbGame.rating,
			platforms: dbGame.platforms,
			genres: dbGame.genres.map((e) => e.name),
		};
	} catch (error) {
		console.log(error);
	}
};

const AllGamesById = async (id) => {
	//aclarar lo de incluir guion para no romper la funcion de la API
	//hacer un if
	const uuId = id.includes('-'); //hago una constante para validar el uuid
	if (uuId) {
		//si me pasan id con guiones entonces busca en bse de datos
		const dbIdInfo = await dbId(id);
		return dbIdInfo; //si esta ahi retornalo
	} else {
		//si no tiene guiones busca en api
		const apiIdInfo = await apiId(id);
		return apiIdInfo;
	}
};

router.get('/videogame/:id', async (req, res) => {
	const { id } = req.params;
	const gamesIdApi = await AllGamesById(id);

	gamesIdApi ? res.send(gamesIdApi) : res.send('This game does not exist');
	return;
});
//cuando meto if else en ruta poner return xq sino sigue corriendo

//GENEROS
const genreTotal = async () => {
	const genrDb = await Genres.findAll({
		attributes: {
			exclude: ['createdAt', 'updatedAt'],
		},
	});

	if (!genrDb.length) {
		try {
			const genresApi = await axios.get(
				`https://api.rawg.io/api/genres?key=${API_KEY}`,
			);
			const genreData = await genresApi.data.results;
			// console.log(genreData);
			const genreLimpio = genreData.map((e) => e.name);
			// console.log(genreLimpio);

			genreLimpio.map(
				async (e) =>
					await Genres.findOrCreate({
						//si lo encuentra no lo crea
						where: {
							name: e,
						},
					}),
			);
			return genreLimpio;
		} catch (error) {
			console.log(error);
		}
	} else {
		return genrDb.map((e) => e.name); //que solo me devuelva el nombre
	}
};

router.get('/genres', async (req, res) => {
	const todosGenr = await genreTotal();
	res.send(todosGenr);
});

//POST
router.post('/videogame', async (req, res) => {
	const {
		name,
		description,
		released,
		rating,
		background_image,
		genres,
		platforms,
		createdInDb,
	} = req.body;
	//console.log(req.body);

	const videogameCreated = await Videogame.create({
		//aca si uso directamente el create
		name,
		description,
		released,
		rating,
		background_image,
		platforms, //hacer que entre en un array directo aunque sea 1 solo juego
		createdInDb,
	});

	let genreDb = await Genres.findAll({
		//generos lo paso x separado porque lo tengo en mi db
		where: {
			name: genres,
		},
	});
	videogameCreated.addGenres(genreDb);
	res.send('successfully created video game');
});

module.exports = router;
