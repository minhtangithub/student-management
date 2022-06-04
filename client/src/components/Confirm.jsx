import React from "react";
import { Notification } from "./Notification";
import { Button } from "./Button";
import "./Confirm.scss";
export const Confirm = ({
  confirmType = "edit",
  result = [],
  handleConfirmCancelBtn,
  handleConfirmAcceptBtn,
  status = "success",
}) => {
  const handleCloseBtnWithAdd = () => {
    console.log("tắt thông báo thêm");
    // document.querySelector(".confirm.add .notification").style.display = "none";
    // document.querySelector(".notification").style.display = "none";
    document.querySelector(".confirm.add").style.display = "none";
    document.querySelector(".notification").style.display = "none";
  };

  const handleCloseBtnWithEdit = () => {
    // document.querySelector(".notification").style.display = "none";
    document.querySelector(".confirm.edit").style.display = "none";
    document.querySelector(".notification").style.display = "none";
  };

  const handleCloseBtnWithDelete = () => {
    // document.querySelector(".notification").style.display = "none";
    document.querySelector(".confirm.delete").style.display = "none";
    document.querySelector(".notification").style.display = "none";
  };

  const handleCloseBtnWithDeleteAll = () => {
    // document.querySelector(" .notification").style.display = "none";
    document.querySelector(".confirm.delete-all").style.display = "none";
    document.querySelector(".notification").style.display = "none";
  };

  const handleCloseBtnWithOverride = () => {
    document.querySelector(".confirm.override .notification").style.display =
      "none";
    document.querySelector(".confirm.override").style.display = "none";
  };
  switch (confirmType) {
    case "add":
      return (
        <>
          <div className="confirm add" style={{ display: "none" }}>
            <div className="confirm__container">
              <h2>Xác nhận thêm mới</h2>
              <div className="confirm__container__content">
                {result.map((item, i) => {
                  return (
                    <>
                      {Object.entries(item).map(([key, value]) => {
                        if (key !== "Checked" && key !== "Edit" && key !== "ID")
                          return (
                            <p>
                              {key}: {value}
                            </p>
                          );
                      })}
                      {i !== result.length - 1 ? (
                        <div className="seperate"></div>
                      ) : (
                        <></>
                      )}
                    </>
                  );
                })}
              </div>
              <div className="btns al-center al-center">
                <Button
                  btnType="cancel"
                  onClick={handleConfirmCancelBtn}
                  innerText="Hủy"
                ></Button>
                <Button
                  btnType="save"
                  onClick={handleConfirmAcceptBtn}
                  innerText="Lưu"
                ></Button>
              </div>
            </div>
          </div>
          <Notification
            status={status}
            handleSuccessCloseBtn={handleCloseBtnWithAdd}
          />
        </>
      );
    case "edit":
      return (
        <>
          <div className="confirm edit" style={{ display: "none" }}>
            <div className="confirm__container">
              <h2>Xác nhận sửa</h2>
              <div className="confirm__container__content">
                {result.map((item, i) => {
                  return (
                    <>
                      {Object.entries(item).map(([key, value]) => {
                        if (key !== "Checked" && key !== "Edit" && key !== "ID")
                          return (
                            <p>
                              {key}: {value}
                            </p>
                          );
                      })}
                      {i !== result.length - 1 ? (
                        <div className="seperate"></div>
                      ) : (
                        <></>
                      )}
                    </>
                  );
                })}
              </div>
              <div className="btns al-center">
                <Button
                  btnType="cancel"
                  onClick={handleConfirmCancelBtn}
                  innerText="Hủy"
                ></Button>
                <Button
                  btnType="save"
                  onClick={handleConfirmAcceptBtn}
                  innerText="Lưu"
                ></Button>
              </div>
            </div>
          </div>
          <Notification
            status={status}
            handleSuccessCloseBtn={handleCloseBtnWithEdit}
          />
        </>
      );
    case "delete":
      return (
        <>
          <div className="confirm delete" style={{ display: "none" }}>
            <div className="confirm__container">
              <h2>Xác nhận xóa</h2>
              <div className="confirm__container__content">
                {result.map((item, i) => {
                  return (
                    <>
                      {Object.entries(item).map(([key, value]) => {
                        if (key !== "Checked" && key !== "Edit")
                          return (
                            <p>
                              {key}: {value}
                            </p>
                          );
                      })}
                      {i !== result.length - 1 ? (
                        <div className="seperate"></div>
                      ) : (
                        <></>
                      )}
                    </>
                  );
                })}
              </div>
              <div className="btns al-center al-center">
                <Button
                  btnType="cancel"
                  onClick={handleConfirmCancelBtn}
                  innerText="Hủy"
                ></Button>
                <Button
                  btnType="save"
                  onClick={handleConfirmAcceptBtn}
                  innerText="Xóa"
                ></Button>
              </div>
            </div>
          </div>

          <Notification
            handleSuccessCloseBtn={handleCloseBtnWithDelete}
            status={status}
          />
        </>
      );
    case "delete-all":
      return (
        <>
          <div className="confirm delete-all" style={{ display: "none" }}>
            <div className="confirm__container">
              <h2>Xác nhận xóa tất cả bên dưới</h2>
              <div className="confirm__container__content">
                {result.map((item, i) => {
                  return (
                    <>
                      {Object.entries(item).map(([key, value]) => {
                        if (key !== "Checked" && key !== "Edit")
                          return (
                            <p>
                              {key}: {value}
                            </p>
                          );
                      })}
                      {i !== result.length - 1 ? (
                        <div className="seperate"></div>
                      ) : (
                        <></>
                      )}
                    </>
                  );
                })}
              </div>
              <div className="btns al-center al-center">
                <Button
                  btnType="cancel"
                  onClick={handleConfirmCancelBtn}
                  innerText="Hủy"
                ></Button>
                <Button
                  btnType="save"
                  onClick={handleConfirmAcceptBtn}
                  innerText="Xóa"
                ></Button>
              </div>
            </div>
          </div>

          <Notification
            handleSuccessCloseBtn={handleCloseBtnWithDeleteAll}
            status={status}
          />
        </>
      );
    case "override":
      return (
        <div className="confirm override" style={{ display: "none" }}>
          <div className="confirm__container">
            <Notification
              handleSuccessCloseBtn={handleCloseBtnWithOverride}
              status={status}
            />
            <h2>Đối tượng đã tồn tại, bạn có muốn ghi đè?</h2>
            <div className="confirm__container__content">
              {/* {result.map((item, i) => {
                return (
                  <>
                    {Object.entries(item).map(([key, value]) => {
                      if (key !== "Checked" && key !== "Edit")
                        return (
                          <p>
                            {key}: {value}
                          </p>
                        );
                    })}
                    {i !== result.length - 1 ? (
                      <div className="seperate"></div>
                    ) : (
                      <></>
                    )}
                  </>
                );
              })} */}
            </div>
            <div className="btns al-center al-center">
              <Button
                btnType="cancel"
                onClick={handleConfirmCancelBtn}
                innerText="Hủy"
              ></Button>
              <Button
                btnType="save"
                onClick={handleConfirmAcceptBtn}
                innerText="Ghi đè"
              ></Button>
            </div>
          </div>
        </div>
      );
  }
};
