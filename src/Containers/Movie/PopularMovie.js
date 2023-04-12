import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPopularMovie } from "../../apis/getMovies";
import MovieCard from "../../Components/MovieCard";
import { setPopularMovies } from "../../store/actions/movieActions";
import { widthSelector } from "../../store/widthSelector";

const PopularMovie = () => {
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const dispatch = useDispatch();
    const genreFilter = useSelector((state) =>
        state.filter.genres.map((item) => item.id)
    );
    // const language = useSelector((state) => state.home.languages);
    const width = useSelector(widthSelector);
    const slides =
        width === 1
            ? "grid-cols-2 "
            : width === 2
            ? "grid-cols-3"
            : width === 3
            ? "grid-cols-4"
            : "grid-cols-6";
    const popularMovies = useSelector((state) => {
        return state.movies.popular_movies;
    });
    const movieRemaining =
        genreFilter.length === 0
            ? popularMovies
            : popularMovies?.filter((movie) =>
                  movie.genre_ids.some((id) => genreFilter.includes(id))
              );
    useEffect(() => {
        const fetchAPI = async () => {
            const res = await getPopularMovie(page);
            if (res?.status === 200) {
                setTotalPage(res.data.total_pages);
                dispatch(
                    setPopularMovies(popularMovies.concat(res?.data?.results))
                );
            }
        };
        fetchAPI();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        const fetchAPI = async () => {
            const res = await getPopularMovie(page);
            if (res?.status === 200) {
                dispatch(
                    setPopularMovies([
                        ...popularMovies.concat(res?.data?.results),
                    ])
                );
            }
        };
        if (page < totalPage) fetchAPI();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    const handleScroll = () => {
        const scrollTop =
            (document.documentElement && document.documentElement.scrollTop) ||
            document.body.scrollTop;

        const scrollHeight =
            (document.documentElement &&
                document.documentElement.scrollHeight) ||
            document.body.scrollHeight;

        const clientHeight =
            document.documentElement.clientHeight || window.innerHeight;

        const scrolledToBottom =
            Math.ceil(scrollTop + clientHeight) >= scrollHeight;

        if (scrolledToBottom) {
            setPage((prev) => prev + 1);
        }
    };
    return (
        <div className=" py-7 w-full min-h-screen bg-[#111111]">
            <div className="flex flex-col w-full">
                <div className={`grid gap-5 flex-1 ${slides}`}>
                    {movieRemaining?.map((item) => (
                        <MovieCard
                            id={item.id}
                            type="movie"
                            typeImg="original"
                            url={item.poster_path}
                            title={item.title}
                            date={item.release_date}
                            rate={item.vote_average}
                            key={item.id + item.title}
                            size="lg"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PopularMovie;
