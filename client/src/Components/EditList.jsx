import React, { useState } from "react";

export default function EditList({ name, items, refresh, close }) {
  const [changes, setChanges] = useState([]);
  const [newItems, setNewItems] = useState([]);
  const [addNewValue, setAddNewValue] = useState("");

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const oldValue = e.target.defaultValue;
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

  const displayNewInputs = () => {
    const itemInputs = newItems.map((item) => {
      return (
        <input
          type="text"
          id={item}
          name={item}
          defaultValue={item}
          onChange={handleChange}
        />
      );
    });
    return itemInputs;
  };

  const addToList = () => {
    //add new item to array and reset input to blank
    setNewItems((current) => [addNewValue, ...current]);
    setAddNewValue("");
  };

  return (
    <div className="editListWrapper">
      <h1>
        <u>{name}</u>
      </h1>
      <div className="addToEditContainer">
        <input
          type="text"
          name="addToEdit"
          value={addNewValue}
          className="addToEdit"
          onKeyPress={(e) => (e.code === "Enter" ? addToList() : "")}
          onChange={(e) => setAddNewValue(e.target.value)}
        />
        <button
          type="button"
          className="addToEditButton"
          title="Add to list"
          onClick={addToList}
        >
          +
        </button>
      </div>
      <ul className="newAddsList">{displayNewInputs()}</ul>
      <ul className="editList">{displayEditInputs()}</ul>
      <button type="button" className="saveEdit">
        Save
      </button>
    </div>
  );
}
