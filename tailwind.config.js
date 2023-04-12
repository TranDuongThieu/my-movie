/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js}", "./public/index.html"],
    theme: {
        extend: {
            fontFamily: {
                rubik: "'Rubik', sans-serif",
                poppin: "'Poppins', sans-serif;",
                raleway: "'Raleway', sans-serif;",
            },
            backgroundColor: {
                primary: "#00ACC1",
                from: "#111111",
                to: "rgb(17, 17, 17, 0.7)",
            },
            textColor: {
                primary: "#00ACC1",
            },
            borderColor: {
                primary: "#00ACC1",
            },
        },
    },
    plugins: [],
};
