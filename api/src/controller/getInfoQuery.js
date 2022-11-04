const axios = require('axios');
const { API_KEY } = process.env;
const { Videogame, Genres } = require('../db');

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
				description: e.description_raw,
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
				description: e.description_raw,
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

module.exports = {
	todoQueryName,
};
