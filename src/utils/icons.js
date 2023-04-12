import { AiOutlineClose,AiFillFacebook,AiFillInstagram,AiOutlineTwitter, AiOutlineSearch, AiTwotoneStar,AiFillFolder, AiOutlineMenu } from "react-icons/ai";
import { GrNext, GrPrevious } from "react-icons/gr";
import { FaFilter } from "react-icons/fa";
import {BsFillPlayFill,BsPinterest} from "react-icons/bs";
import {MdEmail} from 'react-icons/md'
import { CiYoutube} from 'react-icons/ci'
export const MovieIcon = ({ color }) => (
    <svg
        stroke="currentColor"
        fill={color}
        strokeWidth="0"
        viewBox="0 0 24 24"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
    >
        <g>
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path d="M18.001 20H20v2h-8C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10a9.985 9.985 0 0 1-3.999 8zM12 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm-4 4a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm8 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm-4 4a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path>
        </g>
    </svg>
);

export const TvIcon = ({ color }) => (
    <svg
        stroke="currentColor"
        fill={color}
        strokeWidth="0"
        viewBox="0 0 24 24"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path fill="none" d="M0 0h24v24H0V0z"></path>
        <path d="M21 6h-7.59l3.29-3.29L16 2l-4 4-4-4-.71.71L10.59 6H3a2 2 0 00-2 2v12c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8a2 2 0 00-2-2zm0 14H3V8h18v12zM9 10v8l7-4z"></path>
    </svg>
);
export const SearchIcon = AiOutlineSearch;
export const CloseIcon = AiOutlineClose;
export const StarIcon = AiTwotoneStar;
export const NextIcon = GrNext;
export const PrevIcon = GrPrevious;
export const FilterIcon = FaFilter;
export const GenreIcon = AiFillFolder;
export const PlayIcon = BsFillPlayFill;
export const FbIcon = AiFillFacebook;
export const IgIcon = AiFillInstagram;
export const PinterestIcon = BsPinterest;
export const EmailIcon = MdEmail;
export const TwitterIcon = AiOutlineTwitter;
export const YoutubeIcon = CiYoutube;
export const MenuIcon = AiOutlineMenu;