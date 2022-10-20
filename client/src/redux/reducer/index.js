import {
	GET_VIDEOGAMES,
	GET_GENRES,
	POST_VIDEOGAME,
	GET_DETAIL,
	GET_VIDEOGAMES_BY_NAME,
	FILTER_BY_GENRE,
	FILTER_BY_CREATED,
	ORDER_BY_RATING,
	ORDER_BY_NAME,
} from '../actions/index';

const initialState = {
	videogames: [],
	allVideogames: [],
	genres: [],
	detail: [],
};

function rootReducer(state = initialState, action) {
	switch (action.type) {
		case GET_VIDEOGAMES:
			return {
				...state,
				videogames: action.payload,
				allVideogames: action.payload,
			};
		case GET_GENRES:
			return {
				...state,
				genres: action.payload,
			};
		case POST_VIDEOGAME:
			return {
				...state,
				videogames: [...state.videogames, action.payload],
			};
		case GET_DETAIL:
			return {
				...state,
				detail: action.payload,
			};
		case GET_VIDEOGAMES_BY_NAME:
			return {
				...state,
				videogames: action.payload,
			};
		case FILTER_BY_GENRE:
			const allVideogamesGenres = state.allVideogames;
			const genresFilter =
				action.payload === 'All'
					? allVideogamesGenres
					: allVideogamesGenres.filter((v) => v.genres.include(action.payload));
			return {
				...state,
				videogames: genresFilter,
			};
		case FILTER_BY_CREATED:
			const allVideogamesCreated = state.allVideogames;
			const createdFilter =
				action.payload === 'created'
					? allVideogamesCreated.filter((v) => v.createdInDb)
					: allVideogamesCreated.filter((v) => !v.createdInDb);
			return {
				...state,
				videogames:
					action.payload === 'All' ? state.allVideogames : createdFilter,
			};
		case ORDER_BY_NAME:
			let sortArray =
				action.payload === 'asc'
					? state.videogames.sort((a, b) => a.name.localeCompare(b.name))
					: state.videogames.sort((a, b) => b.name.localeCompare(a.name));
			return {
				...state,
				videogames: sortArray,
			};
		case ORDER_BY_RATING:
			let sortArrayRating =
				action.payload === 'asc'
					? state.videogames.sort((a, b) => a.rating - b.rating)
					: state.videogames.sort((a, b) => b.rating - a.rating);
			return {
				...state,
				videogames: sortArrayRating,
			};
		default:
			return state;
	}
}

export default rootReducer;
