import React, { useState } from "react";
import ExpandedList from "./ExpandedList";

export default function List(props) {
  const [expandList, setExpandList] = useState(false);
  const toggleExpand = () => {
    expandList ? setExpandList(false) : setExpandList(true);
  };

  return (
    <div className="listWrapper" onClick={() => toggleExpand()}>
      <h2>{props.name}</h2>
      {expandList && <ExpandedList list={props.list} close={toggleExpand} />}
    </div>
  );
}
