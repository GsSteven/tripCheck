import React from "react";

export default function ExpandedList({ name, items }) {
  const displayItems = () => {
    const listElements = items.map((item, index) => {
      return (
        <li className="expandedItem" key={item.name + index}>
          {item.name}{" "}
          <input
            type="checkbox"
            id={`${item.name}Checkbox`}
            defaultChecked={item.checked}
          />{" "}
        </li>
      );
    });
    return listElements;
  };

  return (
    <div className="expandedListWrapper">
      <div className="expandedList">
        <h1>
          <u>{name}</u>
        </h1>
        <ul className="itemsList">{displayItems()}</ul>
      </div>
    </div>
  );
}
