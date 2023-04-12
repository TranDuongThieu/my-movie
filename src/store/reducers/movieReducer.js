import actionTypes from "../actions/actionTypes";

const initialState = {
    all_movies: [],
    popular_movies: [],
    upcoming_movies: [],
};
const movieReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ALL_MOVIES:
            return { ...state, all_movies: action.data };
        case actionTypes.POPULAR_MOVIES: {
            return { ...state, popular_movies: action.data };
        }
        case actionTypes.UPCOMING_MOVIES:
            return { ...state, upcoming_movies: action.data };
        default:
            return state;
    }
};
export default movieReducer;
