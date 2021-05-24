import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ExpandedList({ name, items, refresh }) {
  const [errors, setErrors] = useState("");

  const displayItems = () => {
    const listElements = items.map((item, index) => {
      return (
        <li className="expandedItem" key={item.name + index}>
          <label className="checkContainer">
            <input
              type="checkbox"
              id={`${item.name}Checkbox`}
              name={item.name}
              defaultChecked={item.checked}
              onClick={markChecked}
            />
            <span className="checkMark"></span>
          </label>
          <p className="expandedItemName">{item.name}</p>
        </li>
      );
    });
    return listElements;
  };

  const markChecked = (e) => {
    const payLoad = {
      name,
      itemName: e.target.name,
      checked: e.target.checked,
    };
    axios
      .post("./api/expandedList", payLoad)
      .then((response) => {
        if (response.status === 200) refresh();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const uncheckAll = () => {
    axios
      .post("./api/expandedList/reset", { name })
      .then((response) => {
        if (response.status === 200) {
          refresh();
        }
      })
      .catch((error) => {
        if (error) {
          setErrors("Error: List not reset");
        }
      });
  };

  return (
    <div className="expandedListWrapper">
      <div className="expandedList">
        <button type="button" className="resetListButton" onClick={uncheckAll}>
          Reset
        </button>
        {errors && <p className="listErrors">{errors}</p>}
        <h1>
          <u>{name}</u>
        </h1>
        <ul className="itemsList">{displayItems()}</ul>
      </div>
    </div>
  );
}
