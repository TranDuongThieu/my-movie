import React from "react";
import load from "../assets/loading.svg";
const Loading = () => {
    return (
        <div className="w-screen h-screen fixed top-0 left-0 bg-[#111111]  z-50">
            <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                <img src={load} alt="" />
                <span className="text-white absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] animate-pulse duration-150 text-[18px]">
                    Loading...
                </span>
            </div>
        </div>
    );
};

export default Loading;
