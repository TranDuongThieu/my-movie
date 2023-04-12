import React from "react";
import paths from "../utils/path";
import no_img from "../assets/no_img.svg";
import { StarIcon } from "../utils/icons";
import { Link } from "react-router-dom";
const MovieCard = ({ typeImg, url, title, date, rate, type, size, id }) => {
    // function formatDate(dateString) {
    //     const date = new Date(dateString);
    //     const options = { month: "short", day: "numeric", year: "numeric" };
    //     return date.toLocaleDateString("en-US", options);
    // }
    const title_parameter = encodeURIComponent(
        title.replaceAll(" ", "-").toLowerCase()
    );
    return (
        <Link
            to={paths.detail(type, id, title_parameter)}
            className={`text-white  flex flex-col gap-6  my-5  rounded-md  cursor-pointer hover:scale-110 transition duration-300 delay-50 transform-gpu`}
        >
            <div className="relative shadow-md rounded-md  ">
                {url ? (
                    <img
                        src={paths.img(typeImg, url)}
                        alt=""
                        className={` object-cover rounded-md w-full ${
                            size === "lg" ? "h-[260px]" : "h-[225px]"
                        }`}
                    />
                ) : (
                    <div
                        className={`  rounded-md flex justify-center items-center bg-[#dbdbdb] ${
                            size === "lg" ? "h-[260px]" : "h-[225px]"
                        }`}
                    >
                        <img
                            src={no_img}
                            alt=""
                            className="w-[100px] h-[100px] object-cover "
                        />
                    </div>
                )}
                <div className="absolute top-0 bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.3)] rounded-md">
                    <div className="text-[12px]  text-white absolute bottom-0 left-0 px-2 pb-2 flex flex-col w-full bg-[rgba(0,0,0,0.3)] rounded-b-md ">
                        <span className="hover:text-primary">{title}</span>
                        <div className="flex items-center gap-2 ">
                            <div className="flex items-center ">
                                <StarIcon />
                                {Math.round(rate * 10) / 10}
                            </div>
                            <div>{date?.slice(0, 4)}</div>
                            {type && (
                                <div className="px-[4px] py-[2px] border-[1px] w-fit text-[10px] rounded-md">
                                    {type}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default MovieCard;
