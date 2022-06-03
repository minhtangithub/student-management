import React from "react";
import "./Add.scss";
// import { Link } from "react-router-dom";
// import Card1 from "../../assets/card1.png";
// import Card2 from "../../assets/card2.png";
import studentImg from "../../assets/student.png";
import classImg from "../../assets/class.png";
import imgPage from "../../assets/imgPage.png";

// import { BiRightArrow } from "react-icons/bi";
import { Card } from "../../components/Card";

export const Add = () => {
  return (
    <>
      <div className="add-page">
        <img className="img-main" src={imgPage} alt="" />
        <div className="main-1"></div>
        <div className="main-2">
          <div className="desc">
            <h1>
              Thêm mới học sinh,
              <br /> tạo danh sách các lớp học
            </h1>
            <p>
              Nhập thông tin để tạo hồ sơ cho học sinh mới <br />
              Tạo lớp học mới từ lớp học đã có ở những năm học trước
              <br />
              Tạo lớp học mới từ danh sách các học sinh có trong trường
              <br />
            </p>
          </div>
          <div className="cards">
            <Card
              img={studentImg}
              link="add/add-student"
              content="Thêm học sinh"
              color="linear-gradient(80.24deg, #96ABE7 1.31%, #96A2EA 15.22%, #9788F2 37.23%, #985FFE 66.2%, #985CFF 68.51%)"
            ></Card>
            <Card
              img={classImg}
              link="add/add-class"
              content="Tạo lớp học"
              color="linear-gradient(80.24deg, #96DDE7 1.31%, #96EAEA 15.22%, #88ECF2 37.23%, #5FE1FE 66.2%)"
            ></Card>
          </div>
        </div>
      </div>
    </>
  );
};
