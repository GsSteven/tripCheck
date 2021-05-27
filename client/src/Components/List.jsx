import React, { useState } from "react";
import ExpandedList from "./ExpandedList";
import EditList from "./EditList";

export default function List(props) {
  const [expandList, setExpandList] = useState(false);
  const [expandEdit, setExpandEdit] = useState(false);

  const toggleExpand = () => {
    if (expandList) {
      setExpandList(false);
      props.refresh();
    } else {
      setExpandList(true);
    }
    props.toggleShade();
  };

  const toggleEdit = () => {
    //close expand and open edit
    if (expandEdit) {
      setExpandEdit(false);
      setExpandList(false);
      props.toggleShade();
      props.refresh();
    } else {
      setExpandEdit(true);
      setExpandList(false);
    }
  };

  return (
    <div className="listWrapper">
      <h2 onClick={toggleExpand}>{props.name}</h2>
      {expandList && (
        <div className="expandedContainer">
          <button className="closeButton" onClick={toggleExpand}>
            X
          </button>
          <ExpandedList {...props} close={toggleExpand} openEdit={toggleEdit} />
        </div>
      )}
      {expandEdit && (
        <div className="editContainer">
          <button type="button" className="closeButton" onClick={toggleEdit}>
            X
          </button>
          <EditList {...props} close={toggleEdit} />
        </div>
      )}
    </div>
  );
}
