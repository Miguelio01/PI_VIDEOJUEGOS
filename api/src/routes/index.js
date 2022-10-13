const { Router } = require('express');
require('dotenv').config();
const { API_KEY } = process.env;
const axios = require('axios');
const { Videogame, Genre } = require('../db.js');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

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
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
