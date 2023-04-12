import React, { useEffect, useState } from "react";
import { getPopularPeople } from "../../apis/getPeople";
import PeopleCard from "./PeopleCard";
import { widthSelector } from "../../store/widthSelector";
import { useSelector } from "react-redux";

const People = () => {
    const [popularPeople, setPopularPeople] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const width = useSelector(widthSelector);
    const slides =
        width === 1
            ? "grid-cols-2 "
            : width === 2
            ? "grid-cols-3"
            : width === 3
            ? "grid-cols-4"
            : "grid-cols-6";
    useEffect(() => {
        const fetchAPI = async () => {
            const res = await getPopularPeople(page);
            if (res.status === 200) {
                setTotalPage(res.data.total_pages);
                setPopularPeople(res.data.results);
            }
        };
        fetchAPI();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        const fetchAPI = async () => {
            const res = await getPopularPeople(page);
            if (res?.status === 200) {
                setPopularPeople([...popularPeople, ...res.data.results]);
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
        <div className="pt-[80px] px-1 sm:px-5 md:px-10 lg:px-[60px] min-h-[1000px]">
            <div className="text-[25px] font-bold my-10">Popular People</div>
            <div className={`grid gap-5 ${slides} mx-2`}>
                {popularPeople.map((person) => (
                    <PeopleCard people={person} />
                ))}
            </div>
           
        </div>
    );
};

export default People;
