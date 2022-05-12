import React from "react";
import "./ReportTerm.scss";
import { Link } from "react-router-dom";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { schoolYearArr, termArr } from "../../config/getAPI";

export const ReportTerm = () => {
  const termNameArr = termArr.map((item) => {
    return { value: item.ID, text: item.Name };
  });
  const schoolYearNameArr = schoolYearArr.map((item) => {
    return { value: item.ID, text: item.Name };
  });
  return (
    <div className="report-term">
      <h3>Tạo báo cáo tổng kết học kì</h3>
      <div className="grid">
        <div className="row">
          <Input
            type="select"
            // placeholder="Nhập tên lớp..."
            labelText="Học kì"
            selectName="Term"
            options={termNameArr}
          />
        </div>
        <div className="row">
          <Input
            type="select"
            // placeholder="Nhập tên lớp..."
            labelText="Năm học"
            selectName="SchoolYear"
            options={schoolYearNameArr}
          />
        </div>
      </div>
      <div className="btns">
        <Button
          btnType="add"
          innerText={<Link to="/report-subject/1">Tạo</Link>}
        />
      </div>
    </div>
  );
};
