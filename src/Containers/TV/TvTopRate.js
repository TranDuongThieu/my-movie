import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MovieCard from "../../Components/MovieCard";
import { getTopRatedTv } from "../../apis/getTv";
import { setTopRatedTv } from "../../store/actions/tvActions";
import { widthSelector } from "../../store/widthSelector";
import TopbarProgressIndicator from "react-topbar-progress-indicator";

const TvTopRate = () => {
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const dispatch = useDispatch();
    const genreFilter = useSelector((state) =>
        state.filter.genres.map((item) => item.id)
    );
    const [loaded, setLoaded] = useState(true);
    const popularMovies = useSelector((state) => {
        return state.tv.top_rated;
    });
    const movieRemaining =
        genreFilter.length === 0
            ? popularMovies
            : popularMovies?.filter((movie) =>
                  movie.genre_ids.some((id) => genreFilter.includes(id))
              );
    useEffect(() => {
        const fetchAPI = async () => {
            const res = await getTopRatedTv(page);
            if (res?.status === 200) {
                setTotalPage(res.data.total_pages);
                dispatch(
                    setTopRatedTv(popularMovies.concat(res?.data?.results))
                );
            }
        };
        fetchAPI();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        const fetchAPI = async () => {
            setLoaded(false);
            const res = await getTopRatedTv(page);
            if (res?.status === 200) {
                dispatch(
                    setTopRatedTv([...popularMovies.concat(res?.data?.results)])
                );
            }
            setLoaded(true);
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
    const width = useSelector(widthSelector);
    const slides =
        width === 1
            ? "grid-cols-2 "
            : width === 2
            ? "grid-cols-3"
            : width === 3
            ? "grid-cols-4"
            : "grid-cols-6";
    return (
        <div className=" py-7 w-full min-h-screen bg-[#111111]">
            {loaded ? (
                <div className="flex flex-col w-full">
                    <div className={`grid gap-5 flex-1 ${slides}`}>
                        {movieRemaining?.map((item) => (
                            <MovieCard
                                id={item.id}
                                type="tv"
                                typeImg="original"
                                url={item.poster_path}
                                title={item.title || item.name}
                                date={item.first_air_date}
                                rate={item.vote_average}
                                key={item.id + item.title}
                                size="lg"
                            />
                        ))}
                    </div>
                </div>
            ) : (
                <TopbarProgressIndicator />
            )}
        </div>
    );
};

export default TvTopRate;
