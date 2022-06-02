import React from "react";
import "./Setting.scss";
// import EditIcon from "../assets/edit-icon.png";
// import { Link } from "react-router-dom";

// import { BiRightArrow } from "react-icons/bi";
import subjectImg from "../assets/subject.png";
import imgPage from "../assets/imgPage.png";
import classImg from "../assets/class.png";
import settingImg from "../assets/settingList.png";

import { Card } from "../components/Card";

export const Setting = () => {
  return (
    <>
      <div className="setting">
        {/* <h3>Thay đổi quy định</h3>
        <div className="guide">
          Chỉnh sửa danh sách các tham số <br />
          Chỉnh sửa danh sách tên các lớp của trường <br />
          Chỉnh sửa danh sách tên các môn học được dạy của trường
        </div> */}
        <div className="setting-home">
          <img className="img-main" src={imgPage} alt="" />
          <div className="main-1"></div>
          <div className="main-2">
            <div className="desc">
              <h1>
                Thay đổi danh sách các <br /> tham số, các lớp học, môn học
              </h1>
              <p>
                Thay đổi giá trị của các tham số <br />
                Chỉnh sửa danh sách tên các lớp của trường
                <br />
                Chỉnh sửa danh sách tên các môn học được dạy của trường
                <br />
              </p>
            </div>
            <div className="cards">
              <Card
                img={settingImg}
                link="setting/setting-list"
                content="Tham số"
                color="linear-gradient(79.36deg, #40EEB6 -4.42%, #59FFCD 29.78%, #57FAC9 53.49%, #2FF3DC 86.23%)"
              ></Card>
              <Card
                img={classImg}
                link="setting/class-list"
                content="Danh sách lớp"
                color="linear-gradient(80.24deg, #96DDE7 1.31%, #96EAEA 15.22%, #88ECF2 37.23%, #5FE1FE 66.2%)"
              ></Card>
              <Card
                img={subjectImg}
                link="setting/subject-list"
                content="Danh sách môn"
                color="linear-gradient(80.24deg, #FF5823 1.31%, #FE844F 37.88%, #FB9824 71.68%, #FFC122 100.64%, #FFBB0C 100.64%)"
              ></Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
