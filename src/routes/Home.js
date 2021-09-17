import { signOut } from "firebase/auth";
import { auth, db, storageSv } from "m_base";
import { getDownloadURL, ref, uploadString } from "@firebase/storage";
import { useEffect, useRef, useState } from "react";
import {
  collection,
  addDoc,
  getFirestore,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { v4 as uuidV4 } from "uuid";
import Deweet from "components/Deweet";

//홈화면
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
  const [attachment, setAttachment] = useState("");

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

  //서밋버튼

  const onSubmitDeweet = async (event) => {
    event.preventDefault();
    //파일업로드
    let attachmentUrl = "";
    if (attachment !== "") {
      const attachmentRef = ref(storageSv, `${user.uid}/${uuidV4()}`);
      const response = await uploadString(
        attachmentRef,
        attachment,
        "data_url"
      );
      attachmentUrl = await getDownloadURL(response.ref);
    }
    const deweets = {
      text: deweet,
      createdAt: Date.now(),
      createdId: user.uid,
      attachmentUrl,
    };
    await addDoc(collection(db, "msg"), deweets).catch((e) => {
      console.error(e);
    });
    //창비우기
    setDeweet("");
    onClearAttachment();
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setDeweet(value);
  };
  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      //image가져온거 넣기
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  //사진 지우기
  const fileInput = useRef();
  const onClearAttachment = () => {
    setAttachment("");
    fileInput.current.value = "";
  };
  //화면
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
        <input
          type="file"
          accept="image/*"
          onChange={onFileChange}
          ref={fileInput}
        />
        <input type="submit" value="Deweet" onClick={onSubmitDeweet} />
        {attachment && (
          <div>
            <img
              src={attachment}
              width="100px"
              height="100px"
              alt="yourDeweet"
            />
            <button onClick={onClearAttachment}>Clear</button>
          </div>
        )}
      </form>
      <div>
        {nDeweets.map((deweets) => (
          <Deweet
            key={deweets.id}
            deweetObj={deweets}
            isOwned={deweets.createdId === user.uid}
            attachmentUrl={deweets.attachmentUrl}
          />
        ))}
      </div>
    </div>
  );
}
export default Home;
