import React from "react";
import "./Card.scss";
import { Link } from "react-router-dom";

export const Card = (props) => {
  return (
    <Link className="card" to={props.link}>
      <img src={props.img} className="card-img" alt="" />
      {/* <h2 className="card-tagName">{props.name}</h2> */}
      {/* <img src={cardTag1} className="card-tag" alt="" /> */}
      <div className="card-content">
        <div className="card-btn" style={{ background: props.color }}>
          {props.content}
        </div>
      </div>
    </Link>
  );
};
