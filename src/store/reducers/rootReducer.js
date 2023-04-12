import { combineReducers } from "redux";
import filterReducer from "./filterReducer";
import homeReducer from "./homeReducer";
import movieReducer from "./movieReducer";
import { searchReducer } from "./searchReducer";
import { tvReducer } from "./tvReducer";
const rootReducer = combineReducers({
    home: homeReducer,
    movies: movieReducer,
    filter: filterReducer,
    search: searchReducer,
    tv:tvReducer,
});
export default rootReducer;
