import React from "react";
import "./SidebarOption.css";
import { useStateValue } from "../../context/StateProvider";

function SidebarOption({ option }) {
  const [{ }, dispatch] = useStateValue();

  const changeitem = ()=>{
    dispatch({
      type: "SET_ITEM",
      item: option
    });
  }

  return (
    <div className="sidebarOption">
      <p onClick={changeitem}>{option}</p>
    </div>
  );
}

export default SidebarOption;
