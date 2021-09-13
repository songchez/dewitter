import AppRouters from "./Router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import f_app from "../m_base";
import { useEffect, useState } from "react";

//파이어베이스 초기화
const sign_in = getAuth(f_app);

function App() {
  const [init, setInit] = useState(false);
  const [f_user, setF_user] = useState(sign_in.currentUser);
  useEffect(() => {
    onAuthStateChanged(sign_in, (user) => {
      setF_user(user);
      setInit(true);
    });
  }, []);
  return <>{init ? <AppRouters user={f_user} /> : "로딩중"}</>;
}

export default App;
