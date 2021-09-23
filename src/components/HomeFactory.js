import { signOut } from "firebase/auth";
import { auth, db, storageSv } from "m_base";
import { getDownloadURL, ref, uploadString } from "@firebase/storage";
import { useRef, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { v4 as uuidV4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const HomeFactory = ({ user, refreshUser }) => {
  const [deweet, setDeweet] = useState("");
  const [attachment, setAttachment] = useState("");
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
  //deweet서밋버튼
  const onSubmitDeweet = async (event) => {
    if (deweet === "") {
      return;
    }
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
  const Logout = () => {
    //로그아웃
    signOut(auth)
      .then(() => {
        console.log("로그아웃");
        refreshUser();
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <>
      <button onClick={Logout}>로그아웃🎆</button>
      <form onSubmit={onSubmitDeweet} className="factoryForm">
        <div className="factoryInput__container"></div>
        <input
          className="factoryInput__input"
          value={deweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind ?"
          maxLength={120}
        ></input>
        <input type="submit" className="factoryInput__arrow" />
        <label for="attach-file" className="factoryInput__label">
          <span>Add photos</span>
          <FontAwesomeIcon icon={faPlus} />
        </label>
        <input
          id="attach-file"
          type="file"
          accept="image/*"
          onChange={onFileChange}
          ref={fileInput}
          style={{
            opacity: 0,
          }}
        />
        <input type="submit" value="Deweet" onClick={onSubmitDeweet}  />
        {attachment && (
          <div className="factoryForm__attachment">
            <img
              src={attachment}
              style={{ backgroundImage: attachment }}
              alt="yourDeweet"
            />
            <div className="factoryForm__clear" onClick={onClearAttachment}>
              <span>Remove</span>
              <FontAwesomeIcon icon={faTimes} />
            </div>
          </div>
        )}
      </form>
    </>
  );
};
export default HomeFactory;
