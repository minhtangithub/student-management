import React from "react";
// import "./Setting.scss";
import EditIcon from "../../assets/edit-icon.png";
import { useState } from "react";
import { settingArr } from "../../config/getAPI";
import { Confirm } from "../../components/Confirm";
import { handler, helper } from "../../handle-event/HandleEvent";

export const SettingList = () => {
  const [settingArrState, setSettingArrState] = useState(settingArr);
  const [result, setResult] = useState([]);
  const [resultUI, setResultUI] = useState([]);

  const handleEvent = {
    handleConfirmAcceptBtn: {
      editSetting: () => {
        //tạo copy
        const settingArrStateCopy = helper.generateArrCopy(settingArrState);

        //cập nhật mảng
        let index = settingArrStateCopy.findIndex(
          (item) => item.ID == result[0].ID
        );
        settingArrStateCopy[index] = result[0];
        settingArrStateCopy[index].Edit = false;
        setSettingArrState(settingArrStateCopy);

        //hiển thị thông báo
        helper.turnOnNotification("edit");

        //cập nhật xuống CSDL
        //...
      },
    },

    handleSaveToEditBtn: {
      setting: (e) => {
        let settingArrStateCopy = JSON.parse(JSON.stringify(settingArrState));
        let index = +e.target.getAttribute("data-set");
        let inputs = e.target.closest(".row").querySelectorAll("input");
        settingArrStateCopy[index].Value = inputs[0].value;

        let newResult = settingArrStateCopy[index];
        setResult([newResult]);
        let newResultUI = {
          "Tên tham số": newResult.Name,
          "Giá trị": newResult.Value,
        };
        setResultUI([newResultUI]);
        helper.turnOnConfirm("edit");
      },
    },
  };

  return (
    <>
      <Confirm
        confirmType="edit"
        result={resultUI}
        handleConfirmCancelBtn={() => helper.turnOffConfirm("edit")}
        handleConfirmAcceptBtn={handleEvent.handleConfirmAcceptBtn.editSetting}
      />
      <div className="setting">
        <h3>Danh sách tham số</h3>
        <div className="container">
          <div className="grid">
            <div className="row heading">
              <div className="item col-33-percent center">Tên quy định</div>
              <div className="item col-33-percent center">Giá trị</div>
              <div className="item col-33-percent center">Thao tác</div>
            </div>
            {settingArrState.map((item, i) => (
              <>
                <div className="row content" key={i}>
                  <div className="item col-33-percent center ">{item.Name}</div>
                  <div className="item col-33-percent center">{item.Value}</div>
                  <div className="item col-33-percent center">
                    <button
                      className="edit-btn"
                      data-set={i}
                      onClick={(e) =>
                        handler.handleClickEditBtn(
                          e,
                          settingArrState,
                          setSettingArrState
                        )
                      }
                    >
                      <img className="edit-img" src={EditIcon} alt="" />
                    </button>
                  </div>
                </div>
                {item.Edit ? (
                  <div className="row content" key={i}>
                    <div className="item col-33-percent center "></div>
                    <div className="item col-33-percent center">
                      <input
                        type="text"
                        className="input--small"
                        placeholder="Nhập giá trị mới..."
                      />
                    </div>
                    <div className="item col-33-percent center save-btn__container">
                      <button
                        className="save-btn--small"
                        onClick={(e) =>
                          handleEvent.handleSaveToEditBtn.setting(e)
                        }
                        data-set={i}
                      >
                        Lưu
                      </button>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
