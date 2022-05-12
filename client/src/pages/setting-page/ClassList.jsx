import React from "react";
import "../Setting.scss";

import EditIcon from "../../assets/edit-icon.png";
import DeleteIcon from "../../assets/Delete-icon.png";
import { useState } from "react";

import { classArr } from "../../config/getAPI";

import { Button } from "../../components/Button";
import { Confirm } from "../../components/Confirm";
import { handler, helper } from "../../handle-event/HandleEvent";

export const ClassList = () => {
  const [classArrState, setClassArrState] = useState(classArr);
  const [result, setResult] = useState([]);
  const [resultUI, setResultUI] = useState([]);
  const handleEvent = {
    handleConfirmAcceptBtn: {
      editClass: () => {
        //Tạo copy
        const classArrStateCopy = helper.generateArrCopy(classArrState);

        //Tìm index phần tử bị edit
        let index = classArrStateCopy.findIndex(
          (item) => item.ID == result[0].ID
        );

        //Cập nhật mảng
        classArrStateCopy[index] = result[0];
        classArrStateCopy[index].Edit = false;
        setClassArrState(classArrStateCopy);

        //hiển thị thông báo
        helper.turnOnNotification("edit");

        //Cập nhật xuống CSDL
        //...
      },
      addClass: () => {
        //tạp copy
        const classArrStateCopy = helper.generateArrCopy(classArrState);

        //cập nhật mảng
        const newClassArrStateCopy = [...classArrStateCopy, ...result];
        setClassArrState(newClassArrStateCopy);

        //hiển thị thông báo, ẩn dòng thêm mới
        helper.turnOnNotification("add");
        document.querySelector(".row.add").style.display = "none";

        //cập nhật xuống CSDL
        //...
      },
      deleteClass: () => {
        //tạo copy
        const classArrStateCopy = helper.generateArrCopy(classArrState);

        //cập nhật mảng
        const newClassArrStateCopy = classArrStateCopy.filter((item, i) => {
          return item.ID !== result[0].ID;
        });
        setClassArrState(newClassArrStateCopy);

        //hiển thị thông báo
        helper.turnOnNotification("delete");

        //cập nhật xuống CSDL
        //...
      },
      deleteSelectedClass: () => {
        //tạo copy
        const classArrStateCopy = helper.generateArrCopy(classArrState);

        //cập nhật mảng
        const newClassArrStateCopy = classArrStateCopy.filter(
          (item) => !item.Checked
        );
        setClassArrState(newClassArrStateCopy);

        //hiển thị thông báo
        helper.turnOnNotification("delete-all");

        //cập nhật xuống CSDL
        //...
      },
    },

    handleClickDeleteBtn: {
      class: (e) => {
        if (e.target.classList.contains("delete-img")) {
          let index = +e.target.parentNode.getAttribute("data-set");
          setResult([classArrState[index]]);
          setResultUI([
            {
              "Tên lớp": classArrState[index].Name,
            },
          ]);
          helper.turnOnConfirm("delete");
        }
      },
    },
    handleSaveToEditBtn: {
      class: (e) => {
        let classArrStateCopy = JSON.parse(JSON.stringify(classArrState));
        let index = +e.target.getAttribute("data-set");
        let inputs = e.target.closest(".row").querySelectorAll("input");
        classArrStateCopy[index].Name = inputs[0].value;

        let newValue = classArrStateCopy[index];
        setResult([newValue]);
        setResultUI([
          {
            "Tên lớp": newValue.Name,
          },
        ]);
        helper.turnOnConfirm("edit");
      },
    },
    handleSaveToAddBtn: {
      class: () => {
        const inputs = document.querySelectorAll(".row.add input");
        const newItem = {
          ID: helper.generateID(classArrState),
          Name: inputs[0].value,
          Edit: false,
          Checked: false,
        };

        setResult([newItem]);
        setResultUI([
          {
            "Tên lớp": newItem.Name,
          },
        ]);
        helper.turnOnConfirm("add");
      },
    },
    handleClickDeleteAllBtn: {
      class: () => {
        const selectedClass = classArrState.filter((item) => item.Checked);
        setResult(selectedClass);
        setResultUI(
          selectedClass.map((item, i) => {
            return {
              "Tên lớp": item.Name,
            };
          })
        );
        helper.turnOnConfirm("delete-all");
      },
    },
    handleCheckbox: {
      class: (e) => {
        let index = +e.target.getAttribute("data-set");
        const classArrStateCopy = JSON.parse(JSON.stringify(classArrState));
        classArrStateCopy[index].Checked = !classArrStateCopy[index].Checked;
        setClassArrState(classArrStateCopy);
      },
    },
    handleNameInputChange: (e, i) => {
      let classArrStateCopy = JSON.parse(JSON.stringify(classArrState));
      classArrStateCopy[i].Name = e.target.value;
      setClassArrState(classArrStateCopy);
    },
  };

  return (
    <>
      <Confirm
        confirmType="edit"
        result={resultUI}
        handleConfirmCancelBtn={() => helper.turnOffConfirm("edit")}
        handleConfirmAcceptBtn={handleEvent.handleConfirmAcceptBtn.editClass}
      />
      <Confirm
        confirmType="add"
        result={resultUI}
        handleConfirmCancelBtn={() => helper.turnOffConfirm("add")}
        handleConfirmAcceptBtn={handleEvent.handleConfirmAcceptBtn.addClass}
      />
      <Confirm
        confirmType="delete"
        result={resultUI}
        handleConfirmCancelBtn={() => helper.turnOffConfirm("delete")}
        handleConfirmAcceptBtn={handleEvent.handleConfirmAcceptBtn.deleteClass}
      />
      <Confirm
        confirmType="delete-all"
        result={resultUI}
        handleConfirmCancelBtn={() => helper.turnOffConfirm("delete-all")}
        handleConfirmAcceptBtn={
          handleEvent.handleConfirmAcceptBtn.deleteSelectedClass
        }
      />
      <div className="manage-class">
        <h3>Danh sách các lớp</h3>
        <div className="container">
          <div className="row heading">
            <div className="item col-10-percent center"></div>
            <div className="item col-45-percent center">Tên lớp</div>
            <div className="item col-45-percent center">Thao tác</div>
          </div>
          {classArrState.map((item, i) => {
            return (
              <>
                <div className="row content" key={i}>
                  <div className="item col-10-percent center">
                    <input
                      type="checkbox"
                      data-set={i}
                      checked={item.Checked}
                      onChange={(e) => handleEvent.handleCheckbox.class(e)}
                    />
                  </div>
                  <div className="item col-45-percent center">{item.Name}</div>
                  <div className="item col-45-percent center">
                    <button
                      data-set={i}
                      onClick={(e) =>
                        handler.handleClickEditBtn(
                          e,
                          classArrState,
                          setClassArrState
                        )
                      }
                      className="edit-btn"
                    >
                      <img className="edit-img" src={EditIcon} alt="" />
                    </button>
                    <button
                      className="delete-btn"
                      data-set={i}
                      onClick={(e) => handleEvent.handleClickDeleteBtn.class(e)}
                    >
                      <img className="delete-img" src={DeleteIcon} alt="" />
                    </button>
                  </div>
                </div>
                {item.Edit ? (
                  <div className="row content">
                    <div className="item col-10-percent center"></div>
                    <div className="item col-45-percent center">
                      <input
                        type="text"
                        className="input--small"
                        placeholder="Nhập tên lớp mới..."
                        value={item.Name}
                        onChange={(e) =>
                          handleEvent.handleNameInputChange(e, i)
                        }
                      />
                    </div>
                    <div className="item col-45-percent center save-btn__container">
                      <button
                        onClick={(e) =>
                          handleEvent.handleSaveToEditBtn.class(e)
                        }
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
          <div className="row content add" style={{ display: "none" }}>
            <div className="item col-10-percent center"></div>
            <div className="item col-45-percent center">
              <input
                type="text"
                className="input--small"
                placeholder="Nhập tên lớp mới..."
              />
            </div>
            <div className="item col-45-percent center save-btn__container">
              <button
                onClick={handleEvent.handleSaveToAddBtn.class}
                className="save-btn--small"
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="btns al-center">
        <Button
          btnType="add"
          onClick={handler.handleClickAddBtn}
          innerText="Thêm mới"
        />
        <Button
          btnType="delete-selected"
          onClick={handleEvent.handleClickDeleteAllBtn.class}
          innerText="Xóa đã chọn"
        />
      </div>
    </>
  );
};
