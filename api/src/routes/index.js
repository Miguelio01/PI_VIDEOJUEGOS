require('dotenv').config();
const { Router } = require('express');
const { Videogame, Genres } = require('../db');
const { getAllVideogames } = require('../controller/getAllInfo');
const { genreTotal } = require('../controller/getGeneres');
const { AllGamesById } = require('../controller/getInfoById');
const { todoQueryName } = require('../controller/getInfoQuery');

const router = Router();

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

router.get('/videogame/:id', async (req, res) => {
	const { id } = req.params;
	const gamesIdApi = await AllGamesById(id);

	gamesIdApi ? res.send(gamesIdApi) : res.send('This game does not exist');
	return;
});
//cuando meto if else en ruta poner return xq sino sigue corriendo

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
