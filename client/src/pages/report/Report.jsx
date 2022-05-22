import React from "react";
import "./Report.scss";
// import { Link } from "react-router-dom";

import Card3 from "../../assets/card3.png";
import Card4 from "../../assets/card4.png";

// import { BiRightArrow } from "react-icons/bi";
import { Card } from "../../components/Card";

export const Report = () => {
  return (
    <>
      <div className="report">
        <h3>Tạo báo cáo</h3>
        <div className="card-container">
          <Card
            img={Card3}
            link="/report/report-subject"
            name="subject"
            content="Báo cáo môn học"
          ></Card>
          <Card
            img={Card4}
            link="/report/report-term"
            name="term"
            content="Báo cáo học kỳ"
          ></Card>
        </div>
      </div>
    </>
  );
};
