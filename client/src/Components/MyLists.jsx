import React from "react";
import List from "./List";

export default function MyLists() {
  return (
    <div className="myListsWrapper">
      <h1 className="listsHeader">
        <u>My Lists</u>
      </h1>
      <div className="lists">
        <List name="Camping" />
        <List name="Vacation" />
        <List name="Beach" />
        <List name="Ski Trip" />
        <List name="Parents" />
        <List name="Holiday Trip" />
      </div>
    </div>
  );
}
