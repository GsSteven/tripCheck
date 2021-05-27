import React, { useState } from "react";
import axios from "axios";

export default function NewList({ refresh }) {
  const [listName, setListName] = useState("");
  const [currentList, setCurrentList] = useState([]);
  const [currentValue, setCurrentValue] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

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
    //check item is not already on list and under 50 chars
    const itemExists =
      currentList.findIndex((item) => item.name === currentValue) !== -1;
    if (itemExists) {
      setError(`${currentValue} is already on this list`);
    } else if (currentValue.length > 50) {
      setError("Items can not be longer than 50 characters");
    } else {
      //add item and reset input value
      let newItem = { name: currentValue, checked: false };
      setCurrentList((current) => [...current, newItem]);
      setCurrentValue("");
      setError("");
    }
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
        //set success message for 3 seconds then reset inputs
        if (response.status === 200) {
          setSuccess(response.data);
          setError("");
          setTimeout(() => setSuccess(""), 3000);
          setCurrentList([]);
          setListName("");
          refresh();
        }
      })
      .catch((error) => {
        if (error) {
          //display error
          setError(error.response.data);
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
        {success && <p className="successMessage">{success}</p>}
        {error && <p className="errorMessage">{error}</p>}
        <ul>{getCurrentList()}</ul>
      </form>
    </div>
  );
}
