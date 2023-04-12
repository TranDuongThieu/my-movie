import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
    getCredits,
    getDetail,
    getRecommenedations,
} from "../../apis/getMovies";
import { getVideos } from "../../apis/getvideos";
import { CloseIcon, PlayIcon, StarIcon } from "../../utils/icons";
import paths from "../../utils/path";
import { Typewriter } from "react-simple-typewriter";
import { Swiper, SwiperSlide } from "swiper/react";
import MovieCard from "../../Components/MovieCard";
import noimg from "../../assets/no_img.svg";
import { getReviews } from "../../apis/getReview";
import PeopleCard from "../People/PeopleCard";
import Reviews from "../../Components/Reviews";
import { widthSelector } from "../../store/widthSelector";
import { useSelector } from "react-redux";
import Loading from "../../Components/Loading";
const DetailMovie = () => {
    const [mediaType, setMediaType] = useState();
    const [isShow, setIsShow] = useState(false);
    const [id, setId] = useState();
    const location = useLocation();
    const [movie, setMovie] = useState();
    const [trailer, setTrailer] = useState();
    const [credits, setCredits] = useState();
    const [recommendations, setRecommendations] = useState();
    const [isLoaded, setIsLoaded] = useState(true);
    const [reviews, setReviews] = useState();
    const width = useSelector(widthSelector);
    const slides =
        width === 1 ? "2" : width === 2 ? "3" : width === 3 ? "5" : "7";
    const formatTime = () => {
        // const time = movie?.episode_run_time[0] || movie?.runtime;
        let time;
        if (movie.runtime !== undefined) {
            time = movie.runtime;
        } else if (movie?.episode_run_time !== undefined) {
            time = movie.episode_run_time[0];
        } else time = 0;
        if (time) {
            const m = time % 60;
            const h = Math.floor(time / 60);
            return `${h !== 0 ? h + "h" : ""} ${m !== 0 ? m + "m" : ""}`;
        } else return false;
    };
    useEffect(() => {
        setId(location.pathname.split("/")[2]);
        setMediaType(location.pathname.split("/")[1]);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);
    useEffect(() => {
        const fetchApi = async () => {
            setIsLoaded(false);
            const res = await getDetail(mediaType, id);
            const res2 = await getCredits(mediaType, id);
            const res3 = await getRecommenedations(mediaType, id);
            const res4 = await getReviews(mediaType, id);
            if (res.status === 200) setMovie(res.data);
            if (res2.status === 200) setCredits(res2.data);
            if (res3.status === 200) setRecommendations(res3.data);
            if (res4.status === 200) setReviews(res4.data);
            setIsLoaded(true);
        };
        fetchApi();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);
    useEffect(() => {
        if (isShow) {
            const fetchTrailer = async () => {
                setIsLoaded(false);
                const res = await getVideos(mediaType, movie.id);
                if (res.status === 200)
                    setTrailer(
                        res.data.results.find(
                            (video) =>
                                video.name.includes("Official Trailer") ||
                                video.name.includes("Trailer") ||
                                video.name.includes("Teaser")
                        )
                    );
                setIsLoaded(true);
            };
            fetchTrailer();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isShow]);
    return (
        <div>
            {isLoaded ? (
                <div>
                    {movie && (
                        <div className="w-full h-full bg-[#111111] pb-10">
                            <div
                                className="min-h-[36rem] flex-none"
                                style={{
                                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${paths.img(
                                        "original",
                                        movie?.backdrop_path
                                    )})`,
                                    backgroundSize: "cover",
                                }}
                            >
                                <div
                                    className={`pt-[100px] max-w-[1300px] px-2 sm:px-5 md:px-10 lg:px-[60px] flex  gap-20 ${
                                        width < 3 &&
                                        "flex-col items-center justify-center"
                                    } `}
                                >
                                    <div className="flex-none  rounded-lg">
                                        {movie?.poster_path ? (
                                            <img
                                                src={paths.img(
                                                    "original",
                                                    movie?.poster_path
                                                )}
                                                alt=""
                                                className="w-[300px] h-[450px] flex-none object-cover rounded-lg  cursor-pointer"
                                            />
                                        ) : (
                                            <img
                                                src={noimg}
                                                alt=""
                                                className="w-[300px] h-[450px] flex-none object-cover rounded-lg  cursor-pointer"
                                            />
                                        )}
                                    </div>
                                    <div
                                        className={`flex flex-col gap-5 ${
                                            width < 3 &&
                                            "justify-center items-center"
                                        }`}
                                    >
                                        <span className="text-[32px] font-semibold cursor-pointer">
                                            {movie.title || movie.name}
                                        </span>
                                        <div className="flex gap-4 items-center">
                                            <span>
                                                {movie.release_date ||
                                                    movie.first_air_date}
                                            </span>
                                            <span>|</span>
                                            <span>{formatTime()}</span>
                                            <span>
                                                {formatTime() && <span>|</span>}
                                            </span>
                                            <div className="flex items-center text-[25px] group cursor-pointer">
                                                <StarIcon
                                                    size={25}
                                                    className="group-hover:text-yellow-300 duration-200"
                                                />
                                                <span className="relative">
                                                    {Math.round(
                                                        movie.vote_average * 10
                                                    ) / 10}
                                                    <span className="text-[13px] italic absolute bottom-0">
                                                        /10
                                                    </span>
                                                </span>
                                            </div>
                                        </div>
                                        <div
                                            className={`flex gap-6 items-center ${
                                                width < 4 &&
                                                "flex-col items-center justify-center"
                                            }`}
                                        >
                                            <span className="flex gap-2 flex-wrap items-center">
                                                {movie.genres.map(
                                                    (genre, index) => (
                                                        <span>
                                                            {index !==
                                                            movie.genres
                                                                .length -
                                                                1 ? (
                                                                <div className="flex gap-2 ">
                                                                    <span className="cursor-pointer hover:text-primary duration-200 rounded-full border-[1px] px-2 py-1">
                                                                        {
                                                                            genre.name
                                                                        }
                                                                    </span>
                                                                    <span>
                                                                        -
                                                                    </span>
                                                                </div>
                                                            ) : (
                                                                <span className="cursor-pointer hover:text-primary duration-200 rounded-full border-[1px] px-2 py-1">
                                                                    {genre.name}
                                                                </span>
                                                            )}
                                                        </span>
                                                    )
                                                )}
                                            </span>
                                            <div
                                                className="flex py-[2px] pl-2 pr-3 border items-center  cursor-pointer hover:text-primary hover:border-primary duration-200"
                                                onClick={() => setIsShow(true)}
                                            >
                                                <PlayIcon size={25} />
                                                <span className="tracking-wide">
                                                    WATCH TRAILER
                                                </span>
                                            </div>
                                        </div>
                                        {movie.tagline && (
                                            <span className="italic text-[#ccc]">
                                                <Typewriter
                                                    words={[movie.tagline]}
                                                    cursor
                                                    cursorStyle="|"
                                                    loop
                                                    delaySpeed={100}
                                                    deleteSpeed={100}
                                                />
                                            </span>
                                        )}

                                        <div className="flex flex-col gap-3">
                                            <span className="text-[20px]">
                                                Overview
                                            </span>
                                            <span className="italic text-[#ccc] text-justify w-full ">
                                                {movie.overview ||
                                                    "We don't have an overview translated in English. Help us expand our database by adding one."}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Trailer Model */}
                    {isShow && (
                        <div
                            className="fixed top-0 bottom-0 right-0 left-0 bg-black opacity-70 z-40"
                            onClick={() => setIsShow(false)}
                        ></div>
                    )}
                    {isShow && (
                        <div
                            className={`fixed  left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%]  bg-black z-50 ${
                                width > 2
                                    ? "w-[800px] h-[500px]"
                                    : "w-screen h-[350px]"
                            }`}
                        >
                            <div className="w-full absolute top-0 px-5 pt-4 flex items-center justify-between">
                                <span>{trailer?.name}</span>
                                <CloseIcon
                                    onClick={() => setIsShow(false)}
                                    size={20}
                                    className="cursor-pointer font-bold text-[#919191] hover:text-white"
                                />
                            </div>
                            <iframe
                                title="background-video"
                                src={`https://www.youtube.com/embed/${trailer?.key}?rel=0`}
                                allow="accelerometer; autoplay; encrypted-media; gyroscope"
                                allowFullScreen
                                className={`absolute bottom-0 z-50 ${
                                    width > 2
                                        ? " w-[800px] h-[450px] "
                                        : "w-screen h-[300px]"
                                }`}
                            />
                        </div>
                    )}
                    {credits && (
                        <div className="w-full px-2 sm:px-5 md:px-10 lg:px-[60px] mb-10">
                            <span className="font-bold text-[25px] py-5">
                                Top Billed Cast
                            </span>
                            <div className="mt-5">
                                <Swiper
                                    slidesPerView={slides}
                                    loop={false}
                                    spaceBetween={20}
                                >
                                    {credits?.cast
                                        .filter((item) => item?.profile_path)
                                        .map((item) => (
                                            <SwiperSlide key={item?.id}>
                                                <PeopleCard people={item} />
                                            </SwiperSlide>
                                        ))}
                                </Swiper>
                            </div>
                        </div>
                    )}
                    <div className="w-full px-2 sm:px-5 md:px-10 lg:px-[60px] mb-10 flex flex-col">
                        <span className="font-bold text-[25px] py-5">
                            Recommendations
                        </span>
                        {recommendations && recommendations.total_results ? (
                            <div>
                                <Swiper
                                    slidesPerView={slides}
                                    loop={false}
                                    spaceBetween={20}
                                >
                                    {recommendations.results?.map((item) => (
                                        <SwiperSlide key={item?.id}>
                                            <MovieCard
                                                id={item.id}
                                                typeImg="original"
                                                url={item?.poster_path}
                                                title={
                                                    item?.title || item?.name
                                                }
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
                            </div>
                        ) : (
                            <span>
                                We don't have enough data to suggest any movies
                                based on {movie?.title || movie?.name}. You can
                                help by rating movies you've seen.
                            </span>
                        )}
                        <div className="py-[25px] flex flex-col gap-3">
                            <span className="text-[25px] font-bold">
                                Reviews
                            </span>
                            {reviews?.total_results === 0 ? (
                                <span>
                                    We don't have any reviews for{" "}
                                    {movie?.title || movie?.name}.
                                </span>
                            ) : (
                                <div className="flex flex-col">
                                    <div>
                                        <Reviews
                                            title={movie?.title || movie?.name}
                                            allReviews={reviews?.results}
                                            review={reviews?.results[0]}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <Loading />
            )}
        </div>
    );
};

export default DetailMovie;
