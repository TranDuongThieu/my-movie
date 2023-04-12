import axios from "../axios";

export const searchMovies = (keywords, page) =>
    new Promise(async (resolve, reject) => {
        try {
            const res = await axios({
                url: `/search/movie`,
                method: "get",
                params: {
                    api_key: "1016db774bb72a6f95ad18a8797f0005",
                    language: "en-US",
                    page: page,
                    query: keywords,
                },
            });
            resolve(res);
        } catch (error) {
            reject(error);
        }
    });
export const searchTv = (keywords, page) =>
    new Promise(async (resolve, reject) => {
        try {
            const res = await axios({
                url: `/search/tv`,
                method: "get",
                params: {
                    api_key: "1016db774bb72a6f95ad18a8797f0005",
                    language: "en-US",
                    page: page,
                    query: keywords,
                },
            });
            resolve(res);
        } catch (error) {
            reject(error);
        }
    });

export const searchPeople = (keywords, page) =>
    new Promise(async (resolve, reject) => {
        try {
            const res = await axios({
                url: `/search/person`,
                method: "get",
                params: {
                    api_key: "1016db774bb72a6f95ad18a8797f0005",
                    language: "en-US",
                    page: page,
                    query: keywords,
                },
            });
            resolve(res);
        } catch (error) {
            reject(error);
        }
    });
