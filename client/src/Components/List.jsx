import React from "react";

export default function List(props) {
  return (
    <div
      className="listWrapper"
      onClick={() => window.open(`./${props.name}`, "_blank")}
    >
      <h2>{props.name}</h2>
    </div>
  );
}
