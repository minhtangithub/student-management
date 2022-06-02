import React from "react";
import "./Report.scss";
// import { Link } from "react-router-dom";

import subjectImg from "../../assets/subject.png";
import termImg from "../../assets/term.png";
import imgPage from "../../assets/imgPage.png";

// import { BiRightArrow } from "react-icons/bi";
import { Card } from "../../components/Card";

export const Report = () => {
  return (
    <>
      <div className="report">
        {/* <h3>Tạo báo cáo</h3>
        <div className="guide">
          Tạo báo cáo theo môn học: danh sách các lớp có học môn học đó
          <br />
          Tạo báo cáo theo học kì: danh sách các lớp học trong học kì
        </div> */}
        <img className="img-main" src={imgPage} alt="" />
        <div className="main-1"></div>
        <div className="main-2">
          <div className="desc">
            <h1>
              Báo cáo tổng kết môn học, <br />
              tổng kết học kỳ theo từng lớp
            </h1>
            <p>
              Tạo báo cáo theo từng môn của <br /> tất cả các lớp theo học kỳ -
              năm học.
              <br />
              Tạo báo cáo theo học kỳ của tất cả các lớp trong học kì đó.
              <br />
            </p>
          </div>
          <div className="cards">
            <Card
              img={subjectImg}
              link="report/report-subject"
              content="Báo cáo môn"
              color="linear-gradient(80.24deg, #FF5823 1.31%, #FE844F 37.88%, #FB9824 71.68%, #FFC122 100.64%, #FFBB0C 100.64%)"
            ></Card>
            <Card
              img={termImg}
              link="report/report-term"
              content="Báo cáo học kỳ"
              color="linear-gradient(79.53deg, #9004FF -15.74%, #E756FF 21.23%, #7B2AFF 107.65%)"
            ></Card>
          </div>
        </div>
      </div>
    </>
  );
};
