import actionTypes from "../actions/actionTypes";

const initialState = {
    all_tv: [],
    airing: [],
    top_rated: [],
};
export const tvReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ALL_TV:
            return { ...state, all_tv: action.data };
        case actionTypes.TV_AIRING_TODAY:
            return {...state, airing: action.data}
        case actionTypes.TV_TOP_RATED:
            return { ...state, top_rated: action.data}
        default:
            return state;
    }
};
