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
  return (
    <Router>
      <div className="appWrapper">
        <Route exact path="/" component={Login} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Switch>
          <Route exact path="/dashboard" component={Dashboard} />
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
      </div>
    </Router>
  );
}

export default App;
