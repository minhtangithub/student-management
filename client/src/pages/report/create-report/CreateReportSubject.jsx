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

  useEffect(() => {
    const getData = async () => {
      const apiArr = await api.getReportSubjects();
      const UIApiArr = apiArr.filter(
        (item) =>
          item.subject == subject &&
          item.term == term &&
          item.schoolYear == schoolYear
      );
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
              {item.cClass}
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
