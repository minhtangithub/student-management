import React from "react";
import "./CreateReportSubject.scss";

import { reportSubjectArr } from "../../../config/getAPI";

import { Button } from "../../../components/Button";

export const CreateReportSubject = () => {
  return (
    <div className="create-report-subject">
      <h3>Báo cáo tổng kết môn học</h3>
      <div className="score-info">
        <h4>Học kỳ: 1</h4>
        <h4>Năm học: 2018-2019</h4>
        <h4>Môn học: Toán</h4>
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
        {reportSubjectArr.map((item) => (
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
