import React, { useEffect, useRef } from "react";

function CheckOutSideClick(props) {
  const ref = useRef(null);
  const { onClickOutSide, children } = props;

  const handleClickOutSide = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      onClickOutSide && onClickOutSide();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutSide, true);
    return () => {
      document.removeEventListener("click", handleClickOutSide, true);
    };
  }, []);

  if (!children) {
    return null;
  }
  return <div ref={ref}>{children}</div>;
}

export default CheckOutSideClick;
