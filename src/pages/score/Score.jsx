import React from "react";
import "./Score.scss";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import {
  subjectArr,
  classArr,
  termArr,
  schoolYearArr,
} from "../../config/getAPI";
import { Link } from "react-router-dom";
export const Score = () => {
  //tạo options cho select
  const classNameArr = classArr.map((item) => {
    return { value: item.ID, text: item.Name };
  });

  const subjectNameArr = subjectArr.map((item) => {
    return { value: item.ID, text: item.Name };
  });

  const termNameArr = termArr.map((item) => {
    return { value: item.ID, text: item.Name };
  });
  const schoolYearNameArr = schoolYearArr.map((item) => {
    return { value: item.ID, text: item.Name };
  });

  // const getValues = () => {
  //   const className =
  //     document.querySelector(".select").selectedOptions[0].innerText;
  //   const schoolYear =
  //     document.querySelector(".select ~ .select").selectedOptions[0].innerText;
  //   return {
  //     className: className,
  //     schoolYear: schoolYear,
  //   };
  // };

  return (
    <div className="score">
      <h3>Tạo bảng điểm môn</h3>

      <div className="grid">
        <div className="row">
          <Input
            type="select"
            // placeholder="Nhập tên lớp..."
            labelText="Tên lớp"
            selectName="ClassName"
            options={classNameArr}
          />
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
        {/* <Button
          btnType="clear"
          innerText={<Link to="/score/create-score">Tạo danh sách mới</Link>}
        /> */}
        <Button
          btnType="add"
          innerText={<Link to="/score/create-score">Tạo</Link>}
        />
      </div>
    </div>
  );
};
