const axios = require('axios');
const { API_KEY } = process.env;
const { Videogame, Genres } = require('../db');

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

module.exports = {
	getAllVideogames,
};
