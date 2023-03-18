import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Components/Header";

const Public = () => {
    return (
        <div>
            <div className="h-[64px] w-full">
                <Header />
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    );
};

export default Public;
