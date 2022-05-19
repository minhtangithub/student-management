import React from "react";
import "./Add.scss";
import { Link } from "react-router-dom";

import { BiRightArrow } from "react-icons/bi";

export const Add = () => {
  return (
    <>
      <div className="add">
        <h3>Thêm</h3>
        <Link to="/add/add-student">
          <i>
            <BiRightArrow></BiRightArrow>
          </i>
          Tiếp nhận học sinh
        </Link>
        <Link to="/add/add-class">
          {" "}
          <i>
            <BiRightArrow></BiRightArrow>
          </i>
          Lập danh sách lớp
        </Link>
      </div>
    </>
  );
};
