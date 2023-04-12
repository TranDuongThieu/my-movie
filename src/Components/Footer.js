import React from "react";
import { EmailIcon, FbIcon, IgIcon, PinterestIcon } from "../utils/icons";

const Footer = () => {
    return (
        <div className="w-fit flex flex-col gap-2 justify-center items-center">
            <span>Contact me with</span>
            <div className="flex gap-3 text-[#757575]">
                <a
                    href="https://www.facebook.com/thieu.tranduong.3"
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-md hover:text-[#ccc] duration-200"
                >
                    <FbIcon size={30} className="cursor-pointer rounded-md" />
                </a>
                <a
                    href="https://www.instagram.com/duong_thiu/"
                    target="_blank"
                    rel="noreferrer"
                    
                >
                    <IgIcon size={30} className="cursor-pointer hover:text-[#ccc] duration-200" />
                </a>
                <PinterestIcon size={30} className="cursor-pointer hover:text-[#ccc] duration-200"  />
                <EmailIcon size={30} className="cursor-pointer hover:text-[#ccc] duration-200" />
            </div>
        </div>
    );
};

export default Footer;
