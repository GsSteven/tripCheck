import React, { useState } from "react";
import axios from "axios";

export default function NewList() {
  const [listName, setListName] = useState("");
  const [currentList, setCurrentList] = useState([]);
  const [currentValue, setCurrentValue] = useState("");

  const getCurrentList = () => {
    const listElements = currentList.map((listItem, index) => {
      return (
        <li className="listItem" key={listItem.name + index}>
          {listItem.name}
          <button
            className="removeItem"
            title={`Remove ${listItem.name}`}
            itemname={listItem.name}
            onClick={removeItem}
          >
            X
          </button>
        </li>
      );
    });
    return listElements;
  };

  const addItem = () => {
    let newItem = { name: currentValue, checked: false };
    setCurrentList((current) => [newItem, ...current]);
    setCurrentValue("");
  };

  const removeItem = (e) => {
    const toDelete = e.target.getAttribute("itemname");
    const newCurrent = currentList.filter((item) => {
      return item.name !== toDelete;
    });
    setCurrentList(newCurrent);
  };

  const handleKeyPress = (e) => {
    if (e.charCode === 13) addItem();
  };

  const submitList = (e) => {
    e.preventDefault();
    const payLoad = { listName, list: currentList };
    /*
    axios.post("/api/lists", payLoad).then((response) => {
      console.log(response);
    });
    */
  };

  return (
    <div className="newListWrapper">
      <h1 className="listsHeader">
        <u>New List</u>
      </h1>
      <form className="newListForm" onSubmit={submitList} autoComplete="off">
        <label htmlFor="name">List Name</label>
        <input
          type="text"
          name="name"
          id="name"
          onChange={(e) => setListName(e.target.value)}
        />
        <div className="newItemBox">
          <label htmlFor="newItem">Add Item</label>
          <input
            type="text"
            name="newItem"
            id="newItem"
            value={currentValue}
            onChange={(e) => setCurrentValue(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button
            type="button"
            className="addItem"
            title="addItem"
            onClick={addItem}
          >
            +
          </button>
        </div>
        <button type="submit" className="submitList">
          Submit List
        </button>
        <ul>{getCurrentList()}</ul>
      </form>
    </div>
  );
}
