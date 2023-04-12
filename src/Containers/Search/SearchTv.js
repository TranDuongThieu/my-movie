import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchTv } from "../../apis/search";
import MovieCard from "../../Components/MovieCard";
import { setSearchTv } from "../../store/actions/searchAction";
import { widthSelector } from "../../store/widthSelector";
import Loading from "../../Components/Loading";

const SearchMovies = ({ keywords }) => {
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [totalResults, setTotalResults] = useState(0);
    const [loaded, setLoaded] = useState(false);
    const searchTvRes = useSelector((state) =>
        state.search.search_tv.filter(
            (item) => item.backdrop_path || item.poster_path
        )
    );
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAPI = async () => {
            setLoaded(false);
            const res = await searchTv(keywords, page);
            if (res.status === 200) {
                setTotalPage(res.data.total_pages);
                dispatch(setSearchTv(res.data.results));
                setTotalResults(res.data.total_results);
            }
            setLoaded(true);
        };

        fetchAPI();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [keywords]);
    useEffect(() => {
        const fetchAPI = async () => {
            const res = await searchTv(keywords, page);
            if (res?.status === 200) {
                dispatch(
                    setSearchTv([...searchTvRes.concat(res?.data?.results)])
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
        <div>
            {loaded ? (
                <div>
                    {searchTvRes.length === 0 ? (
                        <span>
                            There are no TV shows that matched your query.
                        </span>
                    ) : (
                        <div>
                            <span className="my-2">
                                {totalResults}{" "}
                                {totalResults > 1 ? "results" : "result"}{" "}
                                matched
                            </span>
                            <div className={`grid gap-5 flex-1 ${slides}`}>
                                {searchTvRes?.map((item) => (
                                    <MovieCard
                                        typeImg="original"
                                        url={
                                            item.poster_path ||
                                            item.backdrop_path
                                        }
                                        title={item.title || item.name}
                                        date={item.first_air_date}
                                        rate={item.vote_average}
                                        key={item.id + item.title}
                                        type="tv"
                                        size="lg"
                                        id={item.id}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <Loading />
            )}
        </div>
    );
};

export default SearchMovies;
