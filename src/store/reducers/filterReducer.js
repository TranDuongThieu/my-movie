import actionTypes from "../actions/actionTypes";

const initialState = {
    genres: [],
};
const filterReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GENRE_FILTER:
            return { ...state, genres: action.data };
        default:
            return state;
    }
};
export default filterReducer;