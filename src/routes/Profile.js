import { updateProfile } from "@firebase/auth";
import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from "@firebase/firestore";
import { db, auth } from "m_base";
import { useEffect, useState } from "react";

const Profile = ({ user }) => {
  const [newDisplayName, setDisplayName] =useState(user.displayName)

  const getMyDeweets = async () => {
    const deweets = query(
      collection(db, "msg"),
      where("createdId", "==", user.uid),
      orderBy("createdAt") //where안에 orderby를 넣어야 작동함 (다수의 쿼리문을 받을수 없음)
    );
    const querySnapshot = await getDocs(deweets);
    //console.log("스냅샷", querySnapshot);
    querySnapshot.forEach((doc) => {
      //console.log(doc.id, " => ", doc.data());
    });
  };
const changeName = async () =>{
  await updateProfile(auth.currentUser ,{
    displayName: newDisplayName,
  }).then(() => {
    // Profile updated!
  }).catch((error) => {
    console.log(error);
  });
  
}

const onChangeDisName = (event) => {
  const {
    target: { value },
  } = event;
  setDisplayName(value);
};

  useEffect(() => {
    getMyDeweets();
  });

  return (
    <div>
      <h3>{user.displayName}의 프로필</h3>
      <h1>Edit your Profile</h1>
      <form onSubmit={changeName}>
        <input onChange={onChangeDisName} type="text" onSubmit={changeName} placeholder= "Edit Your Name" value = {newDisplayName}></input>
        <input type="submit" value="Update Profile" />
      </form>
    </div>
  );
};
export default Profile;
