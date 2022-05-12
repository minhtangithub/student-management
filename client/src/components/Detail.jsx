import React from "react";
import { Notification } from "./Notification";
import { Button } from "./Button";
import "./Detail.scss";
import { GrFormClose } from "react-icons/gr";

export const Detail = ({ result }) => {
  const handleCloseBtn = () => {
    document.querySelector(".detail").style.display = "none";
  };
  return (
    <div className="detail" style={{ display: "none" }}>
      <div className="detail__container">
        <h2>Thông tin chi tiết học sinh</h2>
        <button onClick={handleCloseBtn}>
          <i>
            <GrFormClose />
          </i>
        </button>
        <div className="detail__container__content">
          {result.map((item, i) => {
            return (
              <>
                {Object.entries(item).map(([key, value]) => {
                  return (
                    <p>
                      {key} : {value}
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
      </div>
    </div>
  );
};
