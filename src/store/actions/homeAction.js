import actionTypes from "./actionTypes";

export const setTrendingMovieDay = (data) => ({
    type: actionTypes.TRENDING_MOVIE_DAY,
    data,
});
export const setTrendingTvDay = (data) => ({
    type: actionTypes.TRENDING_TV_DAY,
    data,
});
export const setTrendingTvWeek = (data) => ({
    type: actionTypes.TRENDING_TV_WEEK,
    data,
});
export const setTrendingMovieWeek = (data) => ({
    type: actionTypes.TRENDING_MOVIE_WEEK,
    data,
});
export const setTvOnTheAir = (data) => ({
    type: actionTypes.TV_ON_THE_AIR,
    data,
});
export const setMovieNowPlaying = (data) => ({
    type: actionTypes.MOVIE_NOW_PLAYING,
    data,
});

export const setLanguages = (data) => ({
    type: actionTypes.LANGUAGE,
    data,
});
export const setCurrentWidthAction = (width) => {
    return {
        type: actionTypes.SET_CURRENT_WIDTH,
        width,
    };
};
export const setWidthAction = (width) => {
    return {
        type: actionTypes.SET_WIDTH,
        width,
    };
};
