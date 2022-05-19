import React from "react";
import "./Report.scss";
import { Link } from "react-router-dom";

import { BiRightArrow } from "react-icons/bi";

export const Report = () => {
  return (
    <>
      <div className="report">
        <h3>Báo cáo</h3>
        <Link to="/report/report-subject">
          <i>
            <BiRightArrow></BiRightArrow>
          </i>
          Báo cáo môn học
        </Link>
        <Link to="/report/report-term">
          {" "}
          <i>
            <BiRightArrow></BiRightArrow>
          </i>
          Báo cáo học kỳ
        </Link>
      </div>
    </>
  );
};
