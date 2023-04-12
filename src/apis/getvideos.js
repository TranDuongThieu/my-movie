import axios from "../axios";
export const getVideos = (media_type,id) =>
    new Promise(async (resolve, reject) => {
        try {
            const res = await axios({
                url: `/${media_type}/${id}/videos`,
                method: "get",
                params: {
                    api_key: "1016db774bb72a6f95ad18a8797f0005",
                    language : "en-US",
                    page:1,
                },
            });
            resolve(res);
        } catch (error) {
            reject(error);
        }
    });