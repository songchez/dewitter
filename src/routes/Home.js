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

//홈화면

function Home({ user ,refreshUser }) {
  const [nDeweets, setDeweets] = useState([]);
  useEffect(() => {
    // 실시간으로 데이터를 데이터베이스에서 가져오기
    const q = query(
      collection(getFirestore(), "msg"),
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
      //console.log("Current deweets in CA: ", newArray);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  //화면
  return (
    <div>
      <HomeFactory user={user} refreshUser ={refreshUser}/>
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
