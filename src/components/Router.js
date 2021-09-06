import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";

function AppRouters({isLoggedIn}){
    return (
      <Router>
        <Switch>
          {isLoggedIn ? (
            <>
              <Route exact path="/">
                <Home />
              </Route>
            </>
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