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
// import { ScoreSchoolYear } from "../../config/getAPI";
import { handler, helper } from "../../handle-event/HandleEvent";
import { api } from "../../api/api";

//studentArrTemp là để hiển thị, studentScoreArr là để lưu xuống CSDL

export const Search = () => {
  const [studentArrState, setStudentArrState] = useState([]);
  const [studentInfoState, setStudentInfoState] = useState([]);
  const [classArrState, setClassArrState] = useState([]);
  const [classListState, setClassListState] = useState([]);
  const [studentArrTempState, setStudentArrTempState] = useState([]);
  const [allStudentArrTempState, setAllStudentArrTempState] = useState([]);
  const [result, setResult] = useState([]);
  const [resultUI, setResultUI] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getData = async () => {
      const scoreSchoolYearArr = await api.getScoreSchoolYear();
      // const scoreSchoolYearArr = ScoreSchoolYear;
      const studentInfoArr = await api.getStudentInfoArr();
      const classArr = await api.getCCLASS();
      const classList = await api.getClassListArr();

      console.log(scoreSchoolYearArr, studentInfoArr, classArr);
      setStudentArrState(scoreSchoolYearArr);
      setStudentInfoState(studentInfoArr);
      setClassArrState(classArr);
      setClassListState(classList);

      //convert to UIarr
      const studentTempArr = scoreSchoolYearArr.map((item) => {
        return {
          scoreID: item._id,
          studentID: item.student,
          classID: item.cClass,
          nameStudent: studentInfoArr.filter(
            (info) => info._id == item.student
          )[0].fullName,
          nameClass: classArr.filter(
            (classItem) => classItem._id == item.cClass
          )[0].nameClass,
          AvgScore1: item.scoreTerms[0] ? item.scoreTerms[0].termAvgScore : 0,
          ScoreSubjects_1: item.scoreTerms[0]
            ? item.scoreTerms[0].scoreSubjects
            : [],
          AvgScore2: item.scoreTerms[1] ? item.scoreTerms[1].termAvgScore : 0,
          ScoreSubjects_2: item.scoreTerms[1]
            ? item.scoreTerms[1].scoreSubjects
            : [],
        };
      });

      console.log(studentTempArr);
      setStudentArrTempState(studentTempArr);
      setAllStudentArrTempState(studentTempArr);
    };
    getData();
  }, []);

  const handleEvent = {
    handleConfirmToDelete: () => {
      //Cập nhật mảng dữ liệu
      const newStudentArrState = allStudentArrTempState.filter((item, i) => {
        return item.scoreID !== result[0].scoreID;
      });
      setAllStudentArrTempState(newStudentArrState);

      //cập nhật UI
      const newUIstudentArr = studentArrTempState.filter((item, i) => {
        return item.scoreID !== result[0].scoreID;
      });

      setStudentArrTempState(newUIstudentArr);

      //Cho hiện thông báo lên
      helper.turnOnNotification("delete");

      //cập nhật xuống CSDL
      let deletedItemID = result[0].scoreID;
      api.deleteScoreSchoolYear(deletedItemID);
    },
    handleConfirmToEdit: async () => {
      //kiểm tra ràng buộc dữ liệu
      let checkEmptyMessage = helper.validateData("empty", {
        nameStudent: result[0].nameStudent,
        nameClass: result[0].nameClass,
        AvgScore1: result[0].AvgScore1,
        AvgScore2: result[0].AvgScore2,
      });
      let checkNumberMessage = helper.validateData("number", {
        AvgScore1: result[0].AvgScore1,
        AvgScore2: result[0].AvgScore2,
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
        const studentArrStateCopy = helper.generateArrCopy(
          allStudentArrTempState
        );
        const studentArrTempStateCopy =
          helper.generateArrCopy(studentArrTempState);

        //cập nhật ở UI
        let index2 = studentArrTempStateCopy.findIndex(
          (item) => item.scoreID == result[0].scoreID
        );
        studentArrTempStateCopy[index2] = result[0];
        studentArrTempStateCopy[index2].Edit = false;
        setStudentArrTempState(studentArrTempStateCopy);

        //cập nhật ở mảng dữ liệu
        let index = studentArrStateCopy.findIndex(
          (item) => item.scoreID == result[0].scoreID
        );
        studentArrStateCopy[index] = result[0];
        studentArrStateCopy[index].Edit = false;
        setStudentArrState(studentArrStateCopy);

        //Cập nhật xuống CSDL

        ////cập nhật tên HS
        const editedStudent = await api.getAStudentInfo(result[0].studentID);
        const newValueToStudent = {
          ...editedStudent,
          fullName: result[0].nameStudent,
        };
        api.putStudentInfo(result[0].studentID, newValueToStudent);

        ////cập nhật lớp chứa học sinh
        let newClassIDForSave;
        if (result[0].nameClass !== allStudentArrTempState[index].nameClass) {
          const editedClass = await api.getA_CCLASS(result[0].classID);
          console.log(editedClass.students);

          //////bỏ ra khỏi lớp trước đó
          const newStudentList = editedClass.students.filter(
            (item) => item._id !== result[0]
          );
          const newValueToClass = {
            ...editedClass,
            students: newStudentList,
          };
          api.putCCLASS(result[0].classID, newValueToClass);

          //////lấy ID class mới -> get class đó -> thêm studentID vào mảng students của class mới -> putClass
          let newClassID;
          if (
            classArrState.filter(
              (item) =>
                item.nameClass === result[0].nameClass &&
                item.schoolYear === editedClass.schoolYear
            ).length > 0
          ) {
            newClassID = classArrState.filter(
              (item) =>
                item.nameClass === result[0].nameClass &&
                item.schoolYear === editedClass.schoolYear
            )[0]._id;
            const newClass = await api.getA_CCLASS(newClassID);
            console.log("students>>>", newClass);
            const studentList = Array.from(newClass.students);
            const newStudentList = [...studentList, result[0].studentID];
            // newClass.students = [
            //   ...Array.from(newClass.students),
            //   result[0].studentID,
            // ];
            const newClassValue = {
              ...newClass,
              students: newStudentList,
            };
            api.putCCLASS(newClassID, newClassValue);
            newClassIDForSave = newClassID;
          } else {
            // api.postClassWithStudents({
            //   nameClass: result[0].nameClass,
            //   // grade: newClass.grade,
            //   schoolYear: editedClass.schoolYear,
            //   student: [result[0].studentID],
            // });

            //Nếu lớp không tồn tại thì báo lỗi
            setMessage("Không tồn tại lớp này");
            document.querySelector(
              ".notification--failed"
            ).parentElement.style.display = "flex";
          }
          newClassIDForSave = result[0].classID;
        }

        ////Cập nhật score
        const newValueToScore = {
          student: result[0].studentID,
          cClass: newClassIDForSave,
          scoreTerms: [
            {
              scoreSubjects: result[0].ScoreSubjects_1,
              termAvgScore: result[0].AvgScore1,
            },
            {
              scoreSubjects: result[0].ScoreSubjects_2,
              termAvgScore: result[0].AvgScore2,
            },
          ],
        };
        api.putScoreSchoolYear(result[0].scoreID, newValueToScore);

        //hiển thị thông báo
        if (
          document.querySelector(".notification--failed").parentElement.style
            .display !== "flex"
        ) {
          helper.turnOnNotification("edit");
        }
      }
    },
    handleSaveBtn: (e) => {
      let studentArrStateCopy = JSON.parse(JSON.stringify(studentArrTempState));
      let index = +e.target.getAttribute("data-set");
      let inputs = e.target.closest(".row").querySelectorAll("input");
      studentArrStateCopy[index].nameStudent = inputs[0].value;
      studentArrStateCopy[index].nameClass = inputs[1].value;
      studentArrStateCopy[index].AvgScore1 = inputs[2].value;
      studentArrStateCopy[index].AvgScore2 = inputs[3].value;

      // studentInfoState.find(
      //   (info) => info._id == studentArrStateCopy[index].student
      // ).fullName = inputs[0].value;
      // classArrState.find(
      //   (classItem) => classItem._id == studentArrStateCopy[index].cClass
      // ).nameClass = inputs[1].value;
      // studentArrStateCopy[index].scoreTerms[0].termAvgScore = inputs[2].value;
      // studentArrStateCopy[index].scoreTerms[1].termAvgScore = inputs[3].value;

      let newValue = studentArrStateCopy[index];
      console.log(">>>newValue", newValue);
      setResult([newValue]);
      setResultUI([
        {
          "Họ tên": newValue.nameStudent,
          Lớp: newValue.nameClass,
          "Điểm TBHKI": newValue.AvgScore1,
          "Điểm TBHKII": newValue.AvgScore2,
        },
      ]);
      helper.turnOnConfirm("edit");
    },
    handleChangeInput: (e) => {
      const inputValue = e.target.value;
      const studentArrStateCopy = allStudentArrTempState.filter((item) => {
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
      const studentArrStateCopy = allStudentArrTempState.filter((item) => {
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
        const newResultUI = allStudentArrTempState
          .filter(
            (item) => item.studentID == studentArrTempState[index].studentID
          )
          .map((item) => {
            return {
              "Họ tên": item.nameStudent,
              Lớp: item.nameClass,
              "Điểm TBHKI": item.AvgScore1,
              "Điểm TBHKII": item.AvgScore2,
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
            "Họ tên": studentArrTempState[index].nameStudent,
            Lớp: studentArrTempState[index].nameClass,
            "Điểm TBHKI": studentArrTempState[index].AvgScore1,
            "Điểm TBHKII": studentArrTempState[index].AvgScore2,
          },
        ]);
        helper.turnOnConfirm("delete");
      }
    },
    // handleEditName: (e, i) => {
    //   // let dataArrCopy = JSON.parse(JSON.stringify(dataArr));
    //   studentInfoState.find(
    //     (info) => info._id == studentArrTempState[i].student
    //   ).fullName = e.target.value;
    //   setStudentArrTempState(studentArrTempState);
    // },
    // handleEditClass: (e, i) => {
    //   classArrState.find(
    //     (info) => info._id == studentArrTempState[i].cClass
    //   ).fullName = e.target.value;
    //   setStudentArrTempState(studentArrTempState);
    // },
    // handleEditAvg1: (e, i) => {
    //   const id = studentArrTempState[i]._id;
    //   const studentArrStateCopy = studentArrTempState;
    //   studentArrStateCopy.find(
    //     (item) => item._id == id
    //   )[0].scoreTerms[0].termAvgScore = e.target.value;
    //   setStudentArrTempState(studentArrStateCopy);
    // },
    // handleEditAvg2: (e, i) => {
    //   const id = studentArrTempState[i]._id;
    //   const studentArrStateCopy = studentArrTempState;
    //   studentArrStateCopy.find(
    //     (item) => item._id == id
    //   )[0].scoreTerms[1].termAvgScore = e.target.value;
    //   setStudentArrTempState(studentArrStateCopy);
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
        Nhập tên học sinh, lớp, hoặc điểm mà bạn muốn tìm. Bạn có thể xem chi
        tiết, chỉnh sửa hoặc xóa học sinh ở đây.
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
                  {item.nameStudent}
                </div>
                <div className="item col-10-percent center al-center">
                  {item.nameClass}
                </div>
                <div className="item col-20-percent center al-center">
                  {item.AvgScore1}
                </div>
                <div className="item col-20-percent center al-center">
                  {item.AvgScore2}
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
                      value={item.nameStudent}
                      onChange={(e) =>
                        handler.handleEditInputChange(
                          e,
                          i,
                          studentArrTempState,
                          setStudentArrTempState,
                          "nameStudent"
                        )
                      }
                    />
                  </div>
                  <div className="item col-10-percent center al-center">
                    <input
                      type="text"
                      className="input--tiny"
                      placeholder="Nhập lớp..."
                      value={item.nameClass}
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
                      value={item.AvgScore1}
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
                      value={item.AvgScore2}
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
