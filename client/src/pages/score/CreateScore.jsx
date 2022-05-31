import React from "react";
import "./CreateScore.scss";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Confirm } from "../../components/Confirm";
import { Notification } from "../../components/Notification";
import { classListArr } from "../../config/getAPI";
import { useState } from "react";
import { helper } from "../../handle-event/HandleEvent";
import { useParams } from "react-router-dom";

export const CreateScore = () => {
  const { className, subject, term, schoolYear } = useParams();

  const [status, setstatus] = useState("input");
  const [message, setMessage] = useState("");
  const [finalResult, setFinalResult] = useState([]);

  const handleClickAddBtn = () => {
    const finalResultTemp = [];
    const inputs15Min = document.querySelectorAll(".min-15 input");
    const inputs1Per = document.querySelectorAll(".per-1 input");
    classListArr.forEach((item, i) => {
      const newItem = {
        ...item,
        score15Min: inputs15Min[i].value,
        score1Per: inputs1Per[i].value,
        avgScore: (
          (+inputs15Min[i].value + 2 * +inputs1Per[i].value) /
          3
        ).toFixed(2),
      };

      finalResultTemp.push(newItem);
    });
    //kiểm tra ràng buộc dữ liệu
    let checkEmptyMessage = "ok";
    let checkNumberMessage = "ok";
    finalResultTemp.forEach((item) => {
      if (helper.validateData("empty", item) !== "ok")
        checkEmptyMessage = helper.validateData("empty", item);
      if (
        helper.validateData("number", {
          score15Min: item.score15Min,
          score1Per: item.score1Per,
        }) !== "ok"
      )
        checkNumberMessage = helper.validateData("number", {
          score15Min: item.score15Min,
          score1Per: item.score1Per,
        });
    });
    const checkMessageArr = [checkEmptyMessage, checkNumberMessage];
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
      setFinalResult(finalResultTemp);
      setstatus("confirm");
    }
  };

  const handleClickSaveBtn = () => {
    document.querySelector(".confirm.add").style.display = "flex";
  };
  const handleConfirmAcceptBtn = () => {
    //Lưu xuống CSDL
    // ...

    document.querySelector(".confirm.add .notification").style.display = "flex";
  };
  const handleConfirmCancelBtn = () => {
    document.querySelector(".confirm.add").style.display = "none";
  };
  return (
    <>
      <Confirm
        confirmType="add"
        result={[]}
        handleConfirmAcceptBtn={handleConfirmAcceptBtn}
        handleConfirmCancelBtn={handleConfirmCancelBtn}
      />
      <Notification status="failed" message={message} />

      {status == "input" ? (
        <div className="create-score">
          <h3>Tạo bảng điểm</h3>
          <div className="score-info">
            <h4>Lớp: {className}</h4>
            <h4>{term}</h4>
            <h4>Năm học: {schoolYear}</h4>
            <h4>Môn học: {subject}</h4>
          </div>
          <div className="container">
            <div className="row heading">
              <div className="item col-10-percent center al-center">STT</div>
              <div className="item col-30-percent center al-left pl-50">
                Họ Tên
              </div>
              <div className="item col-20-percent center al-center">
                Điểm 15'
              </div>
              <div className="item col-20-percent center al-center">
                Điểm 1 tiết
              </div>
              <div className="item col-20-percent center al-center">
                Điểm TB
              </div>
            </div>
            {classListArr.map((item, i) => (
              <div className="row content">
                <div className="item col-10-percent center al-center">
                  {i + 1}
                </div>
                <div className="item col-30-percent center al-left pl-50">
                  {item.Name}
                </div>
                <div className="item col-20-percent center al-center min-15">
                  <Input type="small" placeholder="Nhập điểm 15'..." />
                </div>
                <div className="item col-20-percent center al-center per-1">
                  <Input type="small" placeholder="Nhập điểm 1 tiết..." />
                </div>
                <div className="item col-20-percent center al-center">
                  {/* {avgScore[i]} */}
                </div>
              </div>
            ))}
          </div>
          <div className="btns">
            <Button innerText="Tạo" btnType="add" onClick={handleClickAddBtn} />
          </div>
        </div>
      ) : (
        <div className="create-score">
          <h3>Tạo bảng điểm</h3>
          <div className="score-info">
            <h4>Lớp: {className}</h4>
            <h4>Học kỳ: {term}</h4>
            <h4>Năm học: {schoolYear}</h4>
            <h4>Môn học: {subject}</h4>
          </div>
          <div className="container">
            <div className="row heading">
              <div className="item col-10-percent center al-center">STT</div>
              <div className="item col-30-percent center al-left pl-70">
                Họ Tên
              </div>
              <div className="item col-20-percent center al-center">
                Điểm 15'
              </div>
              <div className="item col-20-percent center al-center">
                Điểm 1 tiết
              </div>
              <div className="item col-20-percent center al-center">
                Điểm TB
              </div>
            </div>
            {classListArr.map((item, i) => (
              <div className="row content">
                <div className="item col-10-percent center al-center">
                  {i + 1}
                </div>
                <div className="item col-30-percent center al-left pl-50">
                  {item.Name}
                </div>
                <div className="item col-20-percent center al-center min-15">
                  {finalResult[i].score15Min}
                </div>
                <div className="item col-20-percent center al-center per-1">
                  {finalResult[i].score1Per}
                </div>
                <div className="item col-20-percent center al-center">
                  {finalResult[i].avgScore}
                </div>
              </div>
            ))}
          </div>
          <div className="btns">
            <Button
              innerText="Lưu"
              btnType="save"
              onClick={handleClickSaveBtn}
            />
          </div>
        </div>
      )}
    </>
  );
};
