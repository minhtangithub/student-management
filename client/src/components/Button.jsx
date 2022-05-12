import React from "react";
import "./Button.scss";

export const Button = ({
  btnType = "add",
  innerText = "Lỗi",
  onClick = () => {},
  dataSet = "0",
}) => {
  switch (btnType) {
    case "add":
      return (
        <button className="add-btn" onClick={onClick} data-set={dataSet}>
          {innerText}
        </button>
      );
    case "save":
      return (
        <button className="save-btn" onClick={onClick} data-set={dataSet}>
          {innerText}
        </button>
      );
    case "cancel":
      return (
        <button className="cancel-btn" onClick={onClick} data-set={dataSet}>
          {innerText}
        </button>
      );
    case "delete-selected":
      return (
        <button
          className="delete-selected-btn"
          onClick={onClick}
          data-set={dataSet}
        >
          {innerText}
        </button>
      );
    case "clear":
      return (
        <button className="clear-btn" onClick={onClick} data-set={dataSet}>
          {innerText}
        </button>
      );
    case "update":
      return (
        <button className="update-btn" onClick={onClick} data-set={dataSet}>
          {innerText}
        </button>
      );
    case "export":
      return (
        <button className="export-btn" onClick={onClick} data-set={dataSet}>
          {innerText}
        </button>
      );
    case "save--small":
      return (
        <button
          className="save-btn--small"
          onClick={onClick}
          data-set={dataSet}
        >
          {innerText}
        </button>
      );

    default:
      return <>Lỗi</>;
  }
};
