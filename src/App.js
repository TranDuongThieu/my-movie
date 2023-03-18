import { getGenre } from "./apis/home";
import { useEffect, useState } from "react";
import Home from "./Containers/Home";
function App() {
    const [api , setApi] = useState()
    useEffect(() => {
        const fetchApi = async () => {
            const res = await getGenre();
            setApi(res)
        };
        fetchApi();
    }, []);
    console.log(api);
    return <div className="text-red-400"><Home/></div>;
}

export default App;
