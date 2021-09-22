import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Navigation from "components/Navigation";

function AppRouters({ refreshUser, user }) {
  return (
    <Router>
      {user && <Navigation user={user} />}
      <Switch>
        {user ? ( // User is signed In
          <div
            style={{
              maxWidth: 890,
              width: "100%",
              margin: "0 auto",
              marginTop: 80,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Route exact path="/">
              <Home refreshUser={refreshUser} user={user} />
            </Route>
            <Route exact path="/profile">
              <Profile refreshUser={refreshUser} user={user} />
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
