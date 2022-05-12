import axios from "axios";
import queryString from "query-string";

import apiConfig from "./apiConfig";

const axiosClient = axios.create({
  baseURL: apiConfig.baseUrl,
  //url gốc
  headers: {
    "Content-Type": "application/json",
  },
  //không cần quan tâm này lắm
  paramsSerializer: (params) =>
    queryString.stringify({ ...params, api_key: apiConfig.apiKey }),
  //dùng axios với mảng
});

//can thiệp trước khi gửi hoặc nhận các request/response
axiosClient.interceptors.request.use(async (config) => config);

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      const dataProcessed = response.data.map((item) => {
        return {
          ...item,
          Edit: false,
          Checked: false,
        };
      });

      return dataProcessed;
    }

    return response;
  },
  (error) => {
    throw error;
  }
);

export default axiosClient;
