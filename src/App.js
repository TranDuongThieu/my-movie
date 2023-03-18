import Home from "./Containers/Home";
import Movie from "./Containers/Movie";
import { Route, Routes } from "react-router-dom";
import paths from "./utils/path";
import Public from "./Containers/Public";
function App() {
    // const [api , setApi] = useState()
    // useEffect(() => {
    //     const fetchApi = async () => {
    //         const res = await getGenre();
    //         setApi(res)
    //     };
    //     fetchApi();
    // }, []);
    // console.log(api);
    return (
        <div>
            <Routes>
                <Route path={paths.PUBLIC} element={<Public />}>
                    <Route path={paths.HOME} element={<Home />}></Route>
                    <Route path={paths.MOVIE} element={< Movie/>}></Route>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
