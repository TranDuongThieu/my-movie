import rootReducer from './store/reducers/rootReducer'
import { createStore } from "redux";
const reduxConfig = () => {
    const store = createStore(rootReducer)
    return {store};
};
export default reduxConfig;
