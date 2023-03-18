import axios from "../axios";
export const getGenre = () =>
    new Promise(async (resolve, reject) => {
        try {
            const res = await axios({
                url: "/genre/list",
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
