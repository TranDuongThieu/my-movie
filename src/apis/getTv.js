import axios from "../axios";
export const getAllTv = (page) =>
    new Promise(async (resolve, reject) => {
        try {
            const res = await axios({
                url: "/discover/tv",
                method: "get",
                params: {
                    api_key: "1016db774bb72a6f95ad18a8797f0005",
                    page: page,
                    language: "en-US",
                    sort_by: "vote_count.desc",
                    include_adult: "true",
                },
            });
            resolve(res);
        } catch (error) {
            reject(error);
        }
    });
export const getTvOnAiring = (page) =>
    new Promise(async (resolve, reject) => {
        try {
            const res = await axios({
                url: "/tv/airing_today",
                method: "get",
                params: {
                    api_key: "1016db774bb72a6f95ad18a8797f0005",
                    page: page,
                    language: "en-US",
                    sort_by: "vote_count.desc",
                    include_adult: "true",
                },
            });
            resolve(res);
        } catch (error) {
            reject(error);
        }
    });
    export const getTopRatedTv = (page) =>
    new Promise(async (resolve, reject) => {
        try {
            const res = await axios({
                url: "/tv/top_rated",
                method: "get",
                params: {
                    api_key: "1016db774bb72a6f95ad18a8797f0005",
                    page: page,
                    language: "en-US",
                    sort_by: "vote_count.desc",
                },
            });
            resolve(res);
        } catch (error) {
            reject(error);
        }
    });