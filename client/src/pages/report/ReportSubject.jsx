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
      <h3>T???O B??O C??O T???NG K???T M??N H???C</h3>
      <div className="guide">Ch???n ?????y ????? c??c th??ng tin theo m???u b??n d?????i.</div>
      <div className="grid">
        <div className="row">
          <Input
            type="select"
            // placeholder="Nh???p t??n l???p..."
            labelText="T??n m??n"
            selectName="SubjectName"
            options={subjectArrState}
          />
        </div>
        <div className="row">
          <Input
            type="select"
            // placeholder="Nh???p t??n l???p..."
            labelText="H???c k??"
            selectName="Term"
            options={termArrState}
          />
        </div>
        <div className="row">
          <Input
            type="select"
            // placeholder="Nh???p t??n l???p..."
            labelText="N??m h???c"
            selectName="SchoolYear"
            options={schoolYearArrState}
          />
        </div>
      </div>
      <div className="btns">
        <Button btnType="add" innerText="T???o" onClick={handleClickCreateBtn} />
      </div>
    </div>
  );
};
