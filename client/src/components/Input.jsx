import React from "react";
import "./Input.scss";

export const Input = ({
  type = "text",
  placeholder = "",
  labelText = "",
  rows = "5",
  selectName = "",
  options = [],
  //options có dạng [{value, text}, {}, {}]
}) => {
  // console.log(
  //   ">>> options:",
  //   options,
  //   "map: ",
  //   options.map((item) => {
  //     return <option value={item.value}>{item.text}</option>;
  //   })
  // );
  if (type == "text")
    return (
      <div className="grid__item">
        <label htmlFor="">{labelText}</label>
        <input type="text" placeholder={placeholder} required={true} />
      </div>
    );
  else if (type == "email")
    return (
      <div className="grid__item">
        <label htmlFor="">{labelText}</label>
        <input type="email" placeholder={placeholder} required={true} />
      </div>
    );
  else if (type == "textArea")
    return (
      <div className="grid__item" required={true}>
        <label htmlFor="">{labelText}</label>
        <textarea rows={rows} placeholder={placeholder} />
      </div>
    );
  else if (type == "select")
    return (
      <div className="grid__item select">
        <label htmlFor="">{labelText}</label>
        <select name={selectName}>
          {options.map((item) => {
            return <option value={item.value}>{item.text}</option>;
          })}
        </select>
      </div>
    );
  else if (type == "small")
    return (
      <input type="text" className="input--small" placeholder={placeholder} />
    );
  else
    return (
      <div className="grid__item" required={true}>
        <label htmlFor="">{labelText}</label>
        <input type={type} />
      </div>
    );
};
