import React from "react";
import List from "./List";

export default function MyLists(props) {
  const displayLists = () => {
    const currentLists = props.lists.map((list) => {
      return (
        <List
          name={list.listName}
          items={list.list}
          refresh={props.refresh}
          key={list.listName + list.list.length}
        />
      );
    });
    return currentLists;
  };

  return (
    <div className="myListsWrapper">
      <h1 className="listsHeader">
        <u>My Lists</u>
      </h1>
      <div className="lists">{displayLists()}</div>
    </div>
  );
}
