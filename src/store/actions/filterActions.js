import actionTypes from "./actionTypes";

export const setGenreFilter = (data) => ({
    type: actionTypes.GENRE_FILTER,
    data,
});
