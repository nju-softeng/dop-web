import axois from "axios";
import API from "../../API";

// TODO: replace this hostname to dop defect service name
const API_HOST = API.agent;


export const apiDeleteDefect = (req) => {
    return axois
        .post("/addtools", req, {
            baseURL: API_HOST,
        })
        .then(getData);
};
