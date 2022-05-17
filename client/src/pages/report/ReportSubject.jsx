import React from "react";
import "./ReportSubject.scss";
import { Link } from "react-router-dom";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { schoolYearArr, termArr, subjectArr } from "../../config/getAPI";
import { useHistory } from "react-router-dom";

export const ReportSubject = () => {
  let history = useHistory();

  const subjectNameArr = subjectArr.map((item) => {
    return { value: item.ID, text: item.Name };
  });

  const termNameArr = termArr.map((item) => {
    return { value: item.ID, text: item.Name };
  });
  const schoolYearNameArr = schoolYearArr.map((item) => {
    return { value: item.ID, text: item.Name };
  });

  const getSelectedOptions = () => {
    let optionValues = [];
    document.querySelectorAll(".dropdown_selected-default").forEach((item) => {
      optionValues.push(item.innerText);
    });
    return optionValues;
  };

  const handleClickCreateBtn = () => {
    const [subject, term, schoolyear] = getSelectedOptions();
    history.push(`report-subject/${subject}/${term}/${schoolyear}`);
  };
  return (
    <div className="report-subject">
      <h3>TẠO BÁO CÁO TỔNG KẾT MÔN HỌC</h3>
      <div className="grid">
        <div className="row">
          <Input
            type="select"
            // placeholder="Nhập tên lớp..."
            labelText="Tên môn"
            selectName="SubjectName"
            options={subjectNameArr}
          />
        </div>
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
        <Button btnType="add" innerText="Tạo" onClick={handleClickCreateBtn} />
      </div>
    </div>
  );
};
