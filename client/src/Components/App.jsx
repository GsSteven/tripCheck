import "./../css/style.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";

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
        <p className="attributeAuthor">
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
