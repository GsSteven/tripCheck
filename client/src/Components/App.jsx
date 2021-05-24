import React, { useRef } from "react";
import "./../css/style.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { setAuthToken, logoutUser } from "./../componentUtil/logUser";
import jwt_decode from "jwt-decode";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";

//check for existing token before render
if (localStorage.tripCheckToken) {
  //set auth token
  const token = localStorage.tripCheckToken;
  setAuthToken(token);
  //decode token and get user info
  const decoded = jwt_decode(token);
  //check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //logout user
    logoutUser();
    //redirect for login
    window.location.href = "./login";
  }
}

function App() {
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

  return (
    <Router>
      <div className="appWrapper">
        <Route exact path="/" component={Login} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Switch>
          <Route exact path="/dashboard">
            <Dashboard toggleBackgroundShade={toggleBackgroundShade} />
          </Route>
        </Switch>
        <p id="attributeAuthor">
          Photo by{" "}
          <a href="https://unsplash.com/@glenncarstenspeters?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
            Glenn Carstens-Peters
          </a>{" "}
          on{" "}
          <a href="https://unsplash.com/s/photos/list?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
            Unsplash
          </a>
        </p>
        <div className="backgroundShade" ref={shadeRef}></div>
      </div>
    </Router>
  );
}

export default App;
