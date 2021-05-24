import React, { useState, useEffect } from "react";
import { logoutUser } from "./../componentUtil/logUser";
import NavBar from "./NavBar";
import MyLists from "./MyLists";
import NewList from "./NewList";
import axios from "axios";

export default function Dashboard({ toggleBackgroundShade }) {
  const [currentPage, setCurrentPage] = useState("myLists");
  const [lists, setLists] = useState([]);

  const getCurrentPage = () => {
    switch (currentPage) {
      case "myLists":
        return (
          <MyLists
            lists={lists}
            refresh={getLists}
            toggleShade={toggleBackgroundShade}
          />
        );
      case "newList":
        return <NewList refresh={getLists} />;
      default:
        console.error("Error a getCurrentPage switch");
    }
  };

  const getLists = () => {
    axios.get("/api/lists").then((response) => {
      setLists(response.data);
    });
  };

  useEffect(() => {
    //check for token
    const token = localStorage.tripCheckToken;
    if (!token) {
      window.location.href = "./login";
    }
    //get lists if empty
    if (!lists[0]) getLists();
  }, [lists]);

  return (
    <div className="dashboardWrapper">
      <header>
        <h1>Trip Check</h1>
        <button
          className="logoutButton"
          onClick={() => {
            logoutUser();
            window.location.href = "./login";
          }}
        >
          Logout
        </button>
      </header>
      <NavBar setCurrentPage={setCurrentPage} />
      {getCurrentPage()}
    </div>
  );
}
