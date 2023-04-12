/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getVideos } from "../apis/getvideos";
import { getTrending } from "../apis/home";
import {
    MovieIcon,
    NextIcon,
    PrevIcon,
    StarIcon,
    TvIcon,
} from "../utils/icons";
import paths from "../utils/path";
import { Link } from "react-router-dom";
import { widthSelector } from "../store/widthSelector";

const BackgroundVideo = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [movie, setMovie] = useState();
    const genres = useSelector((state) => state.home.genres);
    const [video, setVideo] = useState();
    const [isVideo, setIsVideo] = useState(true);
    const videoRef = useRef();
    const width = useSelector(widthSelector);
    let id;
    let type;
    const [index, setIndex] = useState(0);
    useEffect(() => {
        const fetchData = async () => {
            setIsLoaded(false);
            const res1 = await getTrending("all", "day");
            if (res1.status === 200) {
                id = res1.data.results[index].id;
                type = res1.data.results[index].media_type;
                setMovie(res1.data.results[index]);
            }
            const res = await getVideos(type, id);
            if (res.status === 200) {
                setVideo(
                    res?.data?.results?.find(
                        (video) =>
                            video?.name.includes("Official Trailer") ||
                            video?.name.includes("Trailer") ||
                            video?.name.includes("Teaser") ||
                            video?.type.includes("Trailer")
                    )
                );
            }
            setIsLoaded(true);
            setIsVideo(true);
        };
        fetchData();
    }, [index]);

    useEffect(() => {
        let timeout;
        if (isVideo) {
            timeout = setTimeout(() => {
                setIsVideo(false);
            }, 20000);
        }
        return () => clearTimeout(timeout);
    }, [isVideo, index]);
    const handleNextVideo = () => {
        if (index < 19) setIndex(index + 1);
        else setIndex(0);
    };
    const handlePrevVideo = () => {
        if (index > 0) setIndex(index - 1);
        else setIndex(19);
    };

    return (
        <div className="relative h-full overflow-hidden">
            <div
                onClick={handlePrevVideo}
                className="absolute left-2 top-[50%] translate-y-[-50%] p-3 bg-[rgba(255,255,255,0.2)] z-10 rounded-full cursor-pointer hover:bg-white"
            >
                <PrevIcon size={width > 2 ? 40 : 20} />
            </div>
            <div
                onClick={handleNextVideo}
                className="absolute right-2 top-[50%] translate-y-[-50%] p-3 bg-[rgba(255,255,255,0.2)] z-10 rounded-full cursor-pointer hover:bg-white"
            >
                <NextIcon size={width > 2 ? 40 : 20} />
            </div>
            <div className="absolute top-0 left-0 w-full h-full">
                {isLoaded && isVideo ? (
                    <iframe
                        ref={videoRef}
                        title="background-video"
                        src={`https://www.youtube.com/embed/${video?.key}?autoplay=1&mute=1&controls=0&showinfo=0&autohide=1&modestbranding=1&rel=0`}
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        className="w-full h-full object-cover transform scale-150"
                        onEnded={() => setIsVideo(false)}
                    />
                ) : (
                    <img
                        src={paths.img("original", movie?.backdrop_path)}
                        className="w-full h-full  object-cover"
                        alt="bg"
                    />
                )}
            </div>
            <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full bg-[rgba(0,0,0,0.4)]"></div>
            <div className="absolute bottom-[10%] left-0 max-w-[600px] h-full flex flex-col gap-4 items-start justify-end px-5 z-1">
                <Link
                    to={paths.detail(
                        movie?.media_type,
                        movie?.id,
                        movie?.title || movie?.name
                    )}
                    className="text-[30px] font-popin font-bold text-white text-center hover:text-primary duration-200"
                >
                    {movie?.title || movie?.name}
                </Link>
                <div
                    className={`flex  text-white gap-3 ${
                        width < 3 ? "flex-col items-start" : "items-center"
                    }`}
                >
                    <div className="flex gap-2 items-center">
                        <div className="px-3 py-[4px] bg-primary rounded-md">
                            {movie?.media_type === "movie" ? (
                                <MovieIcon color="white" />
                            ) : (
                                <TvIcon color="white" />
                            )}
                        </div>
                        <div className="flex items-center">
                            <StarIcon />
                            <span>
                                {Math.round(movie?.vote_average * 10) / 10}
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-[#fff9] flex-wrap">
                        {movie?.genre_ids.map((genre) => (
                            <span className="hover:text-primary cursor-pointer">
                                {genres.find((item) => item.id === genre)?.name}
                            </span>
                        ))}
                    </div>
                </div>
                {width > 2 && (
                    <div className="text-justify text-[#fff9] select-none">
                        {movie?.overview}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BackgroundVideo;
