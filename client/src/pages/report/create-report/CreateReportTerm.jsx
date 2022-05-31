import React from "react";
import "./CreateReportTerm.scss";

import { reportTermArr } from "../../../config/getAPI";
import { useState, useEffect } from "react";

import { Button } from "../../../components/Button";
import { useParams } from "react-router-dom";
import { api } from "../../../api/api";

export const CreateReportTerm = () => {
  const { term, schoolYear } = useParams();
  const [reportTermState, setReportTermState] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const apiArr = await api.getReportTerm();
      const UIApiArr = apiArr.filter(
        (item) => item.term == term && item.schoolYear == schoolYear
      );
      setReportTermState(UIApiArr);
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
              {item.className}
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
