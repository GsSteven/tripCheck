import React, { useState } from "react";
import List from "./List";

export default function MyLists(props) {
  const [query, setQuery] = useState("");

  const displayQueryLists = () => {
    const currentQuery = query.toUpperCase();
    const filteredLists = props.lists.filter((list) => {
      const hasQuery = list.listName.toUpperCase().indexOf(currentQuery) !== -1;
      return hasQuery;
    });
    return filteredLists.map((list) => (
      <List
        name={list.listName}
        items={list.list}
        refresh={props.refresh}
        toggleShade={props.toggleShade}
        key={list.listName + list.list.length}
      />
    ));
  };

  const displayLists = () => {
    const currentLists = props.lists.map((list) => {
      return (
        <List
          name={list.listName}
          items={list.list}
          refresh={props.refresh}
          toggleShade={props.toggleShade}
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
      {props.lists[0] && (
        <div className="lists">
          <input
            type="text"
            name="findMyList"
            className="findMyList"
            placeholder="Search Lists"
            onChange={(e) => setQuery(e.target.value)}
          />
          {query ? displayQueryLists() : displayLists()}
        </div>
      )}
      {!props.lists[0] && (
        <h2 className="noLists">Add some lists with "New List"!</h2>
      )}
    </div>
  );
}
