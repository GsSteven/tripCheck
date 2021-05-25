import React, { useState } from "react";

export default function EditList({ name, items, refresh, close }) {
  const [changes, setChanges] = useState([]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const oldValue = e.target.defaultValue;
    console.log(name, value, oldValue);
  };

  const displayEditInputs = () => {
    const itemInputs = items.map((item) => {
      return (
        <input
          type="text"
          id={item.name}
          name={item.name}
          defaultValue={item.name}
          onChange={handleChange}
        />
      );
    });
    return itemInputs;
  };

  return (
    <div className="editListWrapper">
      <h1>
        <u>{name}</u>
      </h1>
      <ul className="itemsList">{displayEditInputs()}</ul>
    </div>
  );
}
