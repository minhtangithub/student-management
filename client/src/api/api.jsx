import axiosClient from "./axiosClient";

export const api = {
  //GET
  getAStudentInfo: (ID, params) => {
    const url = "student/" + String(ID);
    return axiosClient.get(url, params);
  },
  getStudentInfoArr: (params) => {
    const url = "student";
    return axiosClient.get(url, params);
  },
  getClassListArr: (params) => {
    const url = "classList";
    return axiosClient.get(url, params);
  },
  //   getStudentScoreArr: (params) => {
  //     const url = "score";
  //     return axiosClient.get(url, params);
  //   },
  getReportSubjects: (params) => {
    const url = "reportedSubject";
    return axiosClient.get(url, params);
  },
  getReportTerm: (params) => {
    const url = "reportedTerm";
    return axiosClient.get(url, params);
  },
  getSettingList: (params) => {
    const url = "setting";
    return axiosClient.get(url, params);
  },
  //   getClassArr: (params) => {
  //     const url = "student";
  //     return axiosClient.get(url, params);
  //   },
  getSubjectList: (params) => {
    const url = "subject";
    return axiosClient.get(url, params);
  },
  getTermList: (params) => {
    const url = "term";
    return axiosClient.get(url, params);
  },
  getSchoolYearList: (params) => {
    const url = "schoolYear";
    return axiosClient.get(url, params);
  },
  getGradeList: (params) => {
    const url = "grade";
    return axiosClient.get(url, params);
  },
  getCCLASS: (params) => {
    const url = "class";
    return axiosClient.get(url, params);
  },
  getA_CCLASS: (id, params) => {
    const url = "class/" + String(id);
    return axiosClient.get(url, params);
  },
  getScoreSchoolYear: (params) => {
    const url = "scoreSchoolYear";
    return axiosClient.get(url, params);
  },
  getScoreSubject: (params) => {
    const url = "scoreSubject";
    return axiosClient.get(url, params);
  },
  getCoEff: (params) => {
    const url = "coEff";
    return axiosClient.get(url, params);
  },

  //POST******************************************************
  postNewStudentInfo: (payload) => {
    const url = "student";
    return axiosClient.post(url, payload);
  },
  postNewClassList: (payload) => {
    const url = "class";
    return axiosClient.post(url, payload);
  },
  //   postStudentScore: (payload) => {
  //     const url = "score";
  //     return axiosClient.post(url, payload);
  //   },
  //   postClassArr: (payload) => {
  //     const url = "student";
  //     return axiosClient.post(url, payload);
  //   },
  postSubjectList: (payload) => {
    const url = "subject";
    return axiosClient.post(url, payload);
  },
  postClassList: (payload) => {
    const url = "classList";
    return axiosClient.post(url, payload);
  },
  postClassWithStudents: (payload) => {
    const url = "class";
    return axiosClient.post(url, payload);
  },
  postScoreSubject: (payload) => {
    const url = "scoreSubject";
    return axiosClient.post(url, payload);
  },
  postReportSubject: (payload) => {
    const url = "reportedSubject";
    return axiosClient.post(url, payload);
  },
  postReportTerm: (payload) => {
    const url = "reportedTerm";
    return axiosClient.post(url, payload);
  },

  //PUT***************************
  putSubjectList: (id, payload) => {
    const url = "subject/" + String(id);
    return axiosClient.put(url, payload);
  },
  putClassList: (id, payload) => {
    const url = "classList/" + String(id);
    return axiosClient.put(url, payload);
  },
  putSettingList: (id, payload) => {
    const url = "setting/" + String(id);
    return axiosClient.put(url, payload);
  },
  putScoreSchoolYear: (id, payload) => {
    const url = "scoreSchoolYear/" + String(id);
    return axiosClient.put(url, payload);
  },
  putStudentInfo: (id, payload) => {
    const url = "student/" + String(id);
    return axiosClient.put(url, payload);
  },
  putCCLASS: (id, payload) => {
    const url = "class/" + String(id);
    return axiosClient.put(url, payload);
  },

  //DELETE*****************************
  deleteSubjectList: (id) => {
    const url = "subject/" + String(id);
    return axiosClient.delete(url);
  },
  deleteClassList: (id) => {
    const url = "classList/" + String(id);
    return axiosClient.delete(url);
  },
  deleteCLASS: (id) => {
    const url = "class/" + String(id);
    return axiosClient.delete(url);
  },
  deleteScoreSchoolYear: (id) => {
    const url = "scoreSchoolYear/" + String(id);
    return axiosClient.delete(url);
  },
  deleteScoreSubject: (id) => {
    // console.log("delete from api");
    const url = "scoreSubject/" + String(id);
    return axiosClient.delete(url);
  },
  deleteReportSubject: (id) => {
    console.log("delete from api");
    const url = "reportedSubject/" + String(id);
    return axiosClient.delete(url);
  },
  deleteReportTerm: (id) => {
    console.log("delete from api");
    const url = "reportedTerm/" + String(id);
    return axiosClient.delete(url);
  },
};
