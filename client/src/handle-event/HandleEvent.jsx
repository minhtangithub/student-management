import React from "react";
// import { classArr } from "../config/getAPI";
import { api } from "../api/api";
import { useState, useEffect } from "react";

export const handler = {
  handleClickEditBtn: (e, dataState, setDataState) => {
    if (e.target.classList.contains("edit-img")) {
      let index = +e.target.parentNode.getAttribute("data-set");
      let dataStateCopy = JSON.parse(JSON.stringify(dataState));
      dataStateCopy[index].Edit = true;
      setDataState(dataStateCopy);
    }
  },
  handleClickAddBtn: () => {
    document.querySelector(".row.add").style.display = "flex";
  },

  //giúp có sẵn giá trị khi bấm edit
  handleEditInputChange: (e, i, dataArr, setDataArr, property) => {
    let dataArrCopy = JSON.parse(JSON.stringify(dataArr));
    dataArrCopy[i][property] = e.target.value;
    setDataArr(dataArrCopy);
  },
};

export const helper = {
  generateID: (dataArr, idName, prefix = "") => {
    const lastID =
      dataArr.length > 0 ? dataArr[dataArr.length - 1][idName] : prefix + "000";
    const lastIDNumber = lastID.replace(prefix, "");
    let newIDNum = Number(lastIDNumber) + 1;
    let newID;
    if (newIDNum < 10) {
      newID = `${prefix}00${newIDNum}`;
    } else if (newIDNum < 100) {
      newID = `${prefix}0${newIDNum}`;
    } else {
      newID = `${prefix}${newIDNum}`;
    }

    return newID;
  },
  generateArrCopy: (dataArr) => {
    return JSON.parse(JSON.stringify(dataArr));
  },

  turnOnNotification: (type) => {
    switch (type) {
      case "edit": {
        document.querySelector(".confirm.edit").style.display = "none";
        document.querySelector(".notification").style.display = "flex";
        break;
      }
      case "add": {
        document.querySelector(".confirm.add").style.display = "none";
        document.querySelector(".notification").style.display = "flex";
        break;
      }
      case "delete": {
        document.querySelector(".confirm.delete").style.display = "none";
        document.querySelector(".notification").style.display = "flex";
        break;
      }
      case "delete-all": {
        document.querySelector(".confirm.delete-all").style.display = "none";
        document.querySelector(".notification").style.display = "flex";
        break;
      }
      // T
      default: {
        return;
      }
    }
  },

  turnOnConfirm: (type) => {
    switch (type) {
      case "delete-all": {
        document.querySelector(".confirm.delete-all").style.display = "flex";
        break;
      }
      case "delete": {
        document.querySelector(".confirm.delete").style.display = "flex";
        break;
      }
      case "add": {
        document.querySelector(".confirm.add").style.display = "flex";
        break;
      }
      case "edit": {
        document.querySelector(".confirm.edit").style.display = "flex";
        break;
      }
      // T
      default: {
        return;
      }
    }
  },
  turnOnDetail: () => {
    document.querySelector(".detail").style.display = "flex";
  },
  turnOffConfirm: (type) => {
    switch (type) {
      case "edit": {
        document.querySelector(".confirm.edit").style.display = "none";
        break;
      }
      case "delete": {
        document.querySelector(".confirm.delete").style.display = "none";
        break;
      }
      case "delete-all": {
        document.querySelector(".confirm.delete-all").style.display = "none";
        break;
      }
      case "add": {
        document.querySelector(".confirm.add").style.display = "none";
        break;
      }
      // T
      default: {
        return;
      }
    }
  },

  //checkType là loại cần check, data là dữ liệu cần kiểm tra được gom về 1 object
  //VD: validateData("empty", {name: ..., ....})

  validateData: (
    checkType,
    data,
    classArr,
    minAge,
    maxAge,
    minScore,
    maxScore
  ) => {
    let message;
    switch (checkType) {
      case "empty": {
        let isEmpty =
          Object.values(data).filter((item) => String(item).trim() == "")
            .length > 0;
        if (isEmpty) {
          message = "Không được để trống thông tin";
          return message;
        }
        break;
      }
      case "age": {
        let isAgeValid;
        let today = new Date();
        let thisYear = today.getFullYear();
        let [inputYear, inputMonth, inputDay] = data.dateOfBirth.split("-");
        let age = Number(thisYear) - Number(inputYear);
        isAgeValid = age >= minAge && age <= maxAge;
        console.log("age>>>", data.dateOfBirth);
        if (!isAgeValid) {
          message = "Tuổi không đúng quy định";
          return message;
        }
        break;
      }
      case "email": {
        let isEmailValid = data.email.includes("@");
        if (!isEmailValid) {
          message = "Nhập sai email";
          return message;
        }
        break;
      }
      case "number": {
        let isNumber = true;
        // console.log(data);
        Object.values(data).forEach((item) => {
          if (isNaN(Number(item))) {
            isNumber = false;
          }
        });
        if (!isNumber) {
          message = "Nhập dữ liệu không phải số";
          return message;
        }
        break;
      }

      case "class": {
        let isThereClass = true;
        const classNameArr = classArr.map((item) => item.nameClass);
        if (!classNameArr.includes(data.nameClass)) {
          isThereClass = false;
        }
        if (!isThereClass) {
          message = "Lớp không hợp lệ";
          return message;
        }
      }

      case "score": {
        let isScoreValid = true;
        console.log(data, minScore, maxScore);
        Object.values(data).forEach((item) => {
          if (
            Number(item) < Number(minScore) ||
            Number(item) > Number(maxScore)
          ) {
            isScoreValid = false;
          }
        });
        console.log(isScoreValid);
        if (!isScoreValid) {
          message = "Điểm phải từ 0 đến 10";
          return message;
        }
        break;
      }
    }
    return "ok";
  },
};

// chỉnh sửa ux/ui

export const handlerInterfaces = {
  toggleClass: (e) => {
    // console.log();
    var tags = Array.from(document.querySelectorAll(".sidebar a"));

    var currentTag = e.target;
    // xóa active cũ

    tags.forEach((tag) => {
      if (tag.classList.contains("active")) {
        tag.classList.remove("active");
        var parentLiTag = tag.closest("li");
        if (parentLiTag) {
          parentLiTag.style.backgroundColor = "inherit";
          var dropdown = parentLiTag.closest(".dropdown");
          if (dropdown) {
            var parentTag = dropdown.closest("li");
            if (parentTag) parentTag.style.backgroundColor = "inherit";
          }
        }
      }
    });

    // active hiện tại

    if (!currentTag.classList.contains("active")) {
      currentTag.classList.add("active");
      var parentLiTag = currentTag.closest("li");
      if (parentLiTag) {
        var dropdown = parentLiTag.closest(".dropdown");
        if (dropdown) {
          var parentTag = dropdown.closest("li");
          if (parentLiTag && parentTag)
            parentTag.style.backgroundColor = "rgba(25, 25, 143, 0.4)";
          if (parentTag)
            parentLiTag.style.backgroundColor = "rgba(242, 242, 242, 0.25)";
        } else {
          parentLiTag.style.backgroundColor = "rgba(25, 25, 143, 0.4";
        }
      }
    }
  },
};
