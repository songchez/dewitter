import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";

function AppRouters({user}){
    return (
      <Router>
        <Switch>
          {user ? ( // User is signed In
            <Route exact path="/">
              <Home user_id = {user.uid} />
            </Route> // User is signed out
          ) : (
            <Route exact path="/">
              <Auth />
            </Route>
          )}
        </Switch>
      </Router>
    );
};

export default AppRouters;