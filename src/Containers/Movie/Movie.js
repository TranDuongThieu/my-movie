import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import Filter from "../../Components/Filter";
import paths from "../../utils/path";
const list = [
    { title: "All", link: `/movie` },
    { title: "Popular", link: `/movie/${paths.POPULAR}` },
    { title: "Up Coming", link: `/movie/${paths.UP_COMING}` },
];

const Movie = () => {
    const [active, setActive] = useState("All");
    const location = useLocation();
    useEffect(() => {
        if (location.pathname !== "/") {
            setActive(
                list.find(
                    (item) =>
                        item.link === `${location.pathname}`
                )?.title
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    return (
        <div className="pt-[80px] px-2 sm:px-5 md:px-10 lg:px-[60px] ">
            <div className="flex gap-7 text-[16px] py-2 ">
                {list.map((item) => (
                    <Link
                        key={item.link}
                        onClick={() => setActive(item.title)}
                        to={item.link}
                        className={`py-3 px-2 border-b-[2px] border-b-transparent ${
                            active === item.title
                                ? " border-b-white text-primary"
                                : "text-[#CCCCCC] hover:text-white"
                        }`}
                    >
                        {item.title}
                    </Link>
                ))}
            </div>
            <div className="w-[250px] my-7">
                <Filter />
            </div>
            <Outlet />
        </div>
    );
};

export default Movie;
