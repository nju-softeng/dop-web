import axois from "axios";

// TODO: replace this hostname to dop defect service name
const API_HOST = "http://localhost:8081";

const getData = ({ data: res }) => {
  if (res.success) {
    return res.data;
  } else {
    throw new Error(res.errorMessage);
  }
};

export const apiDeleteDefect = (req) => {
  return axois
    .post("/defect/delete", req, {
      baseURL: API_HOST,
    })
    .then(getData);
};

export const apiGetDefectList = (req) => {
  return axois
    .post("/defect/get", req, {
      baseURL: API_HOST,
    })
    .then(getData);
};

export const apiAddPredictModel = (req) => {
  return axois
    .post("/defect/add", req, {
      baseURL: API_HOST,
    })
    .then(getData);
};

export const apiGetTrainData = (req) => {
  return axois
    .post("defect/getTrainData", req, {
      baseURL: API_HOST,
    })
    .then(getData);
};

export const apiTrainModel = (req) => {
  return axois
    .post("/defect/run", req, {
      baseURL: API_HOST,
    })
    .then(getData);
};

export const apiLocateDefect = (req) => {
  return axois
    .post("/defect/locate", req, {
      baseURL: API_HOST,
    })
    .then(getData);
};

export const apiGetPredictFileList = (req) => {
  return axois
    .post("/defect/getPredictFile", req, {
      baseURL: API_HOST,
    })
    .then(getData);
};

export const apiDeletePredict = (req) => {
  return axois
    .post("/defect/deletePredictFile", req, {
      baseURL: API_HOST,
    })
    .then(getData);
};

export const apiGetLocateList = (req) => {
  return axois
    .post("/defect/getLocateFile", req, {
      baseURL: API_HOST,
    })
    .then(getData);
};

export const apiDeleteLocate = (req) => {
  return axois
    .post("/defect/deleteLocateFile", req, {
      baseURL: API_HOST,
    })
    .then(getData);
};

/**
 * 获取文件内容
 */
export const apiGetPredictFileContent = (req) => {
  return axois
    .post("/defect/fileContent", req, {
      baseURL: API_HOST,
    })
    .then(getData);
};
