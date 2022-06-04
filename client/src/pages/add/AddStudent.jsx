import React from "react";
import "./AddStudent.scss";
import { Input } from "../../components/Input";
import { Confirm } from "../../components/Confirm";
import { useState, useEffect } from "react";
import { Button } from "../../components/Button";
import { Notification } from "../../components/Notification";

import { api } from "../../api/api";
import { helper } from "../../handle-event/HandleEvent";
import axios from "axios";

export const AddStudent = () => {
  const [result, setResult] = useState([]);
  const [resultUI, setResultUI] = useState([]);
  const [studentArrState, setStudentArrState] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getStudentArr = async () => {
      const dataArr = await api.getStudentInfoArr();
      setStudentArrState(dataArr);
    };
    getStudentArr();
  }, []);

  //Xử lý nút lưu của màn hình xác nhận
  const handleConfirmAcceptBtn = () => {
    // helper.turnOffConfirm("edit");
    document.querySelector(".confirm").style.display = "none";
    //kiểm tra ràng buộc
    let checkEmptyMessage = helper.validateData("empty", result[0]);
    let checkAgeMessage = helper.validateData("age", {
      dateOfBirth: result[0].dateOfBirth,
    });
    let checkEmailMessage = helper.validateData("email", {
      email: result[0].email,
    });
    const checkMessageArr = [
      checkEmptyMessage,
      checkAgeMessage,
      checkEmailMessage,
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
      //Lưu xuống CSDL
      const studentArrStateCopy = JSON.parse(JSON.stringify(studentArrState));
      studentArrStateCopy.push(result[0]);
      setStudentArrState(studentArrStateCopy);

      //hiện thông báo
      document.querySelector(".notification").style.display = "flex";

      //Lưu xuống CSDL
      api.postNewStudentInfo(result[0]);
    }
  };

  //Xử lý nút hủy của màn hình xác nhận
  const handleConfirmCancelBtn = () => {
    document.querySelector(".confirm.add").style.display = "none";
  };

  //Xử lý nút làm mới
  const handleRefresh = () => {
    document.querySelectorAll("input, textarea").forEach((item) => {
      item.value = "";
    });
  };

  //Xử lý nút thêm mới
  const handleSubmit = (e) => {
    e.preventDefault();
    //Gom dữ liệu về 1 object
    const inputs = Array.from(
      document.querySelectorAll(".grid__item:not(.select) input, textarea")
    );
    const selects = Array.from(document.querySelectorAll(".dropdown_selected"));

    const newStudent = {
      ID: helper.generateID(studentArrState, "ID", "SD"),
      fullName: inputs[0].value,
      email: inputs[1].value,
      dateOfBirth: inputs[2].value,
      address: inputs[3].value,
      gender:
        selects[0]
          .querySelector(".dropdown_selected-default")
          .innerText.trim() === "Nam"
          ? "male"
          : "female",
    };

    const newStudentUI = {
      "Họ tên": inputs[0].value,
      Email: inputs[1].value,
      "Ngày sinh": inputs[2].value,
      "Giới tính": selects[0].querySelector(".dropdown_selected-default")
        .innerText,
      "Địa chỉ": inputs[3].value,
    };

    //Đưa lên confirm
    setResult([newStudent]);
    setResultUI([newStudentUI]);
    document.querySelector(".confirm").style.display = "flex";
  };
  return (
    <div className="add-student">
      <Confirm
        confirmType="add"
        result={resultUI}
        handleConfirmCancelBtn={handleConfirmCancelBtn}
        handleConfirmAcceptBtn={handleConfirmAcceptBtn}
      />
      <Notification status="failed" message={message} />
      <h3>Thêm học sinh</h3>
      <div className="guide">
        Điền vào thông tin học sinh theo mẫu bên dưới. Lưu ý điền đầy đủ tất cả
        các trường
      </div>

      <form className="grid">
        <div className="row">
          <Input
            type="text"
            placeholder="Nhập họ tên học sinh..."
            labelText="Họ và tên"
          />
          <Input type="email" placeholder="Nhập email..." labelText="Email" />
        </div>
        <div className="row">
          <Input type="date" labelText="Ngày sinh" />
          <Input
            type="select"
            labelText="Giới tính"
            name="gender"
            selectName="gender"
            options={[
              { value: "Boy", text: "Nam" },
              { value: "Girl", text: "Nữ" },
            ]}
          />
        </div>
        <div className="row">
          <Input
            type="textArea"
            labelText="Địa chỉ"
            rows="5"
            placeholder="Nhập địa chỉ..."
          />
        </div>
        <div className="btns al-center">
          <Button
            btnType="clear"
            onClick={handleRefresh}
            innerText="Làm sạch"
          ></Button>
          <Button
            btnType="add"
            onClick={(e) => handleSubmit(e)}
            innerText="Thêm mới"
          ></Button>
        </div>
      </form>
    </div>
  );
};
