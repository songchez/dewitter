import { getAuth, signOut } from "firebase/auth";
import f_app from "../m_base";
import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getFirestore,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import Deweet from "../components/Deweet";

const db = getFirestore(f_app);
const auth = getAuth(f_app);

const Logout = () => {
  signOut(auth)
    .then(() => {
      console.log("로그아웃");
    })
    .catch((error) => {
      console.error(error);
    });
};

function Home({ user }) {
  const [deweet, setDeweet] = useState("");
  const [nDeweets, setDeweets] = useState([]);
  const [attachments, setAttachments] = useState("");

  useEffect(() => {
    // 실시간으로 데이터를 데이터베이스에서 가져오기
    // 천천히 이해해보자
    const q = query(
      collection(getFirestore(), "msg"),
      // where('text', '==') // where뿐만아니라 각종 조건 이 영역에 때려부우면 됨
      orderBy("createdAt")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newArray = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setDeweets(newArray);
      console.log("Current deweets in CA: ", newArray);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const onSubmitTweet = async (event) => {
    event.preventDefault();
    await addDoc(collection(db, "msg"), {
      text: deweet,
      createdAt: Date.now(),
      createdId: user.uid,
      //whoCreate:
    }).catch((e) => {
      console.error(e);
    });
    //비우기
    setDeweet("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setDeweet(value);
  };
  const onFileChange = (event) => {
    const {
      target: { file },
    } = event;
    const theFile = file[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      //가져온거 넣기
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachments(result);
    };
    reader.readAsDataURL(theFile);
  };
  return (
    <div>
      <h1>홈로리홈홈</h1>
      <p>현재 아이디 : {user.uid}</p>
      <button onClick={Logout}>로그아웃🎆</button>
      <form>
        <input
          value={deweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind ?"
          maxLength={120}
        ></input>
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="Deweet" onClick={onSubmitTweet} />
      </form>
      <div>
        {nDeweets.map((deweets) => (
          <Deweet
            key={deweets.id}
            deweetObj={deweets}
            isOwned={deweets.createdId === user.uid}
          />
        ))}
      </div>
    </div>
  );
}
export default Home;
