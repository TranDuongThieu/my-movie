import axios from "../axios";

export const getPopularMovie = (page) =>
    new Promise(async (resolve, reject) => {
        try {
            const res = await axios({
                url: "/movie/popular",
                method: "get",
                params: {
                    api_key: "1016db774bb72a6f95ad18a8797f0005",
                    page: page,
                    language: "en-US",
                },
            });
            resolve(res);
        } catch (error) {
            reject(error);
        }
    });

    
export const getAllMovies = (page) =>
    new Promise(async (resolve, reject) => {
        try {
            const res = await axios({
                url: "/discover/movie",
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

export const getComingMovies = (page) =>
    new Promise(async (resolve, reject) => {
        try {
            const res = await axios({
                url: "/movie/upcoming",
                method: "get",
                params: {
                    api_key: "1016db774bb72a6f95ad18a8797f0005",
                    page: page,
                    language: "en-US",
                },
            });
            resolve(res);
        } catch (error) {
            reject(error);
        }
    });
export const getDetail = (media_type, id) =>
    new Promise(async (resolve, reject) => {
        try {
            const res = await axios({
                url: `/${media_type}/${id}`,
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
export const getCredits = (type, id) =>
    new Promise(async (resolve, reject) => {
        try {
            const res = await axios({
                url: `/${type}/${id}/credits`,
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

export const getRecommenedations = (type, id) =>
    new Promise(async (resolve, reject) => {
        try {
            const res = await axios({
                url: `/${type}/${id}/recommendations`,
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
