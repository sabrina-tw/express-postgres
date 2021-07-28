import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import UsersDummy from "./components/UsersDummy";
import UsersApi from "./components/UsersApi";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/users-dummy" component={UsersDummy}></Route>
          <Route path="/users" component={UsersApi}></Route>
          <Route path="/" render={() => <div>Page not found</div>}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
