import React, { useState } from "react";
import CheckOutSideClick from "../handle-event/CheckOutSideClick";
import "./Selected.scss";

function Selected({ props }) {
  const [isActive, setIsActive] = useState(false);
  const [selected, setSelected] = useState(false);

  function handleClose() {
    setIsActive(false);
  }

  function handleClickClose(e) {
    if (e.target) setIsActive(!isActive);
  }

  return (
    <CheckOutSideClick onClickOutSide={handleClose}>
      <div className="dropdown_selected">
        <div
          tabIndex="0"
          className="dropdown_selected-btn"
          onClick={handleClickClose}
        >
          <span className="dropdown_selected-default">
            {selected || props[0]}
          </span>

          {!isActive ? (
            <i class="fa-solid fa-caret-down dropdown_selected-icon"></i>
          ) : (
            <i class="fa-solid fa-caret-down dropdown_selected-icon__rotate"></i>
          )}
        </div>

        {isActive && (
          <ul className="dropdown_selected-content">
            {props.map((option) => (
              <li
                className="dropdown_selected-item"
                onClick={(e) => {
                  setSelected(option);
                  setIsActive(false);
                }}
              >
                <div className="dropdown_selected-item__manipulation">
                  <span>{option}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </CheckOutSideClick>
  );
}

export default Selected;
