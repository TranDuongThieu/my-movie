import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getDetail } from "../../apis/getMovies";
import paths from "../../utils/path";
import { getCredits, getExternals } from "../../apis/getPeople";
import { FbIcon, IgIcon, TwitterIcon, YoutubeIcon } from "../../utils/icons";
import { Swiper, SwiperSlide } from "swiper/react";
import MovieCard from "../../Components/MovieCard";
import { useSelector } from "react-redux";
import { widthSelector } from "../../store/widthSelector";
import Loading from "../../Components/Loading";

const DetailPerson = () => {
    const [id, setId] = useState();
    const location = useLocation();
    const [mediaType, setMediaType] = useState();
    const [person, setPerson] = useState();
    const [externals, setExternals] = useState();
    const [movieCredits, setMovieCredits] = useState();
    const [showAllBio, setShowAllBio] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const ParagraphComponent = () => (
        <div className="flex flex-col gap-1">
            {person?.biography?.split("\n").map((item) => (
                <span>{item}</span>
            ))}
        </div>
    );
    const width = useSelector(widthSelector);
    const slides = width === 1 ? 2 : width === 2 ? 3 : width === 3 ? 3 : 4;
    const paragraph = person?.biography;
    const toggleParagraph = (event) => {
        event.preventDefault();
        setShowAllBio(!showAllBio);
    };
    const truncateString = (str, num) => {
        if (str?.length <= num) {
            return str;
        }
        return str?.slice(0, num) + " ... ";
    };
    const limit = 1000; // number of words to show before "Read More"
    const truncatedParagraph = truncateString(paragraph, limit);
    useEffect(() => {
        setId(location.pathname.split("/")[2]);
        setMediaType(location.pathname.split("/")[1]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);
    const readMoreLink = (
        <span
            className="border-b-[1px] cursor-pointer hover:text-primary hover:border-b-primary duration-200"
            onClick={toggleParagraph}
        >
            Read More
        </span>
    );
    useEffect(() => {
        const fetchApi = async () => {
            setLoaded(false);
            const res = await getDetail(mediaType, id);
            const res2 = await getExternals(id);
            const res3 = await getCredits(id, "combined_credits");
            if (res.status === 200) setPerson(res.data);
            if (res2.status === 200) setExternals(res2.data);
            if (res3.status === 200) setMovieCredits(res3.data);
            setLoaded(true);
        };
        fetchApi();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);
    return (
        <div>
            {loaded ? (
                <div
                    className={`w-full min-h-screen pt-[100px] px-2 sm:px-5 md:px-10 lg:px-[60px] pb-[80px] `}
                >
                    <div
                        className={`grid  ${
                            width > 2
                                ? " grid-cols-3 gap-[200px]"
                                : "grid-cols-1  w-full"
                        }`}
                    >
                        <div
                            className={` flex-none rounded-md flex flex-col col-span-1 gap-5 justify-center items-center ${
                                width > 2 ? "w-[250px]" : "w-full"
                            }`}
                        >
                            <img
                                src={paths.img(
                                    "original",
                                    person?.profile_path
                                )}
                                className={`flex-none object-cover rounded-md w-[250px] h-[350px]}`}
                                alt=""
                            />
                            <div className="flex items-center gap-4">
                                {externals?.facebook_id && (
                                    <a
                                        href={`https://www.facebook.com/${externals?.facebook_id}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <FbIcon size={30} />
                                    </a>
                                )}
                                {externals?.instagram_id && (
                                    <a
                                        href={`https://www.instagram.com/${externals?.instagram_id}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <IgIcon size={30} />
                                    </a>
                                )}
                                {externals?.twitter_id && (
                                    <a
                                        href={`https://twitter.com/${externals?.twitter_id}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <TwitterIcon size={30} />
                                    </a>
                                )}
                                {externals?.youtube_id && (
                                    <a
                                        href={`https://youtube.com/${externals?.youtube_id}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <YoutubeIcon size={30} />
                                    </a>
                                )}
                            </div>
                            <div
                                className={`flex  gap-4 flex-col items-center justify-center`}
                            >
                                <span className="text-[20px] font-semibold">
                                    Personal Info
                                </span>
                                <div className="flex flex-col items-center justify-center">
                                    <span className="text-[18px] font-semibold">
                                        Known For
                                    </span>
                                    <span className="italic text-[#ccc]">
                                        {person?.known_for_department}
                                    </span>
                                </div>
                                <div className="flex flex-col items-center justify-center">
                                    <span className="text-[18px] font-semibold">
                                        Gender
                                    </span>
                                    <span className="italic text-[#ccc]">
                                        {person?.gender === 1
                                            ? "Femail"
                                            : "Mail"}
                                    </span>
                                </div>
                                <div className="flex flex-col items-center justify-center">
                                    <span className="text-[18px] font-semibold">
                                        Birthday
                                    </span>
                                    <span className="italic text-[#ccc]">
                                        {person?.birthday}
                                    </span>
                                </div>
                                <div className="flex flex-col justify-center items-center">
                                    <span className="text-[18px] font-semibold">
                                        Also Known As
                                    </span>
                                    <div
                                        className={`flex flex-col gap-2 items-center justify-center `}
                                    >
                                        {person?.also_known_as?.map(
                                            (name, index) => (
                                                <span
                                                    key={index}
                                                    className="italic text-[#ccc] text-center"
                                                >
                                                    {name}
                                                </span>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className=" col-span-2">
                            <span className="text-[25px] font-bold cursor-pointer hover:text-primary">
                                {person?.name}
                            </span>
                            <div className="flex flex-col gap-3 mb-10">
                                <span className="text-[20px] font-semibold">
                                    Biography
                                </span>
                                <div className="text-justify flex flex-col gap-1">
                                    <p>
                                        {showAllBio ? (
                                            <ParagraphComponent />
                                        ) : (
                                            truncatedParagraph
                                        )}
                                        {paragraph?.length > limit &&
                                            !showAllBio &&
                                            readMoreLink}
                                    </p>
                                </div>
                            </div>
                            <span className="py- text-[25px] font-semibold">
                                Credits
                            </span>
                            <div>
                                <Swiper
                                    slidesPerView={slides}
                                    loop={true}
                                    spaceBetween={20}
                                >
                                    {movieCredits?.cast
                                        .slice(0, 20)
                                        .map((item) => (
                                            <SwiperSlide key={item?.id}>
                                                <MovieCard
                                                    id={item.id}
                                                    typeImg="original"
                                                    url={item?.poster_path}
                                                    title={
                                                        item?.title ||
                                                        item?.name
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
                        </div>
                    </div>
                </div>
            ) : (
                <Loading />
            )}
        </div>
    );
};

export default DetailPerson;
