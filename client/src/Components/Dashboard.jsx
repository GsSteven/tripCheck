import React, { useState } from "react";
import NavBar from "./NavBar";
import MyLists from "./MyLists";
import NewList from "./NewList";

export default function Dashboard() {
  const [currentPage, setCurrentPage] = useState("myLists");

  const getCurrentPage = () => {
    switch (currentPage) {
      case "myLists":
        return <MyLists />;
      case "newList":
        return <NewList />;
      default:
        console.error("Error a getCurrentPage switch");
    }
  };

  return (
    <div className="dashboardWrapper">
      <header>
        <h1>Trip Check</h1>
      </header>
      <NavBar setCurrentPage={setCurrentPage} />
      {getCurrentPage()}
    </div>
  );
}
