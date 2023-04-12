import Home from "./Containers/Home";
import Movie from "./Containers/Movie/Movie";
import { Route, Routes } from "react-router-dom";
import paths from "./utils/path";
import Public from "./Containers/Public";
import { useEffect } from "react";
import {
    getLanguages,
    getMovieNowPlaying,
    getTrending,
    getTvOnAiring,
} from "./apis/home";
import { useDispatch } from "react-redux";
import {
    setCurrentWidthAction,
    setLanguages,
    setMovieNowPlaying,
    setTrendingMovieDay,
    setTrendingMovieWeek,
    setTrendingTvDay,
    setTrendingTvWeek,
    setTvOnTheAir,
} from "./store/actions/homeAction";
import PopularMovie from "./Containers/Movie/PopularMovie";
import { AllMovies, UpcomingMovie } from "./Containers/Movie";
import Search from "./Containers/Search/Search";
import DetailMovie from "./Containers/Movie/DetailMovie";
import AllTv from "./Containers/TV/AllTv";
import TvOnAiring from "./Containers/TV/TvOnAiring";
import TvTopRate from "./Containers/TV/TvTopRate";
import Tv from "./Containers/TV/Tv";
import People from "./Containers/People/People";
import DetailPerson from "./Containers/People/DetailPerson";
import { useState } from "react";
import Loading from "./Components/Loading";
function App() {
    const dispatch = useDispatch();
    const [currentWidth, setCurrentWidth] = useState(window.innerWidth);
    const setWidth = (e) => {
        setCurrentWidth(e.target.innerWidth);
    };
    useEffect(() => {
        window.addEventListener("resize", setWidth);
        return () => {
            window.removeEventListener("resize", setWidth);
        };
    });
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        dispatch(
            setCurrentWidthAction(
                currentWidth <= 480
                    ? 1
                    : currentWidth < 768
                    ? 2
                    : currentWidth < 992
                    ? 3
                    : 4
            )
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentWidth]);
    useEffect(() => {
        const fetchData = async () => {
            setLoaded(false);
            const movie_day = await getTrending("movie", "day");
            const movie_week = await getTrending("movie", "week");
            const tv_day = await getTrending("tv", "day");
            const tv_week = await getTrending("tv", "week");
            const tv_airing_today = await getTvOnAiring();
            const movie_now_playing = await getMovieNowPlaying();
            const languages = await getLanguages();
            if (movie_day.status === 200)
                dispatch(setTrendingMovieDay(movie_day?.data));
            if (movie_week.status === 200)
                dispatch(setTrendingMovieWeek(movie_week?.data));
            if (tv_day.status === 200) dispatch(setTrendingTvDay(tv_day?.data));
            if (tv_week.status === 200)
                dispatch(setTrendingTvWeek(tv_week?.data));
            if (tv_airing_today.status === 200)
                dispatch(setTvOnTheAir(tv_airing_today?.data));
            if (movie_now_playing.status === 200)
                dispatch(setMovieNowPlaying(movie_now_playing?.data));
            if (languages.status === 200)
                dispatch(setLanguages(languages.data));
            setLoaded(true);
        };

        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    console.log(loaded);
    return (
        <div>
            {loaded ? (
                <Routes>
                    <Route path={paths.PUBLIC} element={<Public />}>
                        <Route path={paths.HOME} element={<Home />}></Route>
                        <Route path={paths.MOVIE} element={<Movie />}>
                            <Route
                                path={paths.POPULAR}
                                element={<PopularMovie />}
                            />
                            <Route path={paths.ALL} element={<AllMovies />} />
                            <Route
                                path={paths.UP_COMING}
                                element={<UpcomingMovie />}
                            />
                        </Route>
                        <Route
                            path={paths.DETAIL_MOVIE}
                            element={<DetailMovie />}
                        />
                        <Route
                            path={paths.DETAIL_TV}
                            element={<DetailMovie />}
                        />
                        <Route
                            path={paths.DETAIL_PERSON}
                            element={<DetailPerson />}
                        />
                        <Route path={paths.TV} element={<Tv />}>
                            <Route path={paths.ALL} element={<AllTv />} />
                            <Route
                                path={paths.AIRING_TODAY}
                                element={<TvOnAiring />}
                            />
                            <Route
                                path={paths.TOP_RATED}
                                element={<TvTopRate />}
                            />
                        </Route>
                        <Route path={paths.PEOPLE} element={<People />}></Route>
                        <Route path={paths.SEARCH} element={<Search />}></Route>
                    </Route>
                </Routes>
            ) : (
                <Loading />
            )}
        </div>
    );
}

export default App;
