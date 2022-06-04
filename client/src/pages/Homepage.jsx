import React from "react";
import NumClass from "../assets/Num-of-class.png";
import NumStudent from "../assets/Num-of-student.png";
import NumSubject from "../assets/Num-of-subject.png";
import NumGrade from "../assets/Num-of-grade.png";
import HeroImg from "../assets/Hero-img.png";
import HeroBg from "../assets/Hero-bg.png";
import ArrowRight from "../assets/arrow-right.png";
import TextBg from "../assets/heading-bg.png";
import "./Homepage.scss";
import { Link } from "react-router-dom";
import { api } from "../api/api";
import { useEffect, useState } from "react";

export const Homepage = () => {
  const [numClass, setNumClass] = useState(0);
  const [numGrade, setNumGrade] = useState(0);
  const [numStudent, setNumStudent] = useState(0);
  const [numSubject, setNumSubject] = useState(0);
  useEffect(() => {
    const getData = async () => {
      const classArr = await api.getClassListArr();
      const gradeArr = await api.getGradeList();
      const studentArr = await api.getStudentInfoArr();
      const subjectArr = await api.getSubjectList();

      setNumClass(classArr.length);
      setNumGrade(gradeArr.length);
      setNumStudent(studentArr.length);
      setNumSubject(subjectArr.length);
    };

    getData();
  }, []);

  return (
    <div className="homepage">
      <div className="content">
        <div className="content-top">
          <h4 className="general">Tổng quan</h4>
          <div className="content-num">
            <div className="num-of-class">
              <h4>Tổng số lớp học</h4>
              <div className="num-and-icon">
                <h1>{numClass}</h1>
                <img src={NumClass} alt="" />
              </div>
            </div>
            <div className="num-of-subject">
              <h4>Tổng số môn học</h4>
              <div className="num-and-icon">
                <h1>{numSubject}</h1>
                <img src={NumSubject} alt="" />
              </div>
            </div>
            <div className="num-of-grade">
              <h4>Tổng số khối lớp</h4>
              <div className="num-and-icon">
                <h1>{numGrade}</h1>
                <img src={NumGrade} alt="" />
              </div>
            </div>
            <div className="num-of-student">
              <h4>Tổng số học sinh</h4>
              <div className="num-and-icon">
                <h1>{numStudent}</h1>
                <img src={NumStudent} alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="content-bottom">
          <div className="content__left">
            <h1 className="content-heading">
              Smart And<br></br>Intelligence Tool For<br></br> School Management
            </h1>
            <div className="content-desc">
              Education is smart enough to change the <br></br> human mind
              positively!
            </div>
            <Link to="/search">
              <button className="btn-start">
                Get Started{" "}
                <img src={ArrowRight} alt="" className="img-start" />
              </button>
            </Link>
            <img className="text-bg" src={TextBg} alt="" />
          </div>
          <div className="content__right">
            <img className="hero-img" src={HeroImg} alt="" />
            <img className="hero-bg" src={HeroBg} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};
