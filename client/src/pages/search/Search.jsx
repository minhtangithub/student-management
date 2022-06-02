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
import { ScoreSchoolYear } from "../../config/getAPI";
import { handler, helper } from "../../handle-event/HandleEvent";
import { api } from "../../api/api";

//studentArrTemp là để hiển thị, studentScoreArr là để lưu xuống CSDL

export const Search = () => {
  const [studentArrState, setStudentArrState] = useState([]);
  const [studentInfoState, setStudentInfoState] = useState([]);
  const [classArrState, setClassArrState] = useState([]);
  const [classListState, setClassListState] = useState([]);
  const [studentArrTempState, setStudentArrTempState] = useState([]);
  const [result, setResult] = useState([]);
  const [resultUI, setResultUI] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getData = async () => {
      // const scoreSchoolYearArr = await api.getScoreSchoolYear();
      const scoreSchoolYearArr = ScoreSchoolYear;
      const studentInfoArr = await api.getStudentInfoArr();
      const classArr = await api.getCCLASS();
      const classList = await api.getClassListArr();

      console.log(scoreSchoolYearArr, studentInfoArr, classArr);
      setStudentArrState(scoreSchoolYearArr);
      setStudentInfoState(studentInfoArr);
      setClassArrState(classArr);
      setClassListState(classList);
    };
    getData();
  }, []);

  const handleEvent = {
    handleConfirmToDelete: () => {
      //Tạo copy
      const studentArrStateCopy = studentArrState;
      let studentArrTempStateCopy = studentArrTempState;

      //Cập nhật mảng dữ liệu
      const newSubjectArrStateCopy = studentArrStateCopy.filter((item, i) => {
        return item._id !== result[0]._id;
      });
      setStudentArrState(newSubjectArrStateCopy);

      //cập nhật UI
      const newSubjectArrTempStateCopy = studentArrTempStateCopy.filter(
        (item, i) => {
          return item._id !== result[0]._id;
        }
      );

      setStudentArrTempState(newSubjectArrTempStateCopy);

      //Cho hiện thông báo lên
      helper.turnOnNotification("delete");

      //cập nhật xuống CSDL
      let deletedItemID = result[0]._id;
      api.deleteScoreSchoolYear(deletedItemID);
    },
    handleConfirmToEdit: () => {
      //kiểm tra ràng buộc dữ liệu
      let checkEmptyMessage = helper.validateData("empty", {
        cClass: result[0].cClass,
        student: result[0].student,
        AvgScore1: result[0].scoreTerms[0].termAvgScore,
        AvgScore2: result[0].scoreTerms[1].termAvgScore,
      });
      let checkNumberMessage = helper.validateData("number", {
        AvgScore1: result[0].scoreTerms[0].termAvgScore,
        AvgScore2: result[0].scoreTerms[1].termAvgScore,
      });
      let checkClassMessage = helper.validateData(
        "class",
        {
          nameClass: result[0].nameClass,
        },
        classListState
      );

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
          (item) => item._id == result[0]._id
        );
        studentArrStateCopy[index] = result[0];
        studentArrStateCopy[index].Edit = false;
        setStudentArrState(studentArrStateCopy);

        //cập nhật ở UI
        let index2 = studentArrTempStateCopy.findIndex(
          (item) => item._id == result[0]._id
        );
        studentArrTempStateCopy[index2] = result[0];
        studentArrTempStateCopy[index2].Edit = false;
        setStudentArrTempState(studentArrTempStateCopy);

        //hiển thị thông báo
        helper.turnOnNotification("edit");

        //Cập nhật xuống CSDL
        api.putScoreSchoolYear(result[0]._id, result[0]);
      }
    },
    handleSaveBtn: (e) => {
      let studentArrStateCopy = JSON.parse(JSON.stringify(studentArrTempState));
      let index = +e.target.getAttribute("data-set");
      let inputs = e.target.closest(".row").querySelectorAll("input");
      // studentArrStateCopy[index].Name = inputs[0].value;
      // studentArrStateCopy[index].nameClass = inputs[1].value;
      // studentArrStateCopy[index].AvgScore1 = inputs[2].value;
      // studentArrStateCopy[index].AvgScore2 = inputs[3].value;

      studentInfoState.find(
        (info) => info._id == studentArrStateCopy[index].student
      ).fullName = inputs[0].value;
      classArrState.find(
        (classItem) => classItem._id == studentArrStateCopy[index].cClass
      ).nameClass = inputs[1].value;
      studentArrStateCopy[index].scoreTerms[0].termAvgScore = inputs[2].value;
      studentArrStateCopy[index].scoreTerms[1].termAvgScore = inputs[3].value;

      let newValue = studentArrStateCopy[index];
      console.log(">>>newValue", newValue);
      setResult([newValue]);
      setResultUI([
        {
          "Họ tên": studentInfoState.find(
            (info) => info._id == newValue.student
          ).fullName,
          Lớp: classArrState.find(
            (classItem) => classItem._id == newValue.cClass
          ).nameClass,
          "Điểm TBHKI": newValue.scoreTerms[0].termAvgScore,
          "Điểm TBHKII": newValue.scoreTerms[1].termAvgScore,
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
          .filter((item) => item.student == studentArrTempState[index].student)
          .map((item) => {
            return {
              "Họ tên": studentInfoState.find(
                (info) => info._id == item.student
              ).fullName,
              Lớp: classArrState.find(
                (classItem) => classItem._id == item.cClass
              ).nameClass,
              "Điểm TBHKI": item.scoreTerms[0].termAvgScore,
              "Điểm TBHKII": item.scoreTerms[1].termAvgScore,
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
            "Họ tên": studentInfoState.find(
              (info) => info._id == studentArrTempState[index].student
            ).fullName,
            Lớp: classArrState.find(
              (classItem) => classItem._id == studentArrTempState[index].cClass
            ).nameClass,
            "Điểm TBHKI": studentArrTempState[index].scoreTerms[0].termAvgScore,
            "Điểm TBHKII":
              studentArrTempState[index].scoreTerms[1].termAvgScore,
          },
        ]);
        helper.turnOnConfirm("delete");
      }
    },
    handleEditName: (e, i) => {
      // let dataArrCopy = JSON.parse(JSON.stringify(dataArr));
      studentInfoState.find(
        (info) => info._id == studentArrTempState[i].student
      ).fullName = e.target.value;
      setStudentArrTempState(studentArrTempState);
    },
    handleEditClass: (e, i) => {
      classArrState.find(
        (info) => info._id == studentArrTempState[i].cClass
      ).fullName = e.target.value;
      setStudentArrTempState(studentArrTempState);
    },
    handleEditAvg1: (e, i) => {
      const id = studentArrTempState[i]._id;
      const studentArrStateCopy = studentArrTempState;
      studentArrStateCopy.find(
        (item) => item._id == id
      )[0].scoreTerms[0].termAvgScore = e.target.value;
      setStudentArrTempState(studentArrStateCopy);
    },
    handleEditAvg2: (e, i) => {
      const id = studentArrTempState[i]._id;
      const studentArrStateCopy = studentArrTempState;
      studentArrStateCopy.find(
        (item) => item._id == id
      )[0].scoreTerms[1].termAvgScore = e.target.value;
      setStudentArrTempState(studentArrStateCopy);
    },
  };
  studentArrTempState.map((item, i) => {
    console.log(
      studentInfoState.find((info) => info._id == item.student).fullName
    );
  });
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
              {console.log(
                studentInfoState.find((info) => info._id == item.student)
                  .fullName
              )}
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
                      onChange={(e) => handleEvent.handleEditName(e, i)}
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
                      onChange={(e) => handleEvent.handleEditClass(e, i)}
                    />
                  </div>
                  <div className="item col-20-percent center al-center">
                    <input
                      type="text"
                      className="input--tiny"
                      placeholder="Nhập TBHKI..."
                      value={item.scoreTerms[0].termAvgScore}
                      onChange={(e) => handleEvent.handleEditAvg1(e, i)}
                    />
                  </div>
                  <div className="item col-20-percent center al-center">
                    <input
                      type="text"
                      className="input--tiny"
                      placeholder="Nhập TBHKII..."
                      value={item.scoreTerms[1].termAvgScore}
                      onChange={(e) => handleEvent.handleEditAvg2(e, i)}
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
