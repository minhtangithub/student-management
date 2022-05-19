import React from "react";
import SuccessImg from "../../src/assets/Success.png";
import FailImg from "../../src/assets/Fail.png";
import "./Notification.scss";
import { GrFormClose } from "react-icons/gr";

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
            <button onClick={handleSuccessCloseBtn}>
              <i>
                <GrFormClose />
              </i>
            </button>
            <img src={SuccessImg} alt="" />
            <p>Thành công</p>
          </>
        );
        break;
      }

      case "failed": {
        return (
          <>
            <button onClick={handleFailedCloseBtn}>
              <i>
                <GrFormClose />
              </i>
            </button>
            <img src={FailImg} alt="" />
            <p>Thất bại</p>
            <h4 className="failed-message">{message}</h4>
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
