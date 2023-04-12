import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import tmdb from "../assets/tmdb.svg";
import ScrollToTop from "../Components/ScrollTop";
const Public = () => {
    return (
        <div className="font-rubik font-medium bg-[#111111] text-white">
            <div className="h-[80px] w-full flex justify-center bg-transparent absolute top-0 left-0 z-10">
                <div className="w-full ">
                    <Header />
                </div>
            </div>
            <div className="w-full flex justify-center">
                <div className="w-full">
                    <Outlet />
                </div>
            </div>
            <div className="w-full flex flex-col items-center justify-center min-h-[200px] gap-3 border-t-[1px]">
                <Footer />
                <div className="flex items-center gap-3">
                    <span>APIs are based on </span>
                    <a
                        href="https://developers.themoviedb.org"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <img className="w-12 h-12" src={tmdb} alt="" />
                    </a>
                </div>
            </div>
            <ScrollToTop/>
        </div>
    );
};

export default Public;
