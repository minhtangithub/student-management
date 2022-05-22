import React from "react";
import "./Setting.scss";
// import EditIcon from "../assets/edit-icon.png";
// import { Link } from "react-router-dom";

// import { BiRightArrow } from "react-icons/bi";
import Card1 from "../assets/card1.png";
import Card2 from "../assets/card2.png";
import Card3 from "../assets/card3.png";

import { Card } from "../components/Card";

export const Setting = () => {
  return (
    <>
      <div className="setting">
        <h3>Thay đổi quy định</h3>
        <div className="card-container">
          <Card
            img={Card1}
            link="/setting/setting-list"
            name="setting"
            content="Danh sách tham số"
          ></Card>
          <Card
            img={Card2}
            link="/setting/class-list"
            name="class"
            content="Danh sách lớp"
          ></Card>
          <Card
            img={Card3}
            link="/setting/subject-list"
            name="subject"
            content="Danh sách môn học"
          ></Card>
        </div>
      </div>
    </>
  );
};
