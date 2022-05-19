import React from "react";
import "./AddClass.scss";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { classArr, schoolYearArr, gradeArr } from "../../config/getAPI";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

export const AddClass = () => {
  let history = useHistory();

  //tạo options cho select
  const classNameArr = classArr.map((item) => {
    return { value: item.ID, text: item.nameClass };
  });
  const gradeNameArr = gradeArr.map((item) => {
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
    const [className, grade, schoolyear] = getSelectedOptions();
    history.push(`add-class/${className}/${grade}/${schoolyear}`);
  };

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
        <Button btnType="add" innerText="Tạo" onClick={handleClickCreateBtn} />
      </div>
    </div>
  );
};
