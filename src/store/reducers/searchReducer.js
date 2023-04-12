import actionTypes from "../actions/actionTypes";

const initialState = {
    keywords: "",
    search_movies: [],
    search_tv: [],
    search_people: [],
};
export const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_SEARCH_KEYWORDS:
            return { ...state, keywordS: action.data };
        case actionTypes.SET_SEARCH_MOVIES:
            return { ...state, search_movies: action.data };
        case actionTypes.SET_SEARCH_TV:
            return { ...state, search_tv: action.data };
        case actionTypes.SET_SEARCH_PEOPLE:
            return { ...state, search_people: action.data };
        default:
            return state;
    }
};
