import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SearchInput from "./SearchInput";
import { CloseIcon, MenuIcon } from "../utils/icons";
import { useSelector } from "react-redux";
import { widthSelector } from "../store/widthSelector";
const Header = () => {
    const LEFT_MENU = [
        {
            title: "Movie",
            link: `/movie`,
        },

        {
            title: "TV Shows",
            link: `/tv`,
        },
        { title: "People", link: `/people` },
    ];
    const width = useSelector(widthSelector);
    const [active, setActive] = useState("Home");
    const location = useLocation();
    useEffect(() => {
        if (location.pathname !== "/") {
            setActive(
                [{ title: "Home", link: "/" }, ...LEFT_MENU].find(
                    (item) =>
                        item.link === `/${location.pathname.split("/")[1]}`
                )?.title
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);
    const [showMenu, setShowMenu] = useState(false);
    return (
        <div className="w-full h-full text-[17px] py-[5px] flex gap-3 px-2  sm:px-5 md:px-10  lg:px-[60px] justify-between items-center z-10 text-white bg-transparent">
            <div className="flex flex-none items-center gap-5">
                {width < 3 && (
                    <div
                        className="p-2 cursor-pointer"
                        onClick={() => setShowMenu(true)}
                    >
                        <MenuIcon size={25} />
                    </div>
                )}
                <Link
                    onClick={() => setActive("Home")}
                    to=""
                    className="font-bold font-poppin text-[30px] flex justify-center items-center"
                >
                    <span className="text-white">My</span>
                    <span className="text-red-400">Movie</span>
                </Link>
                {width > 2 &&
                    LEFT_MENU.map((item, index) => (
                        <Link
                            to={item.link}
                            className={`p-2 cursor-pointer relative  ${
                                active === item.title
                                    ? "text-primary"
                                    : "text-[#CCCCCC] hover:text-white"
                            }`}
                            key={item.title}
                            onClick={() => setActive(item.title)}
                        >
                            <span className="">{item.title}</span>
                        </Link>
                    ))}
            </div>
            <div className="w-[400px]">
                <SearchInput />
            </div>
            {showMenu && (
                <div
                    onClick={() => setShowMenu(false)}
                    className="fixed top-0 bottom-0 right-0 left-0 z-30 bg-[rgba(0,0,0,0.3)]"
                ></div>
            )}
            <div
                className={`fixed top-0 h-screen bg-black w-[250px] z-50 ${
                    showMenu
                        ? "left-0 duration-500 "
                        : "left-[-250px] duration-500"
                }`}
            >
                <CloseIcon
                    size={25}
                    className={`sticky top-[10px] cursor-pointer ${
                        showMenu
                            ? "left-[200px] duration-500 "
                            : "left-0 duration-500 "
                    }`}
                    onClick={() => setShowMenu(false)}
                />
                <div className="w-full h-[80%] flex flex-col justify-center items-center gap-3">
                    {[{ title: "Home", link: "/" }, ...LEFT_MENU].map((item) => (
                        <Link
                            to={item.link}
                            className={`p-2 cursor-pointer relative  ${
                                active === item.title
                                    ? "text-primary border-b-[2px] border-b-primary"
                                    : "text-[#CCCCCC] hover:text-white"
                            }`}
                            key={item.title}
                            onClick={() => setActive(item.title)}
                        >
                            <span className="">{item.title}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Header;
