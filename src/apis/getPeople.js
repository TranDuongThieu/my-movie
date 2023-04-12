import axios from "../axios";
export const getPopularPeople = (page) =>
    new Promise(async (resolve, reject) => {
        try {
            const res = await axios({
                url: "/person/popular",
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
export const getExternals = (id) =>
    new Promise(async (resolve, reject) => {
        try {
            const res = await axios({
                url: `/person/${id}/external_ids`,
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

export const getCredits = (id, type_credits) =>
    new Promise(async (resolve, reject) => {
        try {
            const res = await axios({
                url: `/person/${id}/${type_credits}`,
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
