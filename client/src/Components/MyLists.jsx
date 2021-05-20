import React from "react";
import List from "./List";
import ExpandedList from "./ExpandedList";
import { BrowserRouter as Router, Route } from "react-router-dom";

export default function MyLists(props) {
  const displayLists = () => {
    const currentLists = props.lists.map((list) => {
      return (
        <List
          name={list.listName}
          items={list.list}
          key={list.listName + list.list.length}
        />
      );
    });
    return currentLists;
  };

  const getRoutes = () => {
    const currentRoutes = props.lists.map((list, index) => {
      return (
        <Route
          exact
          path={`./MyLists/${list.listName}`}
          key={list.listName + index}
        >
          <ExpandedList name={list.listName} items={list.list} />
        </Route>
      );
    });
    return currentRoutes;
  };

  return (
    <div className="myListsWrapper">
      <h1 className="listsHeader">
        <u>My Lists</u>
      </h1>
      <div className="lists">{displayLists()}</div>
      <Router>{getRoutes()}</Router>
    </div>
  );
}
