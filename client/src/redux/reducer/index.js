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
	}
}
