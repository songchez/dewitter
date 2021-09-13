import { getAuth, signOut } from "firebase/auth";
import f_app from "../m_base";

const auth = getAuth(f_app);
const Logout = ()=>{
  signOut(auth).then(() => {
    console.log("로그아웃");
  }).catch((error) => {
    console.error(error);
  });
}
function Home ({user_id}) {
    return (
      <div>
        <h1>홈로리홈홈</h1>
        <p>현재 아이디 : {user_id}</p>
        <button onClick={Logout}>로그아웃🎆</button>
      </div>
    );
}
export default Home;