import React from "react";
import { useSelector } from "react-redux";
import { widthSelector } from "../store/widthSelector";
import MovieCard from "./MovieCard";

const Movies = ({ Movies, title, bg }) => {
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
        <div className="py-5">
            <div className={`px-2  sm:px-5 md:px-10 lg:px-[60px]  ${bg}`}>
                <span className="text-[25px] text-[#ccc] ">{title}</span>
            </div>
                <div className={`grid ${slides} gap-5 w-full px-2 sm:px-5`}>
                    {Movies?.results?.map((movie) => (
                        <MovieCard
                            id={movie.id}
                            typeImg="original"
                            url={movie?.poster_path}
                            title={movie?.title || movie?.name}
                            date={movie?.release_date || movie?.first_air_date}
                            rate={movie?.vote_average}
                            type={movie?.media_type}
                            size="md"
                        />
                    ))}
                </div>
        </div>
    );
};

export default Movies;
