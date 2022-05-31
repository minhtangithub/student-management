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
  getTermList: (params) => {
    const url = "termRoute";
    return axiosClient.get(url, params);
  },
  getSchoolYearList: (params) => {
    const url = "schoolYears";
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
  putSettingList: (id, payload) => {
    const url = "settings/" + String(id);
    return axiosClient.put(url, payload);
  },
  //   postClassArr: (payload) => {
  //     const url = "students";
  //     return axiosClient.post(url, payload);
  //   },
  putSubjectList: (id, payload) => {
    const url = "subjects/" + String(id);
    return axiosClient.put(url, payload);
  },
  postSubjectList: (payload) => {
    const url = "subjects";
    return axiosClient.post(url, payload);
  },
  deleteSubjectList: (id) => {
    const url = "subjects/" + String(id);
    return axiosClient.delete(url);
  },
};
