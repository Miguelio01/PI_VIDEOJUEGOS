const axios = require('axios');
const { API_KEY } = process.env;
const { Genres } = require('../db');

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

module.exports = {
	genreTotal,
};
