import React from "react";
import "./CreateScore.scss";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Confirm } from "../../components/Confirm";
import { classListArr } from "../../config/getAPI";
import { useState } from "react";

export const CreateScore = () => {
  const [status, setstatus] = useState("input");
  const [finalResult, setFinalResult] = useState([]);

  // const avgScore = {};
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

    setFinalResult(finalResultTemp);
    setstatus("confirm");
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
      {status == "input" ? (
        <div className="create-score">
          <h3>Tạo bảng điểm</h3>
          <div className="score-info">
            <h4>Lớp: 10A1</h4>
            <h4>Học kỳ: 1</h4>
            <h4>Năm học: 2018-2019</h4>
            <h4>Môn học: Toán</h4>
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
            <h4>Học kỳ: 1</h4>
            <h4>Năm học: 2018-2019</h4>
            <h4>Môn học: Toán</h4>
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
