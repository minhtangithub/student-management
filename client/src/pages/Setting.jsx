import React from "react";
import "./Setting.scss";
import EditIcon from "../assets/edit-icon.png";
import { Link } from "react-router-dom";

import { BiRightArrow } from "react-icons/bi";

export const Setting = () => {
  return (
    <>
      <div className="setting">
        <h3>Thay đổi quy định</h3>
        <Link to="/setting/setting-list">
          <i>
            <BiRightArrow></BiRightArrow>
          </i>
          Danh sách tham số
        </Link>
        <Link to="/setting/class-list">
          {" "}
          <i>
            <BiRightArrow></BiRightArrow>
          </i>
          Danh sách lớp
        </Link>
        <Link to="/setting/subject-list">
          {" "}
          <i>
            <BiRightArrow></BiRightArrow>
          </i>
          Danh sách môn học
        </Link>
      </div>
    </>
  );
};
