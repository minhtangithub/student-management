import React from "react";
import "./CreateReportTerm.scss";

// import { reportTermArr } from "../../../config/getAPI";
import { useState, useEffect } from "react";

import { Button } from "../../../components/Button";
import { useParams } from "react-router-dom";
import { api } from "../../../api/api";

export const CreateReportTerm = () => {
  const { term, schoolYear } = useParams();
  const [termState, setTermState] = useState([]);
  const [schoolYearState, setSchoolYearState] = useState([]);
  const [scoreSchoolYearState, setScoreSchoolYearState] = useState([]);
  const [classArr, setClassArrState] = useState([]);
  const [reportTermState, setReportTermState] = useState([]);
  let subjectID, termID, schoolYearID;

  useEffect(() => {
    const getData = async () => {
      // const apiArr = await api.getReportSubjects();
      const termArr = await api.getTermList();
      const schoolYearArr = await api.getSchoolYearList();
      const scoreArr = await api.getScoreSchoolYear();
      const classArray = await api.getCCLASS();
      const reportTerm = await api.getReportTerm();

      termID = termArr.find((item) => item.nameTerm === term)._id;
      schoolYearID = schoolYearArr.find(
        (item) => item.nameSchYear === schoolYear
      )._id;

      if (scoreArr.find((item) => !item.schoolYearAvgScore)) {
        //tính điểm trung bình năm nếu có cái chưa tính
        scoreArr.forEach((item) => {
          let min15 = item.scoreTerms[0] ? item.scoreTerms[0].termAvgScore : 0;
          let per1 = item.scoreTerms[1] ? item.scoreTerms[1].termAvgScore : 0;
          item.schoolYearAvgScore = Number((min15 + per1) / 2).toFixed(2);
          api.putScoreSchoolYear(item);
        });
        setScoreSchoolYearState(scoreArr);
      }

      //Ma trận cấp ba giữa học kì, môn, ds lớp -> mỗi ô sẽ tạo thành 1 report
      termArr.forEach((thisTerm) => {
        classArray.forEach((thisClass) => {
          let thisSchoolYear = schoolYearArr.find(
            (item) => item._id === thisClass.schoolYear
          );

          let isThereScore = scoreArr.find(
            (score) =>
              score.cClass === thisClass._id && score.term === thisTerm._id
          );

          let isThereReport = reportTerm.find(
            (report) =>
              report.cClass === thisClass._id && report.term === thisTerm._id
          );

          //Nếu có điểm nhưng chưa có trong báo cáo thì thêm vào báo cáo
          if (isThereScore && !isThereReport) {
            let total = thisClass.students.length;
            let passed = 0,
              rate;
            scoreArr.forEach((score) => {
              if (
                score.cClass === thisClass._id &&
                score.term === thisTerm._id &&
                score.avgScore >= 5
              ) {
                passed++;
              }
            });
            let rateNumber = ((passed * 100) / total).toFixed(2);
            rate = rateNumber + "%";

            api.postReportSubject({
              cClass: thisClass._id,
              term: thisTerm._id,
              schoolYear: thisSchoolYear._id,
              totalStudents: total,
              passed: passed,
              rate: rate,
            });
          }
        });
      });

      const newReportSubject = await api.getReportTerm();
      const UIarr = newReportSubject.filter(
        (item) =>
          item.term === termID &&
          item.schoolYear === schoolYearID &&
          item.subject === subjectID
      );

      setScoreSchoolYearState(scoreArr);
      setClassArrState(classArray);
      setSchoolYearState(schoolYearArr);
      setTermState(termArr);
      setReportTermState(UIarr);
    };
    getData();
  }, []);

  return (
    <div className="create-report-term">
      <h3>Báo cáo tổng kết học kì</h3>
      <div className="score-info">
        <h4>{term}</h4>
        <h4>Năm học: {schoolYear}</h4>
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
        {reportTermState.map((item) => (
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
