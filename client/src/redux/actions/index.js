import axios from 'axios';

export const GET_VIDEOGAMES = 'GET_VIDEOGAMES';
export const GET_GENRES = 'GET_GENRES';
export const POST_VIDEOGAME = 'POST_VIDEOGAME';
export const GET_DETAIL = 'GET_DETAIL';
export const GET_VIDEOGAMES_BY_NAME = 'GET_VIDEOGAMES_BY_NAME';
export const FILTER_BY_GENRE = 'FILTER_BY_GENRE';
export const FILTER_BY_CREATED = 'FILTER_BY_CREATED';
export const ORDER_BY_RATING = 'ORDER_BY_RATING';
export const ORDER_BY_NAME = 'ORDER_BY_NAME';
export const ORDER_BY_YEAR = 'ORDER_BY_YEAR';
export const CLEAN_DATA = 'CLEAN_DATA';

//GET VIDEOGAMES
export function getVideogames() {
	return async function (dispatch) {
		try {
			const json = await axios.get('http://localhost:3001/videogames');
			return dispatch({
				type: GET_VIDEOGAMES,
				payload: json.data,
			});
		} catch (error) {
			console.log(error);
		}
	};
}

//GET GENRES
export function getGenres() {
	return async function (dispatch) {
		try {
			const json = await axios.get('http://localhost:3001/genres');
			return dispatch({
				type: GET_GENRES,
				payload: json.data,
			});
		} catch (error) {
			console.log(error);
		}
	};
}

//POST VIDEOGAME
export function postVideogame(payload) {
	return async function (dispatch) {
		try {
			const json = await axios.post('http://localhost:3001/videogame', payload);
			return dispatch({
				type: POST_VIDEOGAME,
				payload: json.data,
			});
		} catch (error) {
			console.log(error);
		}
	};
}

//GET DETAIL
export function getDetail(payload) {
	return async function (dispatch) {
		try {
			const json = await axios.get(
				`http://localhost:3001/videogame/` + payload,
			);
			return dispatch({
				type: GET_DETAIL,
				payload: json.data,
			});
		} catch (error) {
			console.log(error);
		}
	};
}

//GET VIDEOGAMES BY NAME
export function getVideogamesByName(payload) {
	return async function (dispatch) {
		try {
			const json = await axios.get(
				`http://localhost:3001/videogames?name=` + payload,
			);
			return dispatch({
				type: GET_VIDEOGAMES_BY_NAME,
				payload: json.data,
			});
		} catch (error) {
			console.log(error);
		}
	};
}

//FILTER BY GENRE
export function filterByGenre(payload) {
	return {
		type: FILTER_BY_GENRE,
		payload,
	};
}

//FILTER BY CREATED
export function filterByCreated(payload) {
	return {
		type: FILTER_BY_CREATED,
		payload,
	};
}

//ORDER BY RATING
export function orderByRating(payload) {
	return {
		type: ORDER_BY_RATING,
		payload,
	};
}

//ORDER BY NAME
export function orderByName(payload) {
	return {
		type: ORDER_BY_NAME,
		payload,
	};
}

//ORDER by

export function orderByYear(payload) {
	return {
		type: ORDER_BY_YEAR,
		payload,
	};
}

//CLEAN DATA
export function cleanData() {
	return function (dispatch) {
		dispatch({
			type: CLEAN_DATA,
			payload: {},
		});
	};
}
