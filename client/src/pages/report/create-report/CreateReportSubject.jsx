import React from "react";
import "./CreateReportSubject.scss";

// import { reportSubjectArr } from "../../../config/getAPI";
import { useState, useEffect } from "react";

import { Button } from "../../../components/Button";
import { useParams } from "react-router-dom";
import { api } from "../../../api/api";

export const CreateReportSubject = () => {
  const { subject, term, schoolYear } = useParams();
  const [reportSubjectState, setReportSubjectState] = useState([]);
  const [subjectState, setSubjectState] = useState([]);
  const [termState, setTermState] = useState([]);
  const [schoolYearState, setSchoolYearState] = useState([]);
  const [scoreSubjectState, setScoreSubjectState] = useState([]);
  const [classArr, setClassArrState] = useState([]);
  let subjectID, termID, schoolYearID;

  useEffect(() => {
    const getData = async () => {
      const apiArr = await api.getReportSubjects();
      const subjectArr = await api.getSubjectList();
      const termArr = await api.getTermList();
      const schoolYearArr = await api.getSchoolYearList();
      const scoreArr = await api.getScoreSubject();
      const classArray = await api.getCCLASS();

      subjectID = subjectArr.find((item) => item.nameSubject === subject)._id;
      termID = termArr.find((item) => item.nameTerm === term)._id;
      schoolYearID = schoolYearArr.find(
        (item) => item.nameSchYear === schoolYear
      )._id;

      // if (scoreArr.find((item) => !item.avgScore)) {
      //   //tính điểm trung bình năm nếu có cái chưa tính
      //   scoreArr.forEach((item) => {
      //     let min15 = item.scoreDetails[0]
      //       ? item.scoreDetails[0].termAvgScore
      //       : 0;
      //     let per1 = item.scoreDetails[1]
      //       ? item.scoreDetails[1].termAvgScore
      //       : 0;
      //     item.avgScore = Number((min15 + per1) / 2).toFixed(2);
      //     api.putScoreSchoolYear(item);
      //   });
      //   setScoreSchoolYearState(scoreArr);
      // }

      // if (UIApiArr.length == 0) {
      // }

      //nếu báo cáo thiếu thì thêm vào
      const classIDsInScore = scoreArr.map((item) => item.cClass);
      const classIDsSet = new Set(classIDsInScore);
      const classIDsArr = Array.from(classIDsSet);
      const classIDsArrWithNoEmpty = classIDsArr.filter(
        (item) => item !== undefined
      );
      const report = classIDsArrWithNoEmpty.map((classItem) => {
        let total = 0,
          passed = 0,
          rate;
        scoreArr.forEach((item) => {
          console.log(item.cClass, classItem);
          if (item.cClass && item.cClass === classItem) {
            total++;
            if (item.avgScore >= 5) {
              passed++;
            }
          }
        });
        let rateNumber = ((passed * 100) / total).toFixed(2);
        rate = rateNumber + "%";
        console.log(total, passed, rate);
        return {
          subject: subjectID,
          cClass: classItem,
          term: termID,
          schoolYear: schoolYearID,
          totalStudents: total,
          passed: passed,
          rate: rate,
        };
      });

      console.log("report>>>", report);

      report.forEach((reportItem) => {
        if (
          !apiArr.find(
            (item) =>
              item.cClass === reportItem.cClass &&
              item.subject === reportItem.subject &&
              item.term === reportItem.term &&
              item.schoolYear === reportItem.schoolYear
          )
        ) {
          api.postReportSubject(reportItem);
        }
      });

      const UIApiArr = report.filter(
        (item) =>
          item.subject == subjectID &&
          item.term == termID &&
          item.schoolYear == schoolYearID
      );

      console.log("report>>>", UIApiArr);

      setScoreSubjectState(scoreArr);
      setClassArrState(classArray);
      setSchoolYearState(schoolYearArr);
      setSubjectState(subjectArr);
      setTermState(termArr);
      setReportSubjectState(UIApiArr);
    };
    getData();
  }, []);

  return (
    <div className="create-report-subject">
      <h3>Báo cáo tổng kết môn học</h3>
      <div className="score-info">
        <h4>{term}</h4>
        <h4>Năm học: {schoolYear}</h4>
        <h4>Môn học: {subject}</h4>
      </div>
      <div className="container">
        <div className="row heading">
          <div className="item col-25-percent center al-center">Lớp</div>
          <div className="item col-25-percent center al-center">Sĩ số</div>
          <div className="item col-25-percent center al-center">
            Số lượng đạt
          </div>
          <div className="item col-25-percent center al-center">Tỉ lệ</div>
        </div>
        {reportSubjectState.map((item) => (
          <div className="row content">
            <div className="item col-25-percent center al-center">
              {
                classArr.find((classItem) => classItem._id === item.cClass)
                  .nameClass
              }
            </div>
            <div className="item col-25-percent center al-center">
              {item.totalStudents}
            </div>
            <div className="item col-25-percent center al-center">
              {item.passed}
            </div>
            <div className="item col-25-percent center al-center">
              {item.rate}
            </div>
          </div>
        ))}
      </div>
      <div className="btns">
        <Button innerText="Xuất kết quả" btnType="export" />
        <Button innerText="In kết quả" btnType="export" />
      </div>
    </div>
  );
};
