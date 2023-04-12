import React from "react";
import { useSelector } from "react-redux";
import BackgroundVideo from "../Components/BackgroundVideo";
import Trending from "../Components/Trending";
import Introduce from "../Components/Introduce";
import { widthSelector } from "../store/widthSelector";
import MovieCard from "../Components/MovieCard";
import Movies from "../Components/Movies";
import Loading from "../Components/Loading";

const Home = () => {
    const trendingMovieDay = useSelector(
        (state) => state.home.trending_movie_day
    );
    const trendingMovieWeek = useSelector(
        (state) => state.home.trending_movie_week
    );
    const width = useSelector(widthSelector);

    const tvOnTheAir = useSelector((state) => state.home.tv_on_the_air);

    const trendingTvDay = useSelector((state) => state.home.trending_tv_day);
    const trendingTvWeek = useSelector((state) => state.home.trending_tv_week);
    const nowPlayingMovies = useSelector(
        (state) => state.home.movie_now_playing
    );

    return (
        <div className="relative bg-gradient-to-r from-neutral-600">
            <div className="w-full h-[50.25vw] min-h-[400px] absolute">
                <BackgroundVideo />
            </div>
            <div className="w-full h-[50.25vw] min-h-[400px]"></div>
            <div>
                <Introduce />
            </div>
            <Trending
                title={width > 2 ? "Trending Movies" : "Movies"}
                dayTrending={trendingMovieDay}
                weekTrending={trendingMovieWeek}
            />
            <Trending
                title={width > 2 ? "TV Series" : "TV"}
                dayTrending={trendingTvDay}
                weekTrending={trendingTvWeek}
            />
            <Movies Movies={nowPlayingMovies} title="Watch Now" />
            <Movies Movies={tvOnTheAir} title="Tv On The Air" />
        </div>
    );
};

export default Home;
