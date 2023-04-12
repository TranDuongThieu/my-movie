import React from "react";
import paths from "../../utils/path";
import { Link } from "react-router-dom";
import no_user from "../../assets/un_user.svg";
const PeopleCard = ({ people }) => {
    
    return (
        <Link
            to={paths.detailPerson("person", people.id)}
            className=" w-full flex flex-col border-[1px] rounded-lg hover:scale-105 transition duration-300 delay-50 transform-gpu"
        >
            {people.profile_path ? (
                <img
                    src={paths.img("w470_and_h470_face", people.profile_path)}
                    alt=""
                    className="rounded-t-lg"
                />
            ) : (
                <img src={no_user} alt="" className="" />
            )}
            <div className="flex flex-col px-2 py-2">
                <span>{people.name}</span>
                <div className="w-full truncate flex">
                    {people.known_for?.map((movie, index) =>
                        index !== people.known_for.length - 1 ? (
                            <div>
                                <Link
                                    className="hover:text-primary"
                                    to={paths.detail(
                                        movie.media_type,
                                        movie.id,
                                        movie.title || movie.name
                                    )}
                                >
                                    {movie.title || movie.name}
                                </Link>
                                <span>,</span>
                            </div>
                        ) : (
                            <Link
                                className="hover:text-primary"
                                to={paths.detail(
                                    movie.media_type,
                                    movie.id,
                                    movie.title || movie.name
                                )}
                            >
                                {movie.title || movie.name}
                            </Link>
                        )
                    )}
                </div>
            </div>
        </Link>
    );
};

export default PeopleCard;
