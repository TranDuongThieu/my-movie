import actionTypes from "../actions/actionTypes";
const genres = [
    {
        id: 28,
        name: "Action",
    },
    {
        id: 12,
        name: "Adventure",
    },
    {
        id: 16,
        name: "Animation",
    },
    {
        id: 35,
        name: "Comedy",
    },
    {
        id: 80,
        name: "Crime",
    },
    {
        id: 99,
        name: "Documentary",
    },
    {
        id: 18,
        name: "Drama",
    },
    {
        id: 10751,
        name: "Family",
    },
    {
        id: 14,
        name: "Fantasy",
    },
    {
        id: 36,
        name: "History",
    },
    {
        id: 27,
        name: "Horror",
    },
    {
        id: 10402,
        name: "Music",
    },
    {
        id: 9648,
        name: "Mystery",
    },
    {
        id: 10749,
        name: "Romance",
    },
    {
        id: 878,
        name: "Science Fiction",
    },
    {
        id: 10770,
        name: "TV Movie",
    },
    {
        id: 53,
        name: "Thriller",
    },
    {
        id: 10752,
        name: "War",
    },
    {
        id: 37,
        name: "Western",
    },
];
const initialState = {
    genres: genres,
    languages: [],
    trending_movie_day: null,
    trending_movie_week: null,
    trending_tv_day: null,
    trending_tv_week: null,
    tv_on_the_air: null,
    movie_now_playing: null,
    width: '',
};
const homeReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LANGUAGE:
            return { ...state, languages: action.data };
        case actionTypes.TRENDING_MOVIE_DAY:
            return { ...state, trending_movie_day: action.data };
        case actionTypes.TRENDING_MOVIE_WEEK:
            return { ...state, trending_movie_week: action.data };
        case actionTypes.TRENDING_TV_DAY:
            return { ...state, trending_tv_day: action.data };
        case actionTypes.TRENDING_TV_WEEK:
            return { ...state, trending_tv_week: action.data };
        case actionTypes.TV_ON_THE_AIR:
            return { ...state, tv_on_the_air: action.data };
        case actionTypes.MOVIE_NOW_PLAYING:
            return { ...state, movie_now_playing: action.data };
        case actionTypes.SET_CURRENT_WIDTH: {
            return { ...state, width: action.width };
        }
        default:
            return state;
    }
};
export default homeReducer;
