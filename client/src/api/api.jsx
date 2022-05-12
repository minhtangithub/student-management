import axiosClient from "./axiosClient";

export const api = {
  //GET
  getStudentInfoArr: (params) => {
    const url = "students";
    return axiosClient.get(url, params);
  },
  getClassListArr: (params) => {
    const url = "classes";
    return axiosClient.get(url, params);
  },
  //   getStudentScoreArr: (params) => {
  //     const url = "score";
  //     return axiosClient.get(url, params);
  //   },
  getReportSubjects: (params) => {
    const url = "reportedSubjects";
    return axiosClient.get(url, params);
  },
  getReportTerm: (params) => {
    const url = "reportedTerms";
    return axiosClient.get(url, params);
  },
  getSettingList: (params) => {
    const url = "settings";
    return axiosClient.get(url, params);
  },
  //   getClassArr: (params) => {
  //     const url = "students";
  //     return axiosClient.get(url, params);
  //   },
  getSubjectList: (params) => {
    const url = "subjects";
    return axiosClient.get(url, params);
  },

  //POST
  postNewStudentInfo: (payload) => {
    const url = "students";
    return axiosClient.post(url, payload);
  },
  postNewClassList: (payload) => {
    const url = "classes";
    return axiosClient.post(url, payload);
  },
  //   postStudentScore: (payload) => {
  //     const url = "score";
  //     return axiosClient.post(url, payload);
  //   },
  postSettingList: (payload) => {
    const url = "settings";
    return axiosClient.post(url, payload);
  },
  //   postClassArr: (payload) => {
  //     const url = "students";
  //     return axiosClient.post(url, payload);
  //   },
  postSubjectList: (payload) => {
    const url = "subjects";
    return axiosClient.post(url, payload);
  },
};
