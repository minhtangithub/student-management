import React from "react";
import "./AddClass.scss";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { classArr, schoolYearArr, gradeArr } from "../../config/getAPI";
import { Link } from "react-router-dom";
export const AddClass = () => {
  //tạo options cho select
  const classNameArr = classArr.map((item) => {
    return { value: item.ID, text: item.Name };
  });
  const gradeNameArr = gradeArr.map((item) => {
    return { value: item.ID, text: item.Name };
  });
  const schoolYearNameArr = schoolYearArr.map((item) => {
    return { value: item.ID, text: item.Name };
  });

  // const schoolYearArr = [
  //   { value: "2018-2019", text: "2018-2019" },
  //   { value: "2019-2020", text: "2019-2020" },
  //   { value: "2021-2022", text: "2020-2021" },
  //   { value: "2022-2023", text: "2021-2022" },
  // ];
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
    <div className="add-class">
      <h3>Lập danh sách lớp</h3>

      <div className="grid">
        <div className="row">
          <Input
            type="select"
            labelText="Tên lớp"
            selectName="ClassName"
            options={classNameArr}
          />
          <Input
            type="select"
            labelText="Tên khối"
            selectName="GradeName"
            options={gradeNameArr}
          />
        </div>
        <div className="row">
          <Input
            type="select"
            labelText="Năm học"
            selectName="SchoolYear"
            options={schoolYearNameArr}
          />
        </div>
      </div>
      <div className="btns">
        {/* <Button
          btnType="clear"
          innerText={<Link to="/add-class/create-class">Tạo mới</Link>}
        /> */}
        <Button
          btnType="add"
          innerText={<Link to="/add-class/create-class">Tạo</Link>}
        />
      </div>
    </div>
  );
};
