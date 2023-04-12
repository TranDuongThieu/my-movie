import actionTypes from "./actionTypes";

export const setSearchKeyWords = (data) => ({
    type: actionTypes.SET_SEARCH_KEYWORDS,
    data,
});
export const setSearchMovies = (data) => ({
    type: actionTypes.SET_SEARCH_MOVIES,
    data,
});
export const setSearchTv = (data) => ({
    type: actionTypes.SET_SEARCH_TV,
    data,
});
export const setSearchPeople = (data) => ({
    type: actionTypes.SET_SEARCH_PEOPLE,
    data,
});