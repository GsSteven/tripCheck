import React, { useState, useRef } from "react";
import axios from "axios";

export default function NewList() {
  const [currentList, setCurrentList] = useState([]);

  const itemRef = useRef();

  const getCurrentList = () => {
    const listElements = currentList.map((listItem, index) => {
      console.log(currentList);
      return (
        <li className="listItem" key={listItem + index}>
          {listItem}
        </li>
      );
    });
    return listElements;
  };

  const addItem = () => {
    const input = itemRef.current;
    let currentValue = input.value;
    setCurrentList((...current) => [...current, currentValue]);
  };

  const handleKeyPress = (e) => {
    if (e.charCode === 13) addItem();
  };

  const submitList = (e) => {
    e.preventDefault();
  };

  return (
    <div className="newListWrapper">
      <h1 className="listsHeader">
        <u>New List</u>
      </h1>
      <form className="newListForm" onSubmit={submitList} autoComplete="off">
        <label htmlFor="name">List Name</label>
        <input type="text" name="name" id="name" />
        <div className="newItemBox">
          <label htmlFor="newItem">Add Item</label>
          <input
            type="text"
            name="newItem"
            id="newItem"
            ref={itemRef}
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
