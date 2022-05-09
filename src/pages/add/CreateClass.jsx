import React from "react";
// import { useLocation } from "react-router-dom";
// import { Search } from "../manage-score/Search";
import { studentInfoArr } from "../../config/getAPI";
import AddIcon from "../../assets/Add-icon.png";
import DeleteIcon from "../../assets/Delete-icon.png";
import { GrFormAdd } from "react-icons/gr";

import { useState } from "react";
import "./CreateClass.scss";
import { Button } from "../../components/Button";
import { Confirm } from "../../components/Confirm";
//================
import { classArr, schoolYearArr, gradeArr } from "../../config/getAPI";
import { Input } from "../../components/Input";

export const CreateClass = () => {
  const classNameArr = classArr.map((item) => {
    return { value: item.ID, text: item.Name };
  });
  const gradeNameArr = gradeArr.map((item) => {
    return { value: item.ID, text: item.Name };
  });
  const schoolYearNameArr = schoolYearArr.map((item) => {
    return { value: item.ID, text: item.Name };
  });
  //   const [studentArrState, setStudentArrState] = useState(studentInfoArr);
  const [studentArrTempState, setStudentArrTempState] =
    useState(studentInfoArr);
  const [newClassArrState, setNewClassArrState] = useState([]);
  const [result, setResult] = useState([]);

  const newClassInfo = {
    ID: "001",
    "Tên lớp": "10A1",
    "Sĩ số": "39",
  };

  const handleEvent = {
    handleChangeInput: (e) => {
      const inputValue = e.target.value;
      const studentArrStateCopy = studentInfoArr.filter((item) => {
        for (const [key, value] of Object.entries(item)) {
          if (String(value).toLowerCase().includes(inputValue.toLowerCase()))
            return true;
        }
        return false;
      });

      setStudentArrTempState(studentArrStateCopy);
    },
    handleClickSearchBtn: () => {
      const inputValue = document.querySelector(".search__input").value;
      const studentArrStateCopy = studentInfoArr.filter((item) => {
        for (const [key, value] of Object.entries(item)) {
          if (String(value).toLowerCase().includes(inputValue.toLowerCase()))
            return true;
        }
        return false;
      });

      setStudentArrTempState(studentArrStateCopy);
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
        if (!newClassArrState.includes(newItem)) {
          newClassArrStateCopy.push(newItem);
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
          <div className="grid">
            <div className="row">
              {/* <label htmlFor="">Học Sinh</label> */}
              {/* chọn lớp đã có */}
              <div className="grid__item option__input">
                <Input
                  type="select"
                  labelText="Tên lớp"
                  selectName="ClassName"
                  options={classNameArr}
                />
              </div>
              <div className="grid__item option__input">
                <Input
                  type="select"
                  labelText="Tên khối"
                  selectName="GradeName"
                  options={gradeNameArr}
                />
              </div>
            </div>
            <div className="row">
              <div className="grid__item option__input">
                <Input
                  type="select"
                  labelText="Năm học"
                  selectName="SchoolYear"
                  options={schoolYearNameArr}
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

            {studentArrTempState.map((item, i) => {
              return (
                <>
                  <div className="row content">
                    <div className="item col-30-percent center pl-50">
                      {item.Name}
                    </div>
                    <div className="item col-10-percent center al-center">
                      {item.Gender}
                    </div>
                    <div className="item col-20-percent center al-center">
                      {item.Birthdate}
                    </div>
                    <div className="item col-20-percent center al-center">
                      {item.Address}
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
            <h5>Tên lớp: 10A1</h5>
            <h5>Tên khối: 10</h5>
            <h5>Năm học: 2018-2019</h5>
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
                      {item.Name}
                    </div>
                    <div className="item col-10-percent center al-center">
                      {item.Gender}
                    </div>
                    <div className="item col-20-percent center al-center">
                      {item.Birthdate}
                    </div>
                    <div className="item col-20-percent center al-center">
                      {item.Address}
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
