import React from "react";

export const handler = {
  handleConfirmCancelBtn: (confirmType) => {},
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
};

export const helper = {
  generateID: (dataArr) => {
    const IDArr = dataArr.map((item) => item.ID);
    let newIDNum = Number(IDArr[IDArr.length - 1]) + 1;
    let newIDString;
    if (newIDNum < 10) {
      newIDString = `00${newIDNum}`;
    } else if (newIDNum < 100) {
      newIDString = `0${newIDNum}`;
    } else {
      newIDString = `${newIDNum}`;
    }

    return newIDString;
  },
  generateArrCopy: (dataArr) => {
    return JSON.parse(JSON.stringify(dataArr));
  },

  turnOnNotification: (type) => {
    switch (type) {
      case "edit": {
        document.querySelector(".confirm.edit .notification").style.display =
          "flex";
        break;
      }
      case "add": {
        document.querySelector(".confirm.add .notification").style.display =
          "flex";
        break;
      }
      case "delete": {
        document.querySelector(".confirm.delete .notification").style.display =
          "flex";
        break;
      }
      case "delete-all": {
        document.querySelector(
          ".confirm.delete-all .notification"
        ).style.display = "flex";
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

  convertAPItoUI: {
    setting: (apiArr) => {
      const UIArr = apiArr.map((item) => {
        return {
          ...item,
          ID: item.idSet,
          Name: item.nameSet,
          Value: item.valueSet,
        };
      });
      return UIArr;
    },
  },

  convertUItoAPI: {
    setting: (UIArr) => {
      const apiArr = UIArr.map((item) => {
        return {
          ...item,
          idSet: item.ID,
          nameSet: item.Name,
          valueSet: item.Value,
        };
      });
      return apiArr;
    },
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
