import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Navigation from "components/Navigation";

function AppRouters({ user }) {
  return (
    <Router>
      {user && <Navigation user={user} />}
      <Switch>
        {user ? ( // User is signed In
          <div>
            <Route exact path="/">
              <Home user={user} />
            </Route>
            <Route exact path="/profile">
              <Profile user={user} />
            </Route>
          </div>
        ) : (
          // User is signed out
          <Route exact path="/">
            <Auth />
          </Route>
        )}
      </Switch>
    </Router>
  );
}

export default AppRouters;
