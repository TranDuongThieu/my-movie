import React, { useState } from "react";
import paths from "../utils/path";
import { CloseIcon, StarIcon } from "../utils/icons";
import un_user from "../assets/un_user.svg";
import { useSelector } from "react-redux";
import { widthSelector } from "../store/widthSelector";
const Reviews = ({ title, allReviews, review }) => {
    const [showFullParagraph, setShowFullParagraph] = useState(false);
    const [showAllReviews, setShowAllReviews] = useState(false);
    const ParagraphComponent = () => (
        <div className="flex flex-col gap-1">
            {review?.content.split("\n").map((item) => (
                <span>{item}</span>
            ))}
        </div>
    );
    const width = useSelector(widthSelector);
    const formatPath = (path) => {
        if (path) {
            if (path?.includes("https")) {
                return path.slice(1, path.length - 1);
            } else return paths.img("original", path);
        } else return un_user;
    };
    const paragraph = review?.content;
    const toggleParagraph = (event) => {
        event.preventDefault();
        setShowFullParagraph(!showFullParagraph);
    };
    const truncateString = (str, num) => {
        if (str?.length <= num) {
            return str;
        }
        return str?.slice(0, num) + " ... ";
    };
    const handleShowAllReviews = () => {
        setShowAllReviews(true);
    };
    const limit = 500; // number of words to show before "Read More"
    const truncatedParagraph = truncateString(paragraph, limit);
    const readMoreLink = (
        <span
            className="border-b-[1px] cursor-pointer hover:text-primary hover:border-b-primary duration-200"
            onClick={toggleParagraph}
        >
            Read More
        </span>
    );
    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-4 rounded-lg border-[1px] px-4 py-3">
                <div className="flex items-center gap-2">
                    <img
                        src={formatPath(review?.author_details.avatar_path)}
                        alt=""
                        className="w-12 h-12 rounded-full"
                    />
                    <span className="text-[20px] font-semibold ">
                        {review?.author}
                    </span>
                    <div className="flex items-center gap-1 rounded-sm px-2 bg-primary">
                        <StarIcon />
                        <span>{review?.author_details.rating}</span>
                    </div>
                </div>
                <div className="flex flex-col gap-1 text-justify">
                    <p>
                        {showFullParagraph ? (
                            <ParagraphComponent />
                        ) : (
                            truncatedParagraph
                        )}
                        {paragraph?.length > limit &&
                            !showFullParagraph &&
                            readMoreLink}
                    </p>
                </div>
            </div>
            <span
                className="border-b-[1px] w-fit font-semibold mx-2 cursor-pointer hover:text-primary hover:border-b-primary duration-200"
                onClick={handleShowAllReviews}
            >
                Read All Reviews
            </span>
            {showAllReviews && (
                <div
                    className="bg-[rgba(0,0,0,0.5)] fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center"
                    onClick={(e) => {
                        e.stopPropagation();
                        setShowAllReviews(false);
                    }}
                ></div>
            )}
            {showAllReviews && (
                <div className="w-[90%] h-[90%] fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-slate-100 z-50 rounded-lg  flex flex-col gap-5 text-black ">
                    <div className="min-h-[80px] w-full sticky bg-[#282828] text-white top-0 z-50 rounded-t-lg flex justify-center items-center">
                        <div className={`${width >2 ? "text-[22px]" :"text-[15px]"}`}>
                            All Reviews Of {title}
                        </div>
                        <div
                            className="absolute right-1 top-1 p-2 bg-[#3a3b3c] text-white rounded-full cursor-pointer hover:bg-[#525252]"
                            onClick={() => setShowAllReviews(false)}
                        >
                            {" "}
                            <CloseIcon size={width >2 ?16 :12} />
                        </div>
                    </div>
                    <div className={` overflow-x-hidden overflow-y-scroll ${width >2 ?"px-3 py-4 ":"px-1 py-1"}`}>
                        {allReviews?.map((oneReview) => (
                            <div className={`${width >2 ?"  flex gap-4 mb-6" :"flex flex-col gap-2 mb-6"}`}>
                                <img
                                    src={formatPath(
                                        oneReview.author_details.avatar_path
                                    )}
                                    className="w-12 h-12 rounded-full border-[1px] flex-none"
                                    alt=""
                                />
                                <div className="flex-auto px-3 py-2 bg-slate-200 rounded-md">
                                    <div className="flex items-center gap-2">
                                        <span className="text-[18px] font-semibold">
                                            {oneReview?.author}
                                        </span>
                                        <div className="flex items-center ">
                                            <StarIcon />
                                            <span>
                                                {
                                                    oneReview?.author_details
                                                        .rating
                                                }
                                            </span>
                                        </div>
                                    </div>
                                    <div className={`flex flex-col gap-1 text-justify`}>
                                        {oneReview?.content
                                            .split("\n")
                                            .map((item) => (
                                                <span>{item}</span>
                                            ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Reviews;
