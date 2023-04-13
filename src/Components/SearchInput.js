import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { createSearchParams, useNavigate } from "react-router-dom";
import { setSearchKeyWords } from "../store/actions/searchAction";
import { SearchIcon } from "../utils/icons";
import paths from "../utils/path";

const SearchInput = () => {
    const [searchText, setSearchText] = useState("");

    const inputRef = useRef();
    const constaintRef = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSetSearchText = (e) => {
        setSearchText(e.target.value);
    };
    const [show, setShow] = useState(false);

    // useEffect(() => {
    //     if (searchText.trim() !== "") setSearching(true);
    //     else setSearching(false);
    // }, [searchText]);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                constaintRef.current &&
                !constaintRef.current.contains(event.target) &&
                show
            ) {
                setShow(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [constaintRef, show]);
    const handleSearchIconClick = () => {
        if (!show) {
            setShow(true);
            setTimeout(() => {
                inputRef.current.focus();
            }, 100);
        } else if (searchText.trim() !== "" && show) {
            dispatch(setSearchKeyWords(searchText.trim()));
            navigate({
                pathname: `${paths.SEARCH}`,
                search: createSearchParams({
                    q: searchText.trim(),
                }).toString(),
            });
        }
    };
    const handleCheckEnter = (e) => {
        if (e.key === "Enter" && searchText.trim() !== "") {
            dispatch(setSearchKeyWords(searchText.trim()));
            navigate({
                pathname: `${paths.SEARCH}`,
                search: createSearchParams({
                    q: searchText.trim(),
                }).toString(),
            });
        }
    };

    return (
        <div
            ref={constaintRef}
            className={`flex items-center justify-between px-2 py-1 relative  ${
                show && "rounded-full border-[1px] bg-[rgba(0,0,0,0.9)]"
            }`}
        >
            <input
                ref={inputRef}
                value={searchText}
                onChange={handleSetSearchText}
                type="text"
                placeholder="Search for a movie, tv show, person..."
                className={`flex-1 outline-none rounded-full px-[10px] py-[5px]  bg-transparent ${
                    show ? " block" : "hidden"
                }`}
                onKeyDown={handleCheckEnter}
            />
            <div
                className={`p-1 cursor-pointer absolute right-0 ${
                    !show && "rounded-full border border-[#ccc]"
                }`}
                onClick={handleSearchIconClick}
            >
                <SearchIcon size={25} />
            </div>
        </div>
    );
};

export default SearchInput;
