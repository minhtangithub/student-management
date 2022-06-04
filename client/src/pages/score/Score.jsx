import React from "react";
import "./Score.scss";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Confirm } from "../../components/Confirm";
// import {
//   subjectArr,
//   classArr,
//   termArr,
//   schoolYearArr,
// } from "../../config/getAPI";
import { useState, useEffect } from "react";
import { api } from "../../api/api";
import { useHistory } from "react-router-dom";

export const Score = () => {
  let history = useHistory();
  const [classArrState, setClassArrState] = useState([]);
  const [CCLASSState, setCCLASSArrState] = useState([]);
  const [subjectArrState, setSubjectArrState] = useState([]);
  const [termArrState, setTermArrState] = useState([]);
  const [schoolYearArrState, setSchoolYearArrState] = useState([]);
  const [scoreArrState, setScoreArrState] = useState([]);
  // const [termIDState, setTermIDState] = useState("");
  // const [subjectIDState, setSubjectIDState] = useState("");
  // const [schoolYearIDState, setSchoolYearIDState] = useState("");
  // const [classIDState, setClassIDState] = useState("");
  //tạo options cho select
  // const classNameArr = classArr.map((item) => {
  //   return { value: item.ID, text: item.nameClass };
  // });

  // const subjectNameArr = subjectArr.map((item) => {
  //   return { value: item.ID, text: item.Name };
  // });

  // const termNameArr = termArr.map((item) => {
  //   return { value: item.ID, text: item.Name };
  // });
  // const schoolYearNameArr = schoolYearArr.map((item) => {
  //   return { value: item.ID, text: item.Name };
  // });

  useEffect(() => {
    const getData = async () => {
      const scoreArr = await api.getScoreSubject();
      const subjectArr = await api.getSubjectList();
      const termArr = await api.getTermList();
      const classArr = await api.getClassListArr();
      const CLASS = await api.getCCLASS();
      const schoolYearArr = await api.getSchoolYearList();
      const UIsubjectArr = subjectArr.map((item) => {
        return {
          ...item,
          text: item.nameSubject,
        };
      });
      const UItermArr = termArr.map((item) => {
        return {
          ...item,
          text: item.nameTerm,
        };
      });
      const UISchoolYearArr = schoolYearArr.map((item) => {
        return {
          ...item,
          text: item.nameSchYear,
        };
      });
      const UIClassArr = classArr.map((item) => {
        return {
          ...item,
          text: item.nameClass,
        };
      });

      // console.log(subjectArr, UIsubjectArr);
      setSubjectArrState(UIsubjectArr);
      setTermArrState(UItermArr);
      setSchoolYearArrState(UISchoolYearArr);
      setClassArrState(UIClassArr);
      setScoreArrState(scoreArr);
      setCCLASSArrState(CLASS);
    };
    getData();
  }, []);

  const getSelectedOptions = () => {
    let optionValues = [];
    document.querySelectorAll(".dropdown_selected-default").forEach((item) => {
      optionValues.push(item.innerText);
    });
    return optionValues;
  };

  const handleClickCreateBtn = () => {
    const [className, subject, term, schoolYear] = getSelectedOptions();
    console.log();
    let subjectID = subjectArrState.find(
      (item) => item.nameSubject === subject
    )._id;
    let termID = "6299d1a3197adb1f05703d97";
    let schoolYearID = schoolYearArrState.find(
      (item) => item.nameSchYear === schoolYear
    )._id;
    console.log(classArrState);
    let classID = CCLASSState.find(
      (item) => item.nameClass === className && item.schoolYear === schoolYearID
    )._id;

    let isExisted =
      scoreArrState.filter(
        (item) => item.cClass === classID && item.subject === subjectID
        //&& item.term === termID
      ).length > 0;
    console.log(isExisted);
    if (isExisted) {
      document.querySelector(".confirm.override").style.display = "flex";
    } else {
      history.push(`score/${className}/${subject}/${term}/${schoolYear}`);
    }
    // setSubjectIDState(subjectID);
    // setTermIDState(termID);
    // setSchoolYearIDState(schoolYearID);
    // setClassIDState(classID);
  };
  const handleConfirmCancelBtn = () => {
    document.querySelector(".confirm.override").style.display = "none";
  };
  const handleConfirmAcceptBtn = () => {
    const [className, subject, term, schoolYear] = getSelectedOptions();
    history.push(`score/${className}/${subject}/${term}/${schoolYear}`);
  };
  return (
    <div className="score">
      <Confirm
        confirmType="override"
        result={[]}
        handleConfirmAcceptBtn={handleConfirmAcceptBtn}
        handleConfirmCancelBtn={handleConfirmCancelBtn}
      />
      <h3>Tạo bảng điểm môn</h3>
      <div className="guide">
        Điền thông tin môn học cần tạo bảng điểm mới. Lưu ý điền đầy đủ các
        trường
      </div>
      <div className="grid">
        <div className="row">
          <Input
            type="select"
            // placeholder="Nhập tên lớp..."
            labelText="Tên lớp"
            selectName="ClassName"
            options={classArrState}
          />
          <Input
            type="select"
            // placeholder="Nhập tên lớp..."
            labelText="Tên môn"
            selectName="SubjectName"
            options={subjectArrState}
          />
        </div>
        <div className="row">
          <Input
            type="select"
            // placeholder="Nhập tên lớp..."
            labelText="Học kì"
            selectName="Term"
            options={termArrState}
          />
          <Input
            type="select"
            // placeholder="Nhập tên lớp..."
            labelText="Năm học"
            selectName="SchoolYear"
            options={schoolYearArrState}
          />
        </div>
      </div>
      <div className="btns">
        {/* <Button
          btnType="clear"
          innerText={<Link to="/score/create-score">Tạo danh sách mới</Link>}
        /> */}
        <Button btnType="add" innerText="Tạo" onClick={handleClickCreateBtn} />
      </div>
    </div>
  );
};
