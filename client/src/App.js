import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import UsersDummy from "./components/UsersDummy";
import UsersApi from "./components/UsersApi";
import { UserContext } from "./context/user";
import { useCurrentUserHook } from "./hooks/useCurrentUserHook";

function App() {
  // setCurrentUser can be passed into components that require update to currentUser value
  const { currentUser, setCurrentUser } = useCurrentUserHook();

  return (
    <div className="App">
      <UserContext.Provider value={currentUser}>
        {currentUser && <h2>Hi, {currentUser.username}!</h2>}
        <BrowserRouter>
          <Switch>
            <Route path="/users-dummy" component={UsersDummy}></Route>
            <Route path="/users" component={UsersApi}></Route>
            <Route path="/" render={() => <div>Page not found</div>}></Route>
          </Switch>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
