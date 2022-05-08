import React from "react";
import "./Searchbar.scss";
import SearchIcon from "../assets/Search-icon.png";

export const Searchbar = () => {
  return (
    <div className="searchbar">
      <div className="wrapper">
        <div className="searchbar__container">
          <img src={SearchIcon} alt="" />
          <input type="text" placeholder="Bạn đang tìm gì?..." />
        </div>
      </div>
      {/* <h2 className='schoolname'>
        Trường THPT Chu Văn An
      </h2> */}
    </div>
  );
};
