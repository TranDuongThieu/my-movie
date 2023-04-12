import { useState, useEffect } from "react";

function ScrollToTop() {
    const [show, setShow] = useState(false);

    const handleScroll = () => {
        setShow(window.pageYOffset > 100);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <button
            className={`z-50 fixed bottom-4 right-4 p-2 bg-gray-600 text-white rounded-full hover:bg-gray-700 focus:outline-none ${
                show ? "" : "hidden"
            }`}
            onClick={scrollToTop}
        >
            <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                fill="none"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 11l7-7 7 7M5 19l7-7 7 7"
                />
            </svg>
        </button>
    );
}

export default ScrollToTop;
