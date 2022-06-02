import React from "react";
import "./ReportSubject.scss";
import { Link } from "react-router-dom";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
// import { schoolYearArr, termArr, subjectArr } from "../../config/getAPI";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";

import { api } from "../../api/api";

export const ReportSubject = () => {
  let history = useHistory();

  // const subjectNameArr = subjectArr.map((item) => {
  //   return { value: item.ID, text: item.Name };
  // });

  // const termNameArr = termArr.map((item) => {
  //   return { value: item.ID, text: item.Name };
  // });
  // const schoolYearNameArr = schoolYearArr.map((item) => {
  //   return { value: item.ID, text: item.Name };
  // });

  const [subjectArrState, setSubjectArrState] = useState([]);
  const [termArrState, setTermArrState] = useState([]);
  const [schoolYearArrState, setSchoolYearArrState] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const subjectArr = await api.getSubjectList();
      const termArr = await api.getTermList();
      const schoolYearArr = await api.getSchoolYearList();
      const UIsubjectArr = subjectArr.map((item) => {
        return {
          text: item.nameSubject,
        };
      });
      const UItermArr = termArr.map((item) => {
        return {
          text: item.nameTerm,
        };
      });
      const UISchoolYearArr = schoolYearArr.map((item) => {
        return {
          text: item.nameSchYear,
        };
      });
      // console.log(subjectArr, UIsubjectArr);
      setSubjectArrState(UIsubjectArr);
      setTermArrState(UItermArr);
      setSchoolYearArrState(UISchoolYearArr);
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
    const [subject, term, schoolYear] = getSelectedOptions();
    history.push(`report-subject/${subject}/${term}/${schoolYear}`);
  };
  return (
    <div className="report-subject">
      <h3>TẠO BÁO CÁO TỔNG KẾT MÔN HỌC</h3>
      <div className="guide">Chọn đầy đủ các thông tin theo mẫu bên dưới.</div>
      <div className="grid">
        <div className="row">
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
        </div>
        <div className="row">
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
        <Button btnType="add" innerText="Tạo" onClick={handleClickCreateBtn} />
      </div>
    </div>
  );
};
