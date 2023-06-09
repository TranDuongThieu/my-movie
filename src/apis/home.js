import axios from "../axios";
export const getGenres = () =>
    new Promise(async (resolve, reject) => {
        try {
            const res = await axios({
                url: "/genre/movie/list",
                method: "get",
                params: {
                    api_key: "1016db774bb72a6f95ad18a8797f0005",
                    language: "en-US",
                },
            });
            resolve(res);
        } catch (error) {
            reject(error);
        }
    });
export const getLanguages = () =>
    new Promise(async (resolve, reject) => {
        try {
            const res = await axios({
                url: "/configuration/languages",
                method: "get",
                params: {
                    api_key: "1016db774bb72a6f95ad18a8797f0005",
                    language: "en-US",
                },
            });
            resolve(res);
        } catch (error) {
            reject(error);
        }
    });


export const getTrending = (media_type, time_window) =>
    new Promise(async (resolve, reject) => {
        try {
            const res = await axios({
                url: `/trending/${media_type}/${time_window}`,
                method: "get",
                params: {
                    api_key: "1016db774bb72a6f95ad18a8797f0005",
                },
            });
            resolve(res);
        } catch (error) {
            reject(error);
        }
    });

export const getTvOnAiring = () =>
    new Promise(async (resolve, reject) => {
        try {
            const res = await axios({
                url: `/tv/on_the_air`,
                method: "get",
                params: {
                    api_key: "1016db774bb72a6f95ad18a8797f0005",
                },
            });
            resolve(res);
        } catch (error) {
            reject(error);
        }
    });
export const getMovieNowPlaying = () =>
    new Promise(async (resolve, reject) => {
        try {
            const res = await axios({
                url: `/movie/now_playing`,
                method: "get",
                params: {
                    api_key: "1016db774bb72a6f95ad18a8797f0005",
                    language: "en-US",
                    page: 1,
                },
            });
            resolve(res);
        } catch (error) {
            reject(error);
        }
    });
