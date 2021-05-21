import React, { useState } from "react";
import ExpandedList from "./ExpandedList";

export default function List(props) {
  const [expandList, setExpandList] = useState(false);
  const toggleExpand = () =>
    expandList ? setExpandList(false) : setExpandList(true);

  return (
    <div className="listWrapper">
      <h2 onClick={toggleExpand}>{props.name}</h2>
      {expandList && <ExpandedList {...props} close={toggleExpand} />}
    </div>
  );
}
