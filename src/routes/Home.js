import { useEffect, useState } from "react";
import {
  collection,
  getFirestore,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import Deweet from "components/Deweet";
import HomeFactory from "components/HomeFactory";

function Home({ user, refreshUser }) { //홈화면
  const [nDeweets, setDeweets] = useState([]);
  useEffect(() => {
    // 실시간으로 데이터를 데이터베이스에서 가져오기
    const q = query(collection(getFirestore(), "msg"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newArray = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setDeweets(newArray);
      //console.log("Current deweets in CA: ", newArray);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  //화면
  return (
    <div className="container" >
      <HomeFactory user={user} refreshUser={refreshUser} />
      <div style={{ marginTop: 30 }}>
        {nDeweets.map((deweets) => (
          <Deweet
            color={deweets.userColor}
            key={deweets.id}
            deweetObj={deweets}
            isOwned={deweets.createdId === user.uid}
            userName={deweets.createdWho}
            photoUrl={deweets.profileImg}
            attachmentUrl={deweets.attachmentUrl}
          />
        ))}
      </div>
    </div>
  );
}
export default Home;
