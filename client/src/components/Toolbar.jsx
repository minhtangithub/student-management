import React from "react";

import Filter from "../assets/Filter.png";
import SearchIcon from "../assets/Search-icon.png";
import AddIcon from "../assets/Add-icon.png";

import { Link } from "react-router-dom";
import "./Toolbar.scss";

export const Toolbar = ({ btnType, linkTo }) => {
  return (
    <div className="toolbar">
      <div className="left">
        <button className="filter-btn">
          <img src={Filter} alt="" />
        </button>
        <div className="search">
          <img src={SearchIcon} alt="" />
          <input type="text" placeholder="Bạn tìm kiếm gì?..." />
        </div>
      </div>
      {btnType === "update" ? (
        <button className="update-btn">Lưu</button>
      ) : (
        <button className="add-btn">
          <Link to={linkTo}>
            <img src={AddIcon} alt="" />
            Thêm mới
          </Link>
        </button>
      )}
    </div>
  );
};
