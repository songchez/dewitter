import AppRouters from "./Router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import f_app from "../m_base";

//파이어베이스 초기화
const sign_in = getAuth(f_app);
let f_user;

onAuthStateChanged(sign_in, (user) => {
  f_user = user;
});

function App() {
  return <AppRouters user = {f_user}/>;
}


export default App;
