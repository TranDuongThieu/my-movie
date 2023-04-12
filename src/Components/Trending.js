import React, { useRef, useState } from "react";
import MovieCard from "./MovieCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import { NextIcon, PrevIcon } from "../utils/icons";
import { useSelector } from "react-redux";
import { widthSelector } from "../store/widthSelector";
const Trending = ({ title, dayTrending, weekTrending,bg }) => {
    const [active, setActive] = useState("today");
    let trending;
    const swiperRef = useRef();
    if (active === "today") trending = dayTrending?.results;
    else trending = weekTrending?.results;
    const width = useSelector(widthSelector);
    const slides = width === 1 ? 2 : width === 2 ? 3 : width === 3 ? 5 : 7;
    function handleDayClick(value) {
        setActive(value ? "today" : "week");
    }
    return (
        <div className={`w-full pt-8 items-center ${bg} text-white`}>
            <div className="flex gap-5 items-center px-2 sm:px-5 md:px-10 lg:px-[60px]">
                <span className="text-[25px]">{title}</span>
                <div className="flex items-center border-[1px] rounded-full bg-[#ccc]">
                    <span
                        className={`px-5 py-1 rounded-full cursor-pointer  ${
                            active === "today"
                                ? "bg-[#282828] text-white"
                                : "text-black"
                        }`}
                        onClick={() => handleDayClick(true)}
                    >
                        Today
                    </span>
                    <span
                        className={`px-5 py-1 rounded-full cursor-pointer  ${
                            active === "week"
                                ? "bg-[#282828] text-white "
                                : "text-black"
                        }`}
                        onClick={() => handleDayClick(false)}
                    >
                        This Week
                    </span>
                </div>
            </div>

            <div className="w-full px-5 ">
                <div className="w-full relative overflow-hidden">
                    <Swiper
                        slidesPerView={slides}
                        loop={true}
                        spaceBetween={20}
                        onBeforeInit={(swiper) => {
                            swiperRef.current = swiper;
                        }}
                    >
                        {trending?.map((item) => (
                            <SwiperSlide key={item?.id}>
                                <MovieCard
                                    id={item.id}
                                    typeImg="original"
                                    url={item?.poster_path}
                                    title={item?.title || item?.name}
                                    date={
                                        item?.release_date ||
                                        item?.first_air_date
                                    }
                                    rate={item?.vote_average}
                                    type={item?.media_type}
                                    size="md"
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div
                        onClick={() => swiperRef.current?.slideNext()}
                        className="absolute w-28 h-28 bg-[#fff9]/30 pl-1 hover:bg-white transition duration-300 rounded-full translate-x-[65%] flex justify-start items-center cursor-pointer top-2/4 right-[-4px] -translate-y-2/4 hover:text-white text-white/30 z-10 text-4xl"
                    >
                        <NextIcon size={30} />
                    </div>
                    <div
                        onClick={() => swiperRef.current?.slidePrev()}
                        className="absolute w-28 h-28 bg-[#fff9]/30 pr-1 hover:bg-white transition duration-300 rounded-full -translate-x-[65%] flex justify-end items-center cursor-pointer top-2/4 left-[-4px] -translate-y-2/4 hover:text-white text-white/30 z-10 text-4xl "
                    >
                        <PrevIcon size={30} color="white" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Trending;
