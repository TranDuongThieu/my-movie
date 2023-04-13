import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FilterIcon, GenreIcon } from "../utils/icons";
import { setGenreFilter } from "../store/actions/filterActions";
import { widthSelector } from "../store/widthSelector";
import { currentWidth } from "../store/widthSelector";

const Filter = () => {
    const genres = useSelector((state) => state.home.genres);
    const dispatch = useDispatch();
    const [activeGenres, setActiveGenres] = useState([]);
    const [showGenres, setShowGenres] = useState(false);
    const genresRef = useRef(null);
    const width = useSelector(widthSelector);
    const currentWidthSelector = useSelector(currentWidth);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                genresRef.current &&
                !genresRef.current.contains(event.target) &&
                showGenres
            ) {
                setShowGenres(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [genresRef, showGenres]);

    const handleGenreClick = (genre) => {
        const isActive = activeGenres.some(
            (activeGenre) => activeGenre.id === genre.id
        );

        if (!isActive) {
            setActiveGenres([...activeGenres, genre]);
        } else {
            setActiveGenres(
                activeGenres.filter(
                    (activeGenre) => activeGenre.id !== genre.id
                )
            );
        }
    };

    const toggleGenres = () => {
        setShowGenres(!showGenres);
    };

    const handleFilter = () => {
        dispatch(setGenreFilter(activeGenres));
    };

    return (
        <div className="flex items-center text-[13px] gap-4">
            <div className="relative " ref={genresRef}>
                <div
                    className="px-3 py-3 bg-[#212529] rounded-md w-fit cursor-pointer truncate "
                    onClick={toggleGenres}
                >
                    <div className="flex items-center gap-1">
                        <GenreIcon className="text-[#ccc]" />
                        <span className="text-[#ccc]">Genre :</span>
                        {activeGenres.length === 0 ||
                        activeGenres.length === genres.length ? (
                            <span>All</span>
                        ) : activeGenres.length === 1 ? (
                            <span>
                                {
                                    genres.find(
                                        (genre) => genre === activeGenres[0]
                                    ).name
                                }
                            </span>
                        ) : (
                            <span>{activeGenres.length} selected</span>
                        )}
                    </div>
                </div>
                {showGenres && (
                    <div
                        style={{
                            width:
                                width > 2
                                    ? "500px"
                                    : `${currentWidthSelector - 30}px`,
                        }}
                        className={`absolute top-[50px] px-4 py-5 flex flex-col z-10 bg-[#212529] text-[#cccccc] rounded-md  `}
                    >
                        <div className="flex flex-wrap gap-4">
                            {genres.map((genre) => {
                                const isActive = activeGenres.some(
                                    (activeGenre) => activeGenre.id === genre.id
                                );

                                return (
                                    <div key={genre.id}>
                                        <div
                                            className={`py-1 px-2 border border-[#B4B4B4] rounded-full text-center cursor-pointer ${
                                                isActive
                                                    ? "bg-primary text-white"
                                                    : "bg-[#212529] text-[#cccccc]"
                                            }`}
                                            onClick={() =>
                                                handleGenreClick(genre)
                                            }
                                        >
                                            {genre.name}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
            <div
                className="px-3 py-[12px] bg-primary hover:bg-[#169aaa] rounded-md flex items-center gap-1 cursor-pointer"
                onClick={handleFilter}
            >
                <FilterIcon /> <span>Filter</span>
            </div>
        </div>
    );
};

export default Filter;
