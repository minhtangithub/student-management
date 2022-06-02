import React from "react";
import "./Search.scss";
import InfoIcon from "../../assets/info-icon.png";
import EditIcon from "../../assets/edit-icon.png";
import DeleteIcon from "../../assets/Delete-icon.png";

import { Button } from "../../components/Button";
import { Detail } from "../../components/Detail";
import { Confirm } from "../../components/Confirm";
import { Notification } from "../../components/Notification";
import { useState, useEffect } from "react";
// import { studentScoreArr } from "../../config/getAPI";
import { handler, helper } from "../../handle-event/HandleEvent";
import { api } from "../../api/api";

//studentArrTemp là để hiển thị, studentScoreArr là để lưu xuống CSDL

export const Search = () => {
  const [studentArrState, setStudentArrState] = useState([]);
  const [studentInfoState, setStudentInfoState] = useState([]);
  const [classArrState, setClassArrState] = useState([]);
  const [studentArrTempState, setStudentArrTempState] = useState([]);
  const [result, setResult] = useState([]);
  const [resultUI, setResultUI] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getData = async () => {
      const scoreSchoolYearArr = await api.getScoreSchoolYear();
      const studentInfoArr = await api.getStudentInfoArr();
      const classArr = await api.getCCLASS();

      console.log(scoreSchoolYearArr, studentInfoArr, classArr);
      setStudentArrState(scoreSchoolYearArr);
      setStudentInfoState(studentInfoArr);
      setClassArrState(classArr);
    };
    getData();
  }, []);

  const handleEvent = {
    handleConfirmToDelete: () => {
      //Tạo copy
      const studentArrStateCopy = helper.generateArrCopy(studentArrState);
      let studentArrTempStateCopy = helper.generateArrCopy(studentArrTempState);

      //Cập nhật mảng dữ liệu
      const newSubjectArrStateCopy = studentArrStateCopy.filter((item, i) => {
        return item.ID !== result[0].ID;
      });
      setStudentArrState(newSubjectArrStateCopy);

      //cập nhật UI
      const newSubjectArrTempStateCopy = studentArrTempStateCopy.filter(
        (item, i) => {
          return item.ID !== result[0].ID;
        }
      );
      setStudentArrTempState(newSubjectArrTempStateCopy);

      //Cho hiện thông báo lên
      helper.turnOnNotification("delete");

      //cập nhật xuống CSDL
      //...
    },
    handleConfirmToEdit: () => {
      //kiểm tra ràng buộc dữ liệu
      let checkEmptyMessage = helper.validateData("empty", result[0]);
      let checkNumberMessage = helper.validateData("number", {
        AvgScore1: result[0].AvgScore1,
        AvgScore2: result[0].AvgScore2,
      });
      let checkClassMessage = helper.validateData("class", {
        nameClass: result[0].nameClass,
      });

      const checkMessageArr = [
        checkEmptyMessage,
        checkNumberMessage,
        checkClassMessage,
      ];
      let isValid = checkMessageArr.filter((item) => item !== "ok").length == 0;

      if (!isValid) {
        //lấy thông báo thất bại đầu tiên
        const firstFailedMessage = checkMessageArr.filter(
          (item) => item !== "ok"
        )[0];
        setMessage(firstFailedMessage);
        document.querySelector(
          ".notification--failed"
        ).parentElement.style.display = "flex";
      } else {
        //tạo copy
        const studentArrStateCopy = helper.generateArrCopy(studentArrState);
        const studentArrTempStateCopy =
          helper.generateArrCopy(studentArrTempState);

        //cập nhật ở mảng dữ liệu
        let index = studentArrStateCopy.findIndex(
          (item) => item.ID == result[0].ID
        );
        studentArrStateCopy[index] = result[0];
        studentArrStateCopy[index].Edit = false;
        setStudentArrState(studentArrStateCopy);

        //cập nhật ở UI
        let index2 = studentArrTempStateCopy.findIndex(
          (item) => item.ID == result[0].ID
        );
        studentArrTempStateCopy[index2] = result[0];
        studentArrTempStateCopy[index2].Edit = false;
        setStudentArrTempState(studentArrTempStateCopy);

        //hiển thị thông báo
        helper.turnOnNotification("edit");

        //Cập nhật xuống CSDL
        //...
      }
    },
    handleSaveBtn: (e) => {
      let studentArrStateCopy = JSON.parse(JSON.stringify(studentArrTempState));
      let index = +e.target.getAttribute("data-set");
      let inputs = e.target.closest(".row").querySelectorAll("input");
      studentArrStateCopy[index].Name = inputs[0].value;
      studentArrStateCopy[index].nameClass = inputs[1].value;
      studentArrStateCopy[index].AvgScore1 = inputs[2].value;
      studentArrStateCopy[index].AvgScore2 = inputs[3].value;

      let newValue = studentArrStateCopy[index];
      console.log(">>>newValue", newValue);
      setResult([newValue]);
      setResultUI([
        {
          "Họ tên": newValue.Name,
          Lớp: newValue.nameClass,
          "Điểm TBHKI": newValue.AvgScore1,
          "Điểm TBHKII": newValue.AvgScore2,
        },
      ]);
      helper.turnOnConfirm("edit");
    },
    handleChangeInput: (e) => {
      const inputValue = e.target.value;
      const studentArrStateCopy = studentArrState.filter((item) => {
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
      const studentArrStateCopy = studentArrState.filter((item) => {
        for (const [key, value] of Object.entries(item)) {
          if (String(value).toLowerCase().includes(inputValue.toLowerCase()))
            return true;
        }
        return false;
      });

      setStudentArrTempState(studentArrStateCopy);
      document.querySelector(".search__input").value = "";
    },
    handleClickInfoBtn: (e) => {
      if (e.target.classList.contains("info-img")) {
        let index = +e.target.parentNode.getAttribute("data-set");
        const newResultUI = studentArrState
          .filter(
            (item) => item.StudentID == studentArrTempState[index].StudentID
          )
          .map((item) => {
            return {
              "Họ tên": item.Name,
              Lớp: item.nameClass,
              "Điểm TBHKI": item.AvgScore1,
              "Điểm TBHKII": item.AvgScore2,
              "Năm học": item.SchoolYear,
            };
          });
        setResultUI(newResultUI);
        //Cho thêm thông tin hoạt động...
        helper.turnOnDetail();
      }
    },

    handleClickDeleteBtn: (e) => {
      if (e.target.classList.contains("delete-img")) {
        let index = +e.target.parentNode.getAttribute("data-set");
        console.log(index);
        setResult([studentArrTempState[index]]);
        setResultUI([
          {
            "Họ tên": studentArrTempState[index].Name,
            Lớp: studentArrTempState[index].nameClass,
            "Điểm TBHKI": studentArrTempState[index].AvgScore1,
            "Điểm TBHKII": studentArrTempState[index].AvgScore2,
          },
        ]);
        helper.turnOnConfirm("delete");
      }
    },

    // handleNameInputChange: (e, i) => {
    //   let subjectArrStateCopy = JSON.parse(JSON.stringify(subjectArrState));
    //   subjectArrStateCopy[i].Name = e.target.value;
    //   setSubjectArrState(subjectArrStateCopy);
    // },
  };

  return (
    <div className="search-page">
      <Detail result={resultUI} />
      <Confirm
        confirmType="edit"
        result={resultUI}
        handleConfirmCancelBtn={() => helper.turnOffConfirm("edit")}
        handleConfirmAcceptBtn={handleEvent.handleConfirmToEdit}
      />
      <Confirm
        confirmType="delete"
        result={resultUI}
        handleConfirmCancelBtn={() => helper.turnOffConfirm("delete")}
        handleConfirmAcceptBtn={handleEvent.handleConfirmToDelete}
      />
      <Notification status="failed" message={message} />
      <h3>TRA CỨU</h3>
      <div className="guide">
        Nhập thêm học sinh mà bạn muốn tìm. Bạn có thể xem chi tiết, chỉnh sửa
        hoặc xóa học sinh ở đây.
      </div>
      <div className="grid">
        <div className="row">
          <div className="grid__item">
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

      <h4>Kết quả tìm kiếm</h4>

      <div className="container">
        <div className="row heading">
          <div className="item col-30-percent center al-left pl-70">Họ Tên</div>
          <div className="item col-10-percent center al-center">Lớp</div>
          <div className="item col-20-percent center al-center">TBHKI</div>
          <div className="item col-20-percent center al-center">TBHKII</div>
          <div className="item col-20-percent center al-center">Thao tác</div>
        </div>

        {studentArrTempState.map((item, i) => {
          return (
            <>
              <div className="row content">
                <div className="item col-30-percent center al-left pl-50">
                  {
                    studentInfoState.find((info) => info._id == item.student)
                      .fullName
                  }
                </div>
                <div className="item col-10-percent center al-center">
                  {
                    classArrState.find(
                      (classItem) => classItem._id == item.cClass
                    ).nameClass
                  }
                </div>
                <div className="item col-20-percent center al-center">
                  {item.scoreTerms[0].termAvgScore}
                </div>
                <div className="item col-20-percent center al-center">
                  {item.scoreTerms[1].termAvgScore}
                </div>
                <div className="item col-20-percent center al-center">
                  <button
                    className="info-btn"
                    data-set={i}
                    onClick={(e) => handleEvent.handleClickInfoBtn(e)}
                  >
                    <img src={InfoIcon} alt="" className="info-img" />
                  </button>
                  <button
                    className="edit-btn"
                    data-set={i}
                    onClick={(e) =>
                      handler.handleClickEditBtn(
                        e,
                        studentArrTempState,
                        setStudentArrTempState
                      )
                    }
                  >
                    <img src={EditIcon} alt="" className="edit-img" />
                  </button>
                  <button
                    className="delete-btn"
                    data-set={i}
                    onClick={(e) => handleEvent.handleClickDeleteBtn(e)}
                  >
                    <img src={DeleteIcon} alt="" className="delete-img" />
                  </button>
                </div>
              </div>
              {item.Edit ? (
                <div className="row content">
                  <div className="item col-30-percent center al-left pl-50">
                    <input
                      type="text"
                      className="input--small"
                      placeholder="Nhập họ tên..."
                      value={
                        studentInfoState.find(
                          (info) => info._id == item.student
                        ).fullName
                      }
                      onChange={(e) =>
                        handler.handleEditInputChange(
                          e,
                          i,
                          studentArrTempState,
                          setStudentArrTempState,
                          "Name"
                        )
                      }
                    />
                  </div>
                  <div className="item col-10-percent center al-center">
                    <input
                      type="text"
                      className="input--tiny"
                      placeholder="Nhập lớp..."
                      value={
                        classArrState.find(
                          (classItem) => classItem._id == item.cClass
                        ).nameClass
                      }
                      onChange={(e) =>
                        handler.handleEditInputChange(
                          e,
                          i,
                          studentArrTempState,
                          setStudentArrTempState,
                          "nameClass"
                        )
                      }
                    />
                  </div>
                  <div className="item col-20-percent center al-center">
                    <input
                      type="text"
                      className="input--tiny"
                      placeholder="Nhập TBHKI..."
                      value={item.scoreTerms[0].termAvgScore}
                      onChange={(e) =>
                        handler.handleEditInputChange(
                          e,
                          i,
                          studentArrTempState,
                          setStudentArrTempState,
                          "AvgScore1"
                        )
                      }
                    />
                  </div>
                  <div className="item col-20-percent center al-center">
                    <input
                      type="text"
                      className="input--tiny"
                      placeholder="Nhập TBHKII..."
                      value={item.scoreTerms[1].termAvgScore}
                      onChange={(e) =>
                        handler.handleEditInputChange(
                          e,
                          i,
                          studentArrTempState,
                          setStudentArrTempState,
                          "AvgScore2"
                        )
                      }
                    />
                  </div>
                  <div className="item col-20-percent center al-center save-btn__container">
                    <button
                      // btnType="save"
                      onClick={(e) => handleEvent.handleSaveBtn(e)}
                      data-set={i}
                      className="save-btn--small"
                    >
                      Lưu
                    </button>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </>
          );
        })}
      </div>
      <div className="btns">
        <Button innerText="Xuất kết quả" btnType="export" />
        <Button innerText="In kết quả" btnType="export" />
      </div>
    </div>
  );
};
