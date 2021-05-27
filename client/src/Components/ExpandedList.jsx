import React, { useState, useRef } from "react";
import axios from "axios";

//img imports
import gearIcon from "./../images/gear.png";

export default function ExpandedList({
  name,
  items,
  refresh,
  close,
  openEdit,
}) {
  const [errors, setErrors] = useState("");
  const [showDelete, setShowDelete] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  const buttonsRef = useRef();

  const toggleDeleteList = () => {
    showDelete ? setShowDelete(false) : setShowDelete(true);
  };

  const expandButtons = () => {
    const buttonsDiv = buttonsRef.current;
    if (showButtons) {
      buttonsDiv.style.width = 0;
      buttonsDiv.style.opacity = 0;
      buttonsDiv.style.pointerEvents = "none";
      setShowButtons(false);
    } else {
      buttonsDiv.style.width = "250px";
      buttonsDiv.style.opacity = 1;
      buttonsDiv.style.pointerEvents = "auto";
      setShowButtons(true);
    }
  };

  const displayItems = () => {
    const listElements = items.map((item, index) => {
      return (
        <li className="expandedItem" key={item.name + index}>
          <label className="checkContainer">
            <input
              type="checkbox"
              id={`${item.name}Checkbox`}
              name={item.name}
              className="itemCheckbox"
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
    //set input display
    const payLoad = {
      name,
      itemName: e.target.name,
      checked: e.target.checked,
    };
    //update db data
    axios
      .post("./api/expandedList", payLoad)
      .then((response) => {
        if (response.status === 200) {
          setErrors("");
        }
      })
      .catch((error) => {
        setErrors("Error: database not updated");
        //if db update fails revert display back
        e.target.checked = !e.target.checked;
      });
  };

  const uncheckAll = () => {
    axios
      .post("./api/expandedList/reset", { name })
      .then((response) => {
        //if good response uncheck all boxes
        if (response.status === 200) {
          const checkBoxes = document.getElementsByClassName("itemCheckbox");
          for (let i = 0; i < checkBoxes.length; i++) {
            checkBoxes[i].checked = false;
          }
        }
      })
      .catch((error) => {
        if (error) {
          setErrors("Error: List not reset");
        }
      });
  };

  const deleteList = () => {
    axios
      .delete("./api/lists", { params: { name } })
      .then((response) => {
        if (response.status === 200) {
          //toggle shade to close and refresh from db
          close();
          refresh();
        }
      })
      .catch((error) => {
        setErrors("Error: List not deleted");
      });
  };

  return (
    <div className="expandedListWrapper">
      <div className="expandedList">
        <button
          type="button"
          className="toggleExpandedListButtons"
          onClick={expandButtons}
        >
          <img src={gearIcon} alt="Alter List" title="Change List" />
        </button>
        <div className="expandedListButtons" ref={buttonsRef}>
          <button
            type="button"
            className="resetListButton"
            onClick={uncheckAll}
            title="Uncheck everything"
          >
            Reset
          </button>
          <button
            type="button"
            className="editListButton"
            title="Edit list"
            onClick={() => openEdit()}
          >
            Edit
          </button>
          <button
            type="button"
            className="toggleDeleteButton"
            title="Delete List"
            onClick={toggleDeleteList}
          >
            Delete
          </button>
        </div>
        {showDelete && (
          <div className="deleteList">
            <p className="deleteMessage">
              Are you sure you want to delete <b>{name}</b> and <u>all</u> its
              content?
            </p>
            <div className="confirmDeleteButtons">
              <button type="button" className="yesDelete" onClick={deleteList}>
                Yes
              </button>
              <button
                type="button"
                className="noDelete"
                onClick={toggleDeleteList}
              >
                No
              </button>
            </div>
          </div>
        )}
        {errors && <p className="listErrors">{errors}</p>}
        <h1>
          <u>{name}</u>
        </h1>
        <ul className="itemsList">{displayItems()}</ul>
      </div>
    </div>
  );
}
