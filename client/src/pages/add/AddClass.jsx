import React from "react";
import "./AddClass.scss";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Notification } from "../../components/Notification";
import { classArr, schoolYearArr, gradeArr } from "../../config/getAPI";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { api } from "../../api/api";
import { useState, useEffect } from "react";

export const AddClass = () => {
  let history = useHistory();
  const [classArrState, setClassArrState] = useState([]);
  const [gradeArrState, setGradeArrState] = useState([]);
  const [schoolYearArrState, setSchoolYearArrState] = useState([]);
  const [message, setMessage] = useState("");

  //tạo options cho select
  const classNameArr = classArr.map((item) => {
    return { value: item.ID, text: item.nameClass };
  });
  // const gradeNameArr = gradeArr.map((item) => {
  //   return { value: item.ID, text: item.Name };
  // });
  // const schoolYearNameArr = schoolYearArr.map((item) => {
  //   return { value: item.ID, text: item.Name };
  // });

  useEffect(() => {
    const getData = async () => {
      const gradeArr = await api.getGradeList();
      // const classArr = await api.getTermList();
      const schoolYearArr = await api.getSchoolYearList();
      const UIgradeArr = gradeArr.map((item) => {
        return {
          text: item.gradeName,
        };
      });
      // const UIClassArr = termArr.map((item) => {
      //   return {
      //     text: item.nameClass,
      //   };
      // });
      const UISchoolYearArr = schoolYearArr.map((item) => {
        return {
          text: item.nameSchYear,
        };
      });
      // console.log(subjectArr, UIsubjectArr);
      setGradeArrState(UIgradeArr);
      // setClassArrState(UItermArr);
      setClassArrState(classNameArr);
      setSchoolYearArrState(UISchoolYearArr);
    };
    getData();
  }, []);

  // useEffect(() => {
  //   console.log(document.querySelectorAll(".dropdown_selected-default")[1]);
  //   const gradeValue = document.querySelector(".dropdown_selected-default")
  //     ? document.querySelectorAll(".dropdown_selected-default")[0].innerText
  //     : "";
  //   const newClassArrState = classNameArr.filter((item) =>
  //     item.text.includes(gradeValue)
  //   );
  //   console.log("set new state");
  //   setClassArrState(newClassArrState);
  // }, [
  //   document.querySelector(".dropdown_selected-default")
  //     ? document.querySelectorAll(".dropdown_selected-default")[0].innerText
  //     : null,
  // ]);

  const onChangeSelect = () => {
    const gradeValue = document.querySelector(".dropdown_selected-default")
      ? document.querySelectorAll(".dropdown_selected-default")[0].innerText
      : "";
    const newClassArrState = classNameArr.filter((item) =>
      item.text.includes(gradeValue)
    );
    console.log("set new state");
    setClassArrState(newClassArrState);
  };

  const getSelectedOptions = () => {
    let optionValues = [];
    document.querySelectorAll(".dropdown_selected-default").forEach((item) => {
      optionValues.push(item.innerText);
    });
    return optionValues;
  };

  const handleClickCreateBtn = () => {
    const [grade, className, schoolYear] = getSelectedOptions();
    console.log(className, grade);
    if (className.includes(grade)) {
      history.push(`add-class/${className}/${grade}/${schoolYear}`);
    } else {
      setMessage("Lớp phải thuộc khối");
      document.querySelector(
        ".notification--failed"
      ).parentElement.style.display = "flex";
    }
  };

  return (
    <div className="add-class">
      <Notification status="failed" message={message} />
      <h3>Lập danh sách lớp</h3>

      <div className="grid">
        <div className="row">
          <Input
            type="select"
            labelText="Tên khối"
            selectName="GradeName"
            options={gradeArrState}
            onChangeSelect={onChangeSelect}
          />
          <Input
            type="select"
            labelText="Tên lớp"
            selectName="ClassName"
            options={classArrState}
          />
        </div>
        <div className="row">
          <Input
            type="select"
            labelText="Năm học"
            selectName="SchoolYear"
            options={schoolYearArrState}
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
