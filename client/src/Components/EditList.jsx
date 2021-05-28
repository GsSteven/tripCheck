import React, { useState } from "react";
import axios from "axios";

export default function EditList({ name, items }) {
  const [changes, setChanges] = useState({});
  const [listName, setListName] = useState(name);
  const [newItems, setNewItems] = useState({});
  const [toDelete, setToDelete] = useState({});
  const [addNewValue, setAddNewValue] = useState("");
  const [isSaved, setSaved] = useState(false);
  const [errors, setErrors] = useState("");
  const [success, setSuccess] = useState("");

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

  const markForDelete = (e) => {
    const elementId = e.target.getAttribute("idtodelete");
    const isNew = e.target.getAttribute("newitem") === "true";
    const currentElement = document.getElementById(elementId);
    if (isNew) {
      setNewItems((current) => {
        delete current[elementId];
        return current;
      });
    } else {
      setToDelete((current) => {
        current[elementId] = elementId;
        return current;
      });
    }
    currentElement.style.backgroundColor = "rgba(163, 59, 55, .7)";
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
            idtodelete={item.name}
            newitem="false"
            type="button"
            className="setDeleteItem"
            title={`Remove ${item.name}`}
            onClick={markForDelete}
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
            idtodelete={item}
            newitem="true"
            type="button"
            className="setDeleteItem"
            title={`Remove ${item}`}
            onClick={markForDelete}
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
      items.findIndex(
        (item) => item.name.toUpperCase() === addNewValue.toUpperCase()
      ) !== -1 ||
      newValues.findIndex(
        (item) => item.toUpperCase() === addNewValue.toUpperCase()
      ) !== -1 ||
      changeValues.findIndex(
        (item) => item.toUpperCase() === addNewValue.toUpperCase()
      ) !== -1;

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
    const deleteArray = [];
    for (let newChanges in changes) {
      changesArray.push(changes[newChanges]);
    }
    for (let item in newItems) {
      newItemsArray.unshift(newItems[item]);
    }
    for (let deleteThing in toDelete) {
      deleteArray.push(toDelete[deleteThing]);
    }
    if (listName !== name) newListName = listName;

    //if no changes have been made set error and return
    if (
      !changesArray[0] &&
      !newItemsArray[0] &&
      !deleteArray[0] &&
      !newListName
    ) {
      setErrors("No changes to list found");
      return;
    }
    const payLoad = {
      newListName,
      oldListName: name,
      changes: changesArray,
      newItems: newItemsArray,
      deletedItems: deleteArray,
    };
    axios
      .put("./api/expandedList", payLoad)
      .then((response) => {
        if (response.status === 200) {
          setSuccess("List has been edited!");
          setSaved(true);
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
      {success && <p className="displaySuccess">{success}</p>}
      <ul className="newAddsList">{displayNewInputs()}</ul>
      <ul className="editList">{displayEditInputs()}</ul>
      <button
        type="button"
        className="saveEdit"
        onClick={uploadChanges}
        disabled={isSaved}
      >
        Save
      </button>
    </div>
  );
}
