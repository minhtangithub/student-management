import React from "react";
import "./CreateReportTerm.scss";

import { reportTermArr } from "../../../config/getAPI";

import { Button } from "../../../components/Button";
import { useParams } from "react-router-dom";

export const CreateReportTerm = () => {
  const { term, schoolyear } = useParams();

  return (
    <div className="create-report-term">
      <h3>Báo cáo tổng kết học kì</h3>
      <div className="score-info">
        <h4>{term}</h4>
        <h4>Năm học: {schoolyear}</h4>
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
        {reportTermArr.map((item) => (
          <div className="row content">
            <div className="item col-25-percent center al-center">
              {item.Class}
            </div>
            <div className="item col-25-percent center al-center">
              {item.Total}
            </div>
            <div className="item col-25-percent center al-center">
              {item.Passed}
            </div>
            <div className="item col-25-percent center al-center">
              {item.Rate}
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
