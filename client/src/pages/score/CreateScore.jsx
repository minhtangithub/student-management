import React from "react";
import "./CreateScore.scss";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Confirm } from "../../components/Confirm";
import { Notification } from "../../components/Notification";
// import { studentList } from "../../config/getAPI";
import { useState, useEffect } from "react";
import { helper } from "../../handle-event/HandleEvent";
import { useParams } from "react-router-dom";
import { api } from "../../api/api";

//get từ DS lớp, giữ lại id của HS
export const CreateScore = () => {
  const { className, subject, term, schoolYear } = useParams();
  const [status, setstatus] = useState("input");
  const [message, setMessage] = useState("");
  const [finalResult, setFinalResult] = useState([]);
  const [studentList, setStudentList] = useState([]);
  const [scoreSubjectState, setScoreSubjectState] = useState([]);
  const [classIDState, setClassIDState] = useState([]);
  const [subjectIDState, setSubjectIDState] = useState([]);
  const [schoolYearIDState, setSchoolYearIDState] = useState([]);
  const [minScore, setMinScore] = useState(0);
  const [maxScore, setMaxScore] = useState(10);
  // let classID, subjectID, schoolYearID;
  let coEff15MinID, coEff1PerID, termID;
  useEffect(() => {
    const getData = async () => {
      const classArr = await api.getCCLASS();
      const subjectArr = await api.getSubjectList();
      const schoolYearArr = await api.getSchoolYearList();
      const coEffArr = await api.getCoEff();
      const allStudents = await api.getStudentInfoArr();
      const termArr = await api.getTermList();
      const scoreArr = await api.getScoreSubject();

      let schoolYearID = schoolYearArr.find(
        (item) => item.nameSchYear === schoolYear
      )._id;

      termID = termArr.find((item) => item.nameTerm === term)._id;
      const selectedClassList = classArr.find(
        (item) =>
          item.nameClass === className && item.schoolYear === schoolYearID
      );
      let subjectID = subjectArr.find(
        (item) => item.nameSubject === subject
      )._id;
      let classID = selectedClassList._id;
      console.log(schoolYearID, subjectID, classID);
      // setClassList(selectedClassList);
      coEff15MinID = coEffArr[0]._id;
      coEff1PerID = coEffArr[1]._id;

      const newStudentList = allStudents
        .filter((item) => selectedClassList.students.includes(item._id))
        .map((item) => {
          return {
            ...item,
            nameStudent: item.fullName,
            studentID: item._id,
            classID: classID,
          };
        });
      // console.log(newStudentList);
      setStudentList(newStudentList);
      setClassIDState(classID);
      setSubjectIDState(subjectID);
      setSchoolYearIDState(schoolYearID);
      setScoreSubjectState(scoreArr);
    };
    getData();
  }, []);

  const handleClickAddBtn = () => {
    const finalResultTemp = [];
    const inputs15Min = document.querySelectorAll(".min-15 input");
    const inputs1Per = document.querySelectorAll(".per-1 input");
    studentList.forEach((item, i) => {
      const newItem = {
        ...item,
        score15Min: inputs15Min[i].value,
        score1Per: inputs1Per[i].value,
        avgScore: (
          (+inputs15Min[i].value + 2 * +inputs1Per[i].value) /
          3
        ).toFixed(2),
      };

      finalResultTemp.push(newItem);
    });
    //kiểm tra ràng buộc dữ liệu
    let checkEmptyMessage = "ok";
    let checkNumberMessage = "ok";
    let checkScoreMessage = "ok";
    finalResultTemp.forEach((item) => {
      if (helper.validateData("empty", item) !== "ok")
        checkEmptyMessage = helper.validateData("empty", item);
      if (
        helper.validateData("number", {
          score15Min: item.score15Min,
          score1Per: item.score1Per,
        }) !== "ok"
      )
        checkNumberMessage = helper.validateData("number", {
          score15Min: item.score15Min,
          score1Per: item.score1Per,
        });
      if (
        helper.validateData(
          "score",
          {
            score15Min: item.score15Min,
            score1Per: item.score1Per,
          },
          null,
          null,
          null,
          minScore,
          maxScore
        ) !== "ok"
      )
        checkScoreMessage = helper.validateData(
          "score",
          {
            score15Min: item.score15Min,
            score1Per: item.score1Per,
          },
          null,
          null,
          null,
          minScore,
          maxScore
        );
    });
    const checkMessageArr = [
      checkEmptyMessage,
      checkNumberMessage,
      checkScoreMessage,
    ];
    let isValid = checkMessageArr.filter((item) => item !== "ok").length == 0;
    if (!isValid) {
      //lấy thông báo thất bại đầu tiên
      const firstFailedMessage = checkMessageArr.filter(
        (item) => item !== "ok"
      )[0];
      setMessage(firstFailedMessage);
      document.querySelector(
        ".notification--failed"
      ).parentElement.style.display = "flex";
    } else {
      setFinalResult(finalResultTemp);
      setstatus("confirm");
    }
  };

  const handleClickSaveBtn = () => {
    document.querySelector(".confirm.add").style.display = "flex";
  };
  const handleConfirmAcceptBtn = () => {
    console.log(finalResult);
    //Xoá lớp cũ
    const existItems = scoreSubjectState.filter(
      (item) => item.cClass === classIDState && item.subject === subjectIDState
    );
    existItems.forEach((item) => {
      api.deleteScoreSubject(item._id);
    });

    //Lưu xuống CSDL
    const payloadToApi = finalResult.map((item) => {
      return {
        student: item.studentID,
        cClass: classIDState,
        subject: subjectIDState,
        term: termID,
        scoreDetails: [
          {
            scoreName: "Điểm 15 phút",
            score: item.score15Min,
            coEff: coEff15MinID,
          },
          {
            scoreName: "Điểm 1 tiết",
            score: item.score1Per,
            coEff: coEff1PerID,
          },
        ],
        avgScore: item.avgScore,
      };
    });

    payloadToApi.forEach((item) => api.postScoreSubject(item));
    document.querySelector(".notification").style.display = "flex";
    document.querySelector(".confirm.add").style.display = "none";
  };
  const handleConfirmCancelBtn = () => {
    document.querySelector(".confirm.add").style.display = "none";
  };
  return (
    <>
      <Confirm
        confirmType="add"
        result={[]}
        handleConfirmAcceptBtn={handleConfirmAcceptBtn}
        handleConfirmCancelBtn={handleConfirmCancelBtn}
      />
      <Notification status="failed" message={message} />

      {status == "input" ? (
        <div className="create-score">
          <h3>Tạo bảng điểm</h3>
          <div className="guide">
            Nhập đầy đủ từng cột điểm cho từng học sinh. Điểm trung bình sẽ được
            tính tự động
          </div>
          <div className="score-info">
            <h4>Lớp: {className}</h4>
            <h4>{term}</h4>
            <h4>Năm học: {schoolYear}</h4>
            <h4>Môn học: {subject}</h4>
          </div>
          <div className="container">
            <div className="row heading">
              <div className="item col-10-percent center al-center">STT</div>
              <div className="item col-30-percent center al-left pl-50">
                Họ Tên
              </div>
              <div className="item col-20-percent center al-center">
                Điểm 15'
              </div>
              <div className="item col-20-percent center al-center">
                Điểm 1 tiết
              </div>
              <div className="item col-20-percent center al-center">
                Điểm TB
              </div>
            </div>
            {studentList.map((item, i) => (
              <div className="row content">
                <div className="item col-10-percent center al-center">
                  {i + 1}
                </div>
                <div className="item col-30-percent center al-left pl-50">
                  {item.nameStudent}
                </div>
                <div className="item col-20-percent center al-center min-15">
                  <Input type="small" placeholder="Nhập điểm 15'..." />
                </div>
                <div className="item col-20-percent center al-center per-1">
                  <Input type="small" placeholder="Nhập điểm 1 tiết..." />
                </div>
                <div className="item col-20-percent center al-center">
                  {/* {avgScore[i]} */}
                </div>
              </div>
            ))}
          </div>
          <div className="btns">
            <Button innerText="Tạo" btnType="add" onClick={handleClickAddBtn} />
          </div>
        </div>
      ) : (
        <div className="create-score">
          <h3>Tạo bảng điểm</h3>
          <div className="guide">
            Nhập đầy đủ từng cột điểm cho từng học sinh. Điểm trung bình sẽ được
            tính tự động
          </div>
          <div className="score-info">
            <h4>Lớp: {className}</h4>
            <h4>Học kỳ: {term}</h4>
            <h4>Năm học: {schoolYear}</h4>
            <h4>Môn học: {subject}</h4>
          </div>
          <div className="container">
            <div className="row heading">
              <div className="item col-10-percent center al-center">STT</div>
              <div className="item col-30-percent center al-left pl-70">
                Họ Tên
              </div>
              <div className="item col-20-percent center al-center">
                Điểm 15'
              </div>
              <div className="item col-20-percent center al-center">
                Điểm 1 tiết
              </div>
              <div className="item col-20-percent center al-center">
                Điểm TB
              </div>
            </div>
            {studentList.map((item, i) => (
              <div className="row content">
                <div className="item col-10-percent center al-center">
                  {i + 1}
                </div>
                <div className="item col-30-percent center al-left pl-50">
                  {item.nameStudent}
                </div>
                <div className="item col-20-percent center al-center min-15">
                  {finalResult[i].score15Min}
                </div>
                <div className="item col-20-percent center al-center per-1">
                  {finalResult[i].score1Per}
                </div>
                <div className="item col-20-percent center al-center">
                  {finalResult[i].avgScore}
                </div>
              </div>
            ))}
          </div>
          <div className="btns">
            <Button
              innerText="Lưu"
              btnType="save"
              onClick={handleClickSaveBtn}
            />
          </div>
        </div>
      )}
    </>
  );
};
