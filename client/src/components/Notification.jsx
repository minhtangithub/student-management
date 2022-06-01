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
  },
  message = "",
}) => {
  const handleFailedCloseBtn = () => {
    document.querySelector(
      ".notification--failed"
    ).parentElement.style.display = "none";
    // document.querySelectorAll(".comfirm").forEach((item) => {
    //   item.style.display = "none";
    // });
  };
  const getStatus = () => {
    switch (status) {
      case "success": {
        return (
          <>
            <div className="top">
              <button onClick={handleSuccessCloseBtn}>
                {/* <i>
                <GrFormClose />
              </i> */}
                <img className="closeBtn" src={CloseBtn} alt="" />
              </button>
            </div>
            <div className="main">
              <img src={SuccessImg} alt="" />
              <p>Thao tác thành công!</p>
              <button
                className="confirmBtn successBtn"
                onClick={handleSuccessCloseBtn}
              >
                <span>Tiếp tục</span>
                <img className="btnIcon" src={continueIcon} alt="" />
              </button>
            </div>
          </>
        );
        break;
      }

      case "failed": {
        return (
          <>
            <div className="top">
              <button onClick={handleFailedCloseBtn}>
                {/* <i>
                <GrFormClose />
              </i> */}
                <img className="closeBtn" src={CloseBtn} alt="" />
              </button>
            </div>
            <div className="main">
              <img src={FailImg} alt="" />
              <p>Thao tác thất bại!</p>
              <h4 className="failed-message">{message}</h4>
              <button
                className="confirmBtn failBtn"
                onClick={handleFailedCloseBtn}
              >
                <span>Thử lại</span>
                <img className="btnIcon" src={repeatIcon} alt="" />
              </button>
            </div>
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
