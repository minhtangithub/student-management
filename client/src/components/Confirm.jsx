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
    document.querySelector(".confirm.add .notification").style.display = "none";
    document.querySelector(".confirm.add").style.display = "none";
  };

  const handleCloseBtnWithEdit = () => {
    document.querySelector(".confirm.edit .notification").style.display =
      "none";
    document.querySelector(".confirm.edit").style.display = "none";
  };

  const handleCloseBtnWithDelete = () => {
    document.querySelector(".confirm.delete .notification").style.display =
      "none";
    document.querySelector(".confirm.delete").style.display = "none";
  };

  const handleCloseBtnWithDeleteAll = () => {
    document.querySelector(".confirm.delete-all .notification").style.display =
      "none";
    document.querySelector(".confirm.delete-all").style.display = "none";
  };

  const handleCloseBtnWithOverride = () => {
    document.querySelector(".confirm.override .notification").style.display =
      "none";
    document.querySelector(".confirm.override").style.display = "none";
  };
  switch (confirmType) {
    case "add":
      return (
        <div className="confirm add" style={{ display: "none" }}>
          <div className="confirm__container">
            <Notification
              status={status}
              handleSuccessCloseBtn={handleCloseBtnWithAdd}
            />
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
      );
    case "edit":
      return (
        <div className="confirm edit" style={{ display: "none" }}>
          <div className="confirm__container">
            <Notification
              status={status}
              handleSuccessCloseBtn={handleCloseBtnWithEdit}
            />
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
      );
    case "delete":
      return (
        <div className="confirm delete" style={{ display: "none" }}>
          <div className="confirm__container">
            <Notification
              handleSuccessCloseBtn={handleCloseBtnWithDelete}
              status={status}
            />
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
      );
    case "delete-all":
    case "delete":
      return (
        <div className="confirm delete-all" style={{ display: "none" }}>
          <div className="confirm__container">
            <Notification
              handleSuccessCloseBtn={handleCloseBtnWithDeleteAll}
              status={status}
            />
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
