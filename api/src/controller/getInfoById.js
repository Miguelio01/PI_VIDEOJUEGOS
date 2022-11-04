const axios = require('axios');
const { API_KEY } = process.env;
const { Videogame, Genres } = require('../db');
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
			description: idApiData.description_raw,
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
			description: dbGame.description_raw,
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

module.exports = {
	AllGamesById,
};
