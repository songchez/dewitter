import { collection, getDocs, orderBy, query, where } from "@firebase/firestore";
import { db } from "m_base";
import { useEffect } from "react";

const Profile = ({ user }) => {
  const getMyDeweets = async () => {
    const deweets = query(
      collection(db, "msg"),
      where("createdId", "==", user.uid),
      orderBy("createdAt"),
    );
    console.log("쿼리",deweets);
    const querySnapshot = await getDocs(deweets);
    console.log("스냅샷",querySnapshot); 
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  };

  useEffect(() => {
    getMyDeweets();
  },);

  return (
    <div>
      <h3>{user.uid}</h3>
      <h1>Edit your Profile</h1>
    </div>
  );
};
export default Profile;
