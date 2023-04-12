import actionTypes from "./actionTypes";

export const setAllTv = (data) => ({
    type: actionTypes.ALL_TV,
    data,
});
export const setAiringTv = (data) => ({
    type: actionTypes.TV_AIRING_TODAY,
    data,
});
export const setTopRatedTv = (data) => ({
    type: actionTypes.TV_TOP_RATED,
    data,
});