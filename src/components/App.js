import AppRouters from "./Router";
import { useState } from "react";

function App() {
  const [isLoggedIn] = useState("");
  return <AppRouters isLoggedIn = {isLoggedIn} />;
}

export default App;
