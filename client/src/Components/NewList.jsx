import React, { useState } from "react";
import axios from "axios";

export default function NewList({ refresh }) {
  const [listName, setListName] = useState("");
  const [currentList, setCurrentList] = useState([]);
  const [currentValue, setCurrentValue] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

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
    if (e.charCode === 13) {
      e.preventDefault();
      addItem();
    }
  };

  const submitList = (e) => {
    e.preventDefault();
    const payLoad = { listName, list: currentList };

    axios
      .post("/api/lists", payLoad)
      .then((response) => {
        if (response.status === 200) {
          setSuccess(true);
          setError(false);
          setTimeout(() => setSuccess(false), 3000);
          setCurrentList([]);
          setListName("");
          refresh();
        }
      })
      .catch((error) => {
        if (error) {
          setError(true);
        }
      });
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
          value={listName}
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
        {success && <p className="successMessage">List has been added!</p>}
        {error && <p className="errorMessage">ERROR: List was not added</p>}
        <ul>{getCurrentList()}</ul>
      </form>
    </div>
  );
}
