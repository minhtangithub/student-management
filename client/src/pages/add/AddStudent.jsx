import React from "react";
import "./AddStudent.scss";
import { Input } from "../../components/Input";
import { Confirm } from "../../components/Confirm";
import { useState } from "react";
import { Button } from "../../components/Button";
import { studentInfoArr } from "../../config/getAPI";

export const AddStudent = () => {
  const [result, setResult] = useState([]);
  const [studentArrState, setStudentArrState] = useState(studentInfoArr);
  const keys = ["ID", "Name", "Email", "Birthdate", "Address", "gender"];

  //Xử lý nút lưu của màn hình xác nhận
  const handleConfirmAcceptBtn = () => {
    //Lưu xuống CSDL
    const studentArrStateCopy = JSON.parse(JSON.stringify(studentArrState));
    const newItem = {};
    keys.forEach((key, i) => (newItem[key] = Object.values(result[0])[i]));
    studentArrStateCopy.push(newItem);
    setStudentArrState(studentArrStateCopy);

    //hiện thông báo
    document.querySelector(".confirm.add .notification").style.display = "flex";
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
      document.querySelectorAll(".grid__item:not(.select)")
    );
    const newStudent = {};
    inputs.forEach((item) => {
      newStudent[item.querySelector("label").innerText] = item.querySelector(
        "input"
      )
        ? item.querySelector("input").value
        : item.querySelector("textarea").value;
    });
    const selects = Array.from(document.querySelectorAll(".select"));
    selects.forEach((item) => {
      newStudent[item.querySelector("label").innerText] =
        item.querySelector("select").selectedOptions[0].innerText;
    });

    //Đưa lên confirm
    setResult([newStudent]);
    document.querySelector(".confirm").style.display = "flex";
  };
  return (
    <div className="add-student">
      <Confirm
        confirmType="add"
        result={result}
        handleConfirmCancelBtn={handleConfirmCancelBtn}
        handleConfirmAcceptBtn={handleConfirmAcceptBtn}
      />
      <h3>Thêm học sinh</h3>

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
