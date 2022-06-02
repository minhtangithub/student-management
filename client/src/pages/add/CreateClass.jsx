import React from "react";
// import { useLocation } from "react-router-dom";
// import { Search } from "../manage-score/Search";
import { studentInfoArr } from "../../config/getAPI";
import AddIcon from "../../assets/Add-icon.png";
import DeleteIcon from "../../assets/Delete-icon.png";
import { GrFormAdd } from "react-icons/gr";

import { useState, useEffect } from "react";
import "./CreateClass.scss";
import { Button } from "../../components/Button";
import { Confirm } from "../../components/Confirm";
import { classArr, schoolYearArr, gradeArr } from "../../config/getAPI";
import { Input } from "../../components/Input";
import { api } from "../../api/api";

import { useParams } from "react-router-dom";

export const CreateClass = () => {
  const { className, grade, schoolYear } = useParams();

  const classNameArr = classArr.map((item) => {
    return { value: item.ID, text: item.nameClass };
  });
  // const gradeNameArr = gradeArr.map((item) => {
  //   return { value: item.ID, text: item.Name };
  // });
  // const schoolYearNameArr = schoolYearArr.map((item) => {
  //   return { value: item.ID, text: item.Name };
  // });
  //   const [studentArrState, setStudentArrState] = useState(studentInfoArr);
  const [classArrState, setClassArrState] = useState([]);
  const [gradeArrState, setGradeArrState] = useState([]);
  const [schoolYearArrState, setSchoolYearArrState] = useState([]);
  const [studentArrState, setStudentArrState] = useState([]);
  const [studentArrTempState, setStudentArrTempState] = useState([]);
  const [newClassArrState, setNewClassArrState] = useState([]);
  const [result, setResult] = useState([]);

  const newClassInfo = {
    ID: "001",
    "Tên lớp": "10A1",
    "Sĩ số": "39",
  };

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
      const studentArr = await api.getStudentInfoArr();
      console.log(studentArr);

      // console.log(subjectArr, UIsubjectArr);
      setGradeArrState(UIgradeArr);
      // setClassArrState(UItermArr);
      setClassArrState(classNameArr);
      setSchoolYearArrState(UISchoolYearArr);
      setStudentArrState(studentArr);
    };
    getData();
  }, []);

  const handleEvent = {
    handleChangeInput: (e) => {
      const inputValue = e.target.value;
      const studentArrStateCopy = studentArrState.filter((item) => {
        for (const [key, value] of Object.entries(item)) {
          if (String(value).toLowerCase().includes(inputValue.toLowerCase()))
            return true;
        }
        return false;
      });

      const UIStudentArr = studentArrStateCopy.map((item) => {
        return {
          ID: item._id,
          fullName: item.fullName,
          dateOfBirth: item.dateOfBirth,
          gender: item.gender == "male" ? "Nam" : "Nữ",
          address: item.address,
        };
      });

      setStudentArrTempState(UIStudentArr);
    },
    handleClickSearchBtn: () => {
      const inputValue = document.querySelector(".search__input").value;
      const studentArrStateCopy = studentArrState.filter((item) => {
        for (const [key, value] of Object.entries(item)) {
          if (String(value).toLowerCase().includes(inputValue.toLowerCase()))
            return true;
        }
        return false;
      });

      const UIStudentArr = studentArrStateCopy.map((item) => {
        return {
          ID: item._id,
          fullName: item.fullName,
          dateOfBirth: item.dateOfBirth,
          gender: item.gender == "male" ? "Nam" : "Nữ",
          address: item.address,
        };
      });

      setStudentArrTempState(UIStudentArr);
      document.querySelector(".search__input").value = "";
    },
    handleClickAddBtn: (e) => {
      const addImgEl = e.target.parentNode;
      console.log(e.target);
      if (addImgEl.classList.contains("add-img")) {
        let index = +addImgEl.parentNode.getAttribute("data-set");
        let newClassArrStateCopy = JSON.parse(JSON.stringify(newClassArrState));
        let newItem = studentArrTempState[index];
        //kiểm tra nếu trùng thì không thêm
        //Nếu lấy của copy sẽ bị khác giá trị con trỏ
        if (!newClassArrState.includes(newItem.ID)) {
          newClassArrStateCopy.push(newItem.ID);
          setNewClassArrState(newClassArrStateCopy);
        }
      }
    },
    handleClickSaveBtn: () => {
      const newResult = newClassInfo;
      setResult([newResult]);
      document.querySelector(".confirm.add").style.display = "flex";
    },
    handleCancel: () => {
      document.querySelector(".confirm.add").style.display = "none";
    },
    handleConfirm: () => {
      //thêm vào danh lớp...
      // const newClass = {
      //   nameClass: className,
      //   grade: grade,
      //   schoolYear: schoolYear,
      //   students: newClassArrState,
      // };

      //hiển thị thông báo
      document.querySelector(".confirm.add .notification").style.display =
        "flex";
    },
    handleClickDeleteBtn: (e) => {
      if (e.target.classList.contains("delete-img")) {
        let index = +e.target.parentNode.getAttribute("data-set");
        let newClassArrStateCopy = newClassArrState.filter(
          (item, i) => i !== index
        );
        // let newItem = studentArrTempState[index];
        // newClassArrStateCopy.push(newItem);
        setNewClassArrState(newClassArrStateCopy);
      }
    },
  };

  return (
    <>
      <div className="create-class">
        <div className="search-page">
          {/* <Detail result={result} /> */}
          <Confirm
            confirmType="add"
            result={result}
            handleConfirmCancelBtn={handleEvent.handleCancel}
            handleConfirmAcceptBtn={handleEvent.handleConfirm}
          />
          {/* <Confirm
          confirmType="delete"
          result={result}
          handleConfirmCancelBtn={handleEvent.handleCancelToDelete}
          handleConfirmAcceptBtn={handleEvent.handleConfirmToDelete}
        /> */}
          {/* <Detail /> */}
          <h3>Lập danh sách lớp</h3>
          <h4>Chọn từ danh sách lớp đã có</h4>
          <div className="guide">
            Chọn lớp học đã có mà bạn muốn lấy danh sách học sinh
          </div>
          <div className="grid">
            <div className="row">
              {/* <label htmlFor="">Học Sinh</label> */}
              {/* chọn lớp đã có */}
              <div className="grid__item option__input">
                <Input
                  type="select"
                  labelText="Tên khối"
                  selectName="GradeName"
                  options={gradeArrState}
                />
              </div>
              <div className="grid__item option__input">
                <Input
                  type="select"
                  labelText="Tên lớp"
                  selectName="ClassName"
                  options={classArrState}
                />
              </div>
            </div>
            <div className="row">
              <div className="grid__item option__input">
                <Input
                  type="select"
                  labelText="Năm học"
                  selectName="SchoolYear"
                  options={schoolYearArrState}
                />
              </div>
              <div className="grid__item option__input">
                <div className="search__btns">
                  <button
                    className="search__button"
                    onClick={handleEvent.handleClickSearchBtn}
                  >
                    Chọn
                  </button>
                </div>
              </div>
            </div>
          </div>
          <hr></hr>
          <h4>Tìm tên học sinh</h4>
          <div className="guide">
            Tìm theo tên của học sinh mà bạn muốn thêm vào lớp
          </div>
          <div className="grid">
            <div className="row">
              <div className="grid__item">
                {/* <label htmlFor="">Học Sinh</label> */}
                <input
                  onChange={(e) => handleEvent.handleChangeInput(e)}
                  type="text"
                  placeholder="Nhập thông tin học sinh để tìm..."
                  className="search__input"
                />
              </div>
              <div className="grid__item">
                <div className="search__btns">
                  <button
                    className="search__button"
                    onClick={handleEvent.handleClickSearchBtn}
                  >
                    Tìm kiếm
                  </button>
                </div>
              </div>
            </div>
          </div>
          <hr></hr>
          <h4>Kết quả tìm kiếm</h4>
          <div className="container">
            <div className="row heading">
              <div className="item col-30-percent center al-left pl-70">
                Họ Tên
              </div>
              <div className="item col-10-percent center al-center">
                Giới Tính
              </div>
              <div className="item col-20-percent center al-center">
                Năm Sinh
              </div>
              <div className="item col-20-percent center al-center">
                Địa Chỉ
              </div>
              <div className="item col-20-percent center al-center">
                Thao tác
              </div>
            </div>

            {studentArrTempState.map((item, i) => {
              return (
                <>
                  <div className="row content">
                    <div className="item col-30-percent center pl-50 al-left">
                      {item.fullName}
                    </div>
                    <div className="item col-10-percent center al-center">
                      {item.gender}
                    </div>
                    <div className="item col-20-percent center al-center">
                      {item.dateOfBirth}
                    </div>
                    <div className="item col-20-percent center al-center">
                      {item.address}
                    </div>
                    <div className="item col-20-percent center al-center">
                      <button
                        className="search__add-btn"
                        data-set={i}
                        onClick={(e) => handleEvent.handleClickAddBtn(e)}
                      >
                        {/* <img src={AddIcon} alt="" className="add-img" /> */}
                        <i className="add-img">
                          <GrFormAdd></GrFormAdd>
                        </i>
                      </button>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
        <hr></hr>
        <div className="new-class">
          <h4>Danh sách lớp đang lập</h4>
          <div className="class-info">
            <h5>Tên lớp: {className}</h5>
            <h5>Tên khối: {grade}</h5>
            <h5>Năm học: {schoolYear}</h5>
          </div>
          <div className="container">
            <div className="row heading">
              <div className="item col-30-percent center al-center">Họ Tên</div>
              <div className="item col-10-percent center al-center">
                Giới Tính
              </div>
              <div className="item col-20-percent center al-center">
                Năm Sinh
              </div>
              <div className="item col-20-percent center al-center">
                Địa Chỉ
              </div>
              <div className="item col-20-percent center al-center">
                Thao tác
              </div>
            </div>

            {newClassArrState.map((item, i) => {
              return (
                <>
                  <div className="row content">
                    <div className="item col-30-percent center pl-50">
                      {item.fullName}
                    </div>
                    <div className="item col-10-percent center al-center">
                      {item.gender}
                    </div>
                    <div className="item col-20-percent center al-center">
                      {item.dateOfBirth}
                    </div>
                    <div className="item col-20-percent center al-center">
                      {item.address}
                    </div>
                    <div className="item col-20-percent center al-center">
                      <button
                        className="new-class__delete-btn"
                        data-set={i}
                        onClick={(e) => handleEvent.handleClickDeleteBtn(e)}
                      >
                        <img src={DeleteIcon} alt="" className="delete-img" />
                      </button>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
          <div className="btns">
            <Button
              btnType="save"
              innerText="Lưu"
              onClick={handleEvent.handleClickSaveBtn}
            ></Button>
          </div>
        </div>
      </div>
    </>
  );
};
