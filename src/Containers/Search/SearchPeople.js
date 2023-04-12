import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchPeople } from "../../apis/search";
import { setSearchPeople } from "../../store/actions/searchAction";
import no_img from "../../assets/un_user.svg";
import { widthSelector } from "../../store/widthSelector";
import { Link } from "react-router-dom";
import paths from "../../utils/path";
import Loading from "../../Components/Loading";
const SearchPeople = ({ keywords }) => {
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [totalResults, setTotalResults] = useState(0);
    const [loaded, setLoaded] = useState(false);
    const searchPeopleRes = useSelector((state) => state.search.search_people);
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAPI = async () => {
            setLoaded(false);
            const res = await searchPeople(keywords, 1);
            if (res.status === 200) {
                setTotalPage(res.data.total_pages);
                dispatch(setSearchPeople(res.data.results));
                setTotalResults(res.data.total_results);
            }
            setLoaded(true);
        };
        fetchAPI();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [keywords]);

    useEffect(() => {
        const fetchAPI = async () => {
            const res = await searchPeople(keywords, page);
            if (res?.status === 200) {
                dispatch(
                    setSearchPeople([
                        ...searchPeopleRes.concat(res?.data?.results),
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
    const width = useSelector(widthSelector);
    const slides = width < 3 ? "grid-cols-1 " : "grid-cols-2 ";
    return (
        <div>
            {loaded ? (
                <div>
                    {searchPeopleRes.length === 0 ? (
                        <span>
                            There are no people that matched your query.
                        </span>
                    ) : (
                        <div className="flex flex-col gap-2">
                            <span className="my-2">
                                {totalResults}{" "}
                                {totalResults > 1 ? "results" : "result"}{" "}
                                matched
                            </span>
                            <div
                                className={`grid  gap-4 gap-x-[60px]  truncate ${slides}`}
                            >
                                {searchPeopleRes?.map((item) => (
                                    <Link
                                        to={paths.detailPerson(
                                            "person",
                                            item.id
                                        )}
                                        className="w-full cursor-pointer flex gap-2 items-center px-6 py-3 bg-[#181818] rounded-md hover:bg-[#202020]"
                                    >
                                        <div className="bg-[#dbdbdb] rounded-md w-[70px] h-[70px] flex-none">
                                            {item.profile_path ? (
                                                <img
                                                    className="w-[70px] h-[70px] rounded-md"
                                                    src={`https://image.tmdb.org/t/p/w180_and_h180_face${item.profile_path}`}
                                                    alt=""
                                                />
                                            ) : (
                                                <img
                                                    src={no_img}
                                                    alt=""
                                                    className="w-[70px] h-[70px]"
                                                />
                                            )}
                                        </div>
                                        <div className="flex flex-col truncate text-[15px]">
                                            <span>{item.name}</span>
                                            <span>
                                                {item.known_for_department}
                                            </span>
                                            <div className="flex gap-2">
                                                {item.known_for.map(
                                                    (item, index) => (
                                                        <span className="cursor-pointer">
                                                            {item.title ||
                                                                item.name}
                                                            ,
                                                        </span>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </Link>
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

export default SearchPeople;
