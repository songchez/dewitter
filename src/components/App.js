import AppRouters from "components/Router";
import { onAuthStateChanged } from "firebase/auth";
import {auth} from "m_base";
import { useEffect, useState } from "react";

//파이어베이스 초기화

function App() {
  const [init, setInit] = useState(false);
  const [f_user, setF_user] = useState(auth.currentUser);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setF_user(user);
      setInit(true);
    });
  }, []);
  return <>{init ? <AppRouters user={f_user} /> : "로딩중"}</>;
}

export default App;
