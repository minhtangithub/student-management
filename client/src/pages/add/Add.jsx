import React from "react";
import "./Add.scss";
// import { Link } from "react-router-dom";
import Card1 from "../../assets/card1.png";
import Card2 from "../../assets/card2.png";

// import { BiRightArrow } from "react-icons/bi";
import { Card } from "../../components/Card";

export const Add = () => {
  return (
    <>
      <div className="add">
        <h3>Thêm</h3>
        <div className="guide">
          Tạo hồ sơ học sinh mới <br />
          Tạo lớp học mới từ lớp học đã có hoặc từ danh sách học sinh
        </div>
        <div className="card-container">
          <Card
            img={Card1}
            link="add/add-student"
            name="student"
            content="Tiếp nhận học sinh"
          ></Card>
          <Card
            img={Card2}
            link="add/add-class"
            name="class"
            content="Lập danh sách lớp"
          ></Card>
        </div>
      </div>
    </>
  );
};
