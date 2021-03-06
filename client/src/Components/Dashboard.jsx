import React, { useState, useEffect, useRef } from "react";
import { logoutUser } from "./../componentUtil/logUser";
import NavBar from "./NavBar";
import MyLists from "./MyLists";
import NewList from "./NewList";
import axios from "axios";

export default function Dashboard() {
  const [currentPage, setCurrentPage] = useState("myLists");
  const [lists, setLists] = useState([]);
  const [errors, setErrors] = useState("");

  const shadeRef = useRef();

  const toggleBackgroundShade = () => {
    const backgroundShade = shadeRef.current;

    if (backgroundShade.style.backgroundColor === "rgba(0, 0, 0, 0.7)") {
      backgroundShade.style.backgroundColor = "transparent";
      backgroundShade.style.pointerEvents = "none";
    } else {
      backgroundShade.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
      backgroundShade.style.pointerEvents = "auto";
    }
  };

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
    axios
      .get("/api/lists")
      .then((response) => {
        //if user does not have lists yet return to prevent rerender
        if (!response.data[0]) return;
        setLists(response.data);
      })
      .catch((error) => {
        setErrors("Error: could not get lists");
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
      {errors && <p className="displayErrors"> {errors}</p>}
      {getCurrentPage()}
      <div className="backgroundShade" ref={shadeRef}></div>
    </div>
  );
}
