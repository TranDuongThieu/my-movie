import actionTypes from "./actionTypes";

export const setPopularMovies = (data) => ({
    type: actionTypes.POPULAR_MOVIES,
    data,
});
export const setUpcomingMovies = (data) => ({
    type: actionTypes.UPCOMING_MOVIES,
    data,
});
export const setAllMovies = (data) => ({
    type: actionTypes.ALL_MOVIES,
    data,
});