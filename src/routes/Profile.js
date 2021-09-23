import { updateProfile, signOut } from "@firebase/auth";
import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from "@firebase/firestore";
import { getDownloadURL, ref, uploadString } from "@firebase/storage";
import { db, auth, storageSv } from "m_base";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidV4 } from "uuid";

const Profile = ({ refreshUser, user }) => {
  const [newDisplayName, setDisplayName] = useState(user.displayName);
  const [userPhoto, setUserPhoto] = useState(user.photoURL);
  //console.log(user.photoURL); 현재상태확인
  useEffect(() => {
    //처음 실행
    getMyDeweets();
  });

  const getMyDeweets = async () => {
    //deweet받아오기
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

  const changeProfile = async () => {
    //프로파일 편집
    const ok = window.confirm("Are you sure Edit Your Profile?");
    if (ok) {
      let userPhotoUrl = "";
      if (userPhoto === user.photoURL) {
        console.log("이미지 안바뀜");
        userPhotoUrl = user.photoURL;
      } else if (userPhoto !== "") {
        const userPhotoRef = ref(storageSv, `${user.uid}/${uuidV4()}`);
        const response = await uploadString(
          userPhotoRef,
          userPhoto,
          "data_url"
        );
        userPhotoUrl = await getDownloadURL(response.ref);
      }
      if (newDisplayName.length > 3) {
        await updateProfile(auth.currentUser, {
          displayName: newDisplayName,
          photoURL: userPhotoUrl,
        })
          .then(() => {
            // Profile updated!
            refreshUser();
            alert("프로필이 변경되었습니다.");
            //window.location.replace("/profile");
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        alert("글자수가 너무 적습니다!(4글자 이상)");
      }
    }
  };

  const onChangeDisName = (event) => {
    //디스플레이네임 바꾸기
    const {
      target: { value },
    } = event;
    setDisplayName(value);
  };

  const fileInput = useRef();
  const onClearAttachment = () => {
    setUserPhoto("");
    fileInput.current.value = "";
  };

  const onChangeProFileImg = (event) => {
    //프로필이미지바꾸기
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
      setUserPhoto(result);
    };
    reader.readAsDataURL(theFile);
  };
  const Logout = () => {
    //로그아웃
    signOut(auth)
      .then(() => {
        console.log("로그아웃");
        refreshUser();
        window.location.replace("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className="container">
      <h3>{user.displayName}의 프로필</h3>
      <h1>Edit your Profile</h1>
      <form onSubmit={changeProfile} className="profileForm">
        <div>
          {" "}
          <input
            onChange={onChangeDisName}
            type="text"
            autoFocus
            placeholder="Edit Your Name"
            value={newDisplayName}
            className="formInput"
          ></input>
        </div>
        {userPhoto && (
          <div>
            <img
              src={userPhoto}
              width="100px"
              height="100px"
              alt={`${user.displayName} 의 프로필이미지`}
            />
            <button onClick={onClearAttachment}>Clear</button>
          </div>
        )}
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={onChangeProFileImg}
            ref={fileInput}
          />
        </div>
        <input
          type="submit"
          value="Update Profile"
          className="formBtn"
          style={{
            marginTop: 10,
          }}
        />
      </form>
      <button onClick={Logout} className="formBtn logOut">로그아웃</button>
    </div>
  );
};
export default Profile;
