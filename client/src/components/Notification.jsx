import React from "react";
import SuccessImg from "../../src/assets/Success.png";
import FailImg from "../../src/assets/Fail.png";
import "./Notification.scss";
import { GrFormClose } from "react-icons/gr";

export const Notification = ({ status, handleCloseBtn }) => {
  const getStatus = () => {
    switch (status) {
      case "success":
        return (
          <>
            <img src={SuccessImg} alt="" />
            <p>Thành công</p>
          </>
        );

      case "failed":
        return (
          <>
            <img src={FailImg} alt="" />
            <p>Thất bại</p>
          </>
        );

      // case "warning":
      //   return <>Warning</>;

      default:
        return <>Notification Lỗi rồi</>;
    }
  };

  // const handleCloseBtn = () => {
  //   document.querySelector(".notification").style.display = "none";
  //   document.querySelector(".confirm").style.display = "none";
  // };

  return (
    <div className="notification" style={{ display: "none" }}>
      <div className="notification--success">
        <div className="notification__container">
          <button onClick={handleCloseBtn}>
            <i>
              <GrFormClose />
            </i>
          </button>
          {getStatus()}
        </div>
      </div>
      )
    </div>
  );
};
