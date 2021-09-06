import AppRouters from "./Router";
import { useState } from "react";
import {authService} from "../m_base";

function App() {
  const [isLoggedIn] = useState(authService.currentUser);
  return <AppRouters isLoggedIn = {isLoggedIn} />;
}

export default App;
