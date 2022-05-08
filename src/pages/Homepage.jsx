import React from "react";
import NumClass from "../assets/Num-of-class.png";
import NumStudent from "../assets/Num-of-student.png";
import NumSubject from "../assets/Num-of-subject.png";
import HeroImg from "../assets/Hero-img.png";
import HeroBg from "../assets/Hero-bg.png";
import "./Homepage.scss";

export const Homepage = () => {
  return (
    <div className="homepage">
      <div className="content">
        <div className="content__left">
          <h4 className="general">Tổng quan</h4>
          <div className="num-of-class">
            <h4>Tổng số lớp học</h4>
            <div className="num-and-icon">
              <h1>15</h1>
              <img src={NumClass} alt="" />
            </div>
          </div>
          <div className="num-of-subject">
            <h4>Tổng số môn học</h4>
            <div className="num-and-icon">
              <h1>10</h1>
              <img src={NumSubject} alt="" />
            </div>
          </div>
          <div className="num-of-student">
            <h4>Tổng số học sinh</h4>
            <div className="num-and-icon">
              <h1>693</h1>
              <img src={NumStudent} alt="" />
            </div>
          </div>
        </div>
        <div className="content__right">
          <img className="hero-img" src={HeroImg} alt="" />
          <img className="hero-bg" src={HeroBg} alt="" />
        </div>
      </div>
    </div>
  );
};
