import { getAuth, signOut } from "firebase/auth";
import f_app from "../m_base";
import {useState} from "react";
import { collection, addDoc, getFirestore } from "firebase/firestore";

const db = getFirestore(f_app);
const auth = getAuth(f_app);

const Logout = ()=>{
  signOut(auth).then(() => {
    console.log("로그아웃");
  }).catch((error) => {
    console.error(error);
  });
}

function Home ({user_id}) {
  const [deweet, setDeweet] = useState("");
  const onSubmitTweet = async (event)=>{
    event.preventDefault();
    await addDoc(collection(db, "msg"), {
      deweet: deweet,
      createdAt: Date.now(),
    }).catch((e) => {
      console.error(e);
    });
    //비우기
    setDeweet("")
  }
  const onChange = (event)=>{
    const { target : {value} } = event;
    setDeweet(value);
  }
    return (
      <div>
        <h1>홈로리홈홈</h1>
        <p>현재 아이디 : {user_id}</p>
        <button onClick={Logout}>로그아웃🎆</button>
        <form>
          <input value = {deweet} onChange = {onChange} type="text" placeholder="What's on your mind ?" maxLength={120}></input>
          <input type="submit" value = "Deweet" onClick = {onSubmitTweet}/>
        </form>
      </div>
    );
}
export default Home;