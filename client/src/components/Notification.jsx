import React from "react";
import SuccessImg from "../../src/assets/Success.png";
import FailImg from "../../src/assets/Fail.png";
import CloseBtn from "../../src/assets/closeBtn.png";
import repeatIcon from "../../src/assets/repeat.png";
import continueIcon from "../../src/assets/continue.png";

import "./Notification.scss";
// import { GrFormClose } from "react-icons/gr";

export const Notification = ({
  status,
  handleSuccessCloseBtn = () => {
    console.log("tắt thông báo thành công bị lỗi");
    // document.querySelector(".notification").style.display = "none";
  },
  message = "",
}) => {
  const handleFailedCloseBtn = () => {
    document.querySelector(
      ".notification--failed"
    ).parentElement.style.display = "none";
    // document.querySelector(".notification--failed").style.display = "none";
    // document.querySelectorAll(".comfirm").forEach((item) => {
    //   item.style.display = "none";
    // });
  };
  const getStatus = () => {
    switch (status) {
      case "success": {
        return (
          <>
            <div className="main">
              <p>Thao tác thành công!</p>
              <h4 className="success-message">Dữ liệu đã được cập nhật</h4>
              <button
                className="confirmBtn successBtn"
                onClick={handleSuccessCloseBtn}
              >
                <span>Tiếp tục</span>
              </button>
            </div>
            <img src={SuccessImg} alt="" />
          </>
        );
        break;
      }

      case "failed": {
        return (
          <>
            <div className="main">
              <p>Thao tác thất bại!</p>
              <h4 className="failed-message">{message}</h4>
              <button
                className="confirmBtn failBtn"
                onClick={handleFailedCloseBtn}
              >
                <span>Thử lại</span>
              </button>
            </div>
            <img src={FailImg} alt="" />
          </>
        );
        break;
      }

      default:
        return <>Notification Lỗi rồi</>;
    }
  };

  return (
    <>
      {status === "success" ? (
        <div className="notification" style={{ display: "none" }}>
          <div className="notification--success">
            <div className="notification__container">{getStatus()}</div>
          </div>
        </div>
      ) : (
        <div className="notification" style={{ display: "none" }}>
          <div className="notification--failed">
            <div className="notification__container">{getStatus()}</div>
          </div>
        </div>
      )}
    </>
  );
};
