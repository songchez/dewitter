import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Profile from "../routes/Profile";
import Navigation from "Navigation";

function AppRouters({ user }) {
  return (
    <Router>
      {user && <Navigation user = {user}/>}
      <Switch>
        {user ? ( // User is signed In
          <Route exact path="/">
            <Home user={user} />
            <Route exact path="/profile">
              <Profile userObj={user} />
            </Route>
          </Route> // User is signed out
        ) : (
          <Route exact path="/">
            <Auth />
          </Route>
        )}
      </Switch>
    </Router>
  );
}

export default AppRouters;
