import React, { useState } from "react";
import axios from "axios";

export default function EditList({ name, items, refresh, close }) {
  const [changes, setChanges] = useState({});
  const [listName, setListName] = useState(name);
  const [newItems, setNewItems] = useState({});
  const [addNewValue, setAddNewValue] = useState("");
  const [errors, setErrors] = useState("");

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const oldValue = e.target.defaultValue;
    const isNew = e.target.getAttribute("newitem") === "true";
    if (!isNew) {
      setChanges((current) => {
        current[name] = { value, oldValue };
        return current;
      });
    } else {
      setNewItems((current) => {
        current[name] = value;
        return current;
      });
    }
  };

  const displayEditInputs = () => {
    const itemInputs = items.map((item, index) => {
      return (
        <div className="itemContainer" key={item.name + index}>
          <input
            type="text"
            id={item.name}
            name={item.name}
            defaultValue={item.name}
            onChange={handleChange}
            newitem="false"
          />
          <button
            type="button"
            className="setDeleteItem"
            title={`Remove ${item.name}`}
          >
            -
          </button>
        </div>
      );
    });
    return itemInputs;
  };

  const displayNewInputs = () => {
    //push object keys into array for mapping
    const newItemsArray = [];
    for (let thing in newItems) {
      newItemsArray.unshift(newItems[thing]);
    }

    const itemInputs = newItemsArray.map((item, index) => {
      return (
        <div className="itemContainer" key={item + index}>
          <input
            type="text"
            id={item}
            name={item}
            defaultValue={item}
            onChange={handleChange}
            newitem="true"
          />
          <button
            type="button"
            className="setDeleteItem"
            title={`Remove ${item}`}
          >
            -
          </button>
        </div>
      );
    });
    return itemInputs;
  };

  const addToList = () => {
    //put all changed values into array
    const changeValues = [];
    const newValues = [];
    for (let thing in changes) {
      changeValues.push(changes[thing].value);
    }
    for (let newThing in newItems) {
      newValues.unshift(newItems[newThing]);
    }

    //check for item in new and existing items
    const itemExists =
      items.findIndex((item) => item.name === addNewValue) !== -1 ||
      newValues.findIndex((item) => item === addNewValue) !== -1 ||
      changeValues.findIndex((item) => item === addNewValue) !== -1;

    if (itemExists) {
      setErrors("Item already exists on current list");
      return;
    }
    //add new item to array and reset input to blank
    setNewItems((current) => {
      current[addNewValue] = addNewValue;
      return current;
    });
    setAddNewValue("");
    setErrors("");
  };

  const uploadChanges = () => {
    let newListName = null;
    //convert objects to arrays for easier backend handling
    const changesArray = [];
    const newItemsArray = [];
    for (let newChanges in changes) {
      changesArray.push(changes[newChanges]);
    }
    for (let item in newItems) {
      newItemsArray.push(newItems[item]);
    }
    if (listName !== name) newListName = listName;

    //if no changes have been made set error and return
    if (!changesArray[0] && !newItemsArray[0] && !newListName) {
      setErrors("No changes detected to list");
      return;
    }
    const payLoad = {
      newListName,
      oldListName: name,
      changes: changesArray,
      newItems: newItemsArray,
    };
    axios
      .post("./api/expandedList", payLoad)
      .then((response) => {
        if (response.status === 200) {
          close();
        }
      })
      .catch((error) => {
        setErrors("Error: Changes not saved");
      });
  };

  return (
    <div className="editListWrapper">
      <input
        type="text"
        name="listName"
        value={listName}
        onChange={(e) => setListName(e.target.value)}
        className="editListName"
      />
      <div className="addToEditContainer">
        <input
          type="text"
          name="addToEdit"
          value={addNewValue}
          className="addToEdit"
          autoComplete="off"
          onKeyPress={(e) => {
            if (e.code === "Enter") addToList();
          }}
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
      {errors && <p className="displayErrors">{errors}</p>}
      <ul className="newAddsList">{displayNewInputs()}</ul>
      <ul className="editList">{displayEditInputs()}</ul>
      <button type="button" className="saveEdit" onClick={uploadChanges}>
        Save
      </button>
    </div>
  );
}
