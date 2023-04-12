import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation, useParams } from "react-router-dom";
import SearchMovies from "./SearchMovies";
import SearchPeople from "./SearchPeople";
import SearchTv from "./SearchTv";

const Search = () => {
    const keywords = useSelector((state) => state.search);
    const location = useLocation();
    const searchParams = location.search.split("=")[1].replace("+", " ");
    const searchText = searchParams || keywords;
    const titles = ["Movies", "TV Shows", "People"];
    const [activeTitle, setActiveTitle] = useState("Movies");
    return (
        <div className="min-h-screen pt-[80px] px-2 sm:px-5 md:px-10 lg:px-[60px] text-[18px] text-[#ccc]">
            <div>Search results for "{searchText}"</div>
            <div className="flex items-center gap-8 my-5 ">
                {titles.map((title) => (
                    <div
                        onClick={() => setActiveTitle(title)}
                        className={`cursor-pointer border-b-[2px] border-b-transparent ${
                            activeTitle === title
                                ? "text-primary border-b-[2px] border-b-primary"
                                : " hover:text-white"
                        }`}
                        key={title}
                    >
                        {title}
                    </div>
                ))}
            </div>
            {activeTitle === "Movies" ? (
                <SearchMovies keywords={searchText} />
            ) : activeTitle === "TV Shows" ? (
                <SearchTv keywords={searchText} />
            ) : (
                <SearchPeople keywords={searchText} />
            )}
            <Outlet />
        </div>
    );
};

export default Search;
