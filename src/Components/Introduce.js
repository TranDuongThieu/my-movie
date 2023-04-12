import React from "react";
import Footer from "./Footer";
const intro = [
    "Your one-stop destination for all things related to movies and TV shows. Our website is designed to bring you the latest news, trailers, reviews, and information on all your favorite films and shows. With our user-friendly interface and easy navigation, you can find everything you need to know about the latest releases and upcoming blockbusters.MyMovie has something for everyone. So come explore our website today and start watching your favorite trailers and discovering new movies and TV shows!",
    "If you like it, please share this website to your friends. That will help me to muchhhhhhh. Thanks !",
];
const Introduce = () => {
    return (
        <div className="px-5 py-10 flex flex-col gap-2 text-[#ccc] bg-[#141414] text-justify text-[12px] sm:text-[16px]">
            <span className="text-[18px] sm:text-[25px] ">
                Welcome to <span className="text-white">My</span>
                <span className="text-red-400">Movie</span>
            </span>
            <div className="text-justify flex flex-col gap-2 italic">
                {intro.map((item, key) => (
                    <span>{item}</span>
                ))}
            </div>

            <Footer />
        </div>
    );
};

export default Introduce;
