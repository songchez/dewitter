import { db, storageSv } from "m_base";
import { getDownloadURL, ref, uploadString } from "@firebase/storage";
import { useRef, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { v4 as uuidV4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faTimes,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";

const HomeFactory = ({ user, refreshUser }) => {
  const [deweet, setDeweet] = useState("");
  const [fileTypes, setFileTypes] = useState("");
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
    const maxSize = 8 * 1024 * 1024;//8메가까지 가능

    if(files[0].size > maxSize){
      alert("첨부파일 사이즈는 8MB 이내로 등록 가능합니다.");
    }else{
      const reader = new FileReader();
      reader.onloadend = (finishedEvent) => {
        //image가져온거 넣기
        const {
          currentTarget: { result },
        } = finishedEvent;
        setAttachment(result);
        
        //데이터 형식 구분
        if (result.substring(5,10) === "image"){
          setFileTypes("image");
        } else if(result.substring(5,10) === "audio"){
          setFileTypes("audio");
        }
      };
      reader.readAsDataURL(theFile); //이게로드된다음에 위에꺼가 실행되는것이다.
    }
  };

  //사진 지우기
  const fileInput = useRef();
  const onClearAttachment = () => {
    setAttachment("");
    fileInput.current.value = "";
  };

  //랜덤컬러(deweet용)
  let color;
  const randomColors = () => {
    const randomColor = require("randomcolor");
    color = randomColor();
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
    randomColors();
  
    const deweets = {// -> Deweet생성인스턴스
      text: deweet,
      createdAt: Date.now(),
      createdId: user.uid,
      attachmentUrl,
      fileTypes : fileTypes,
      createdWho: user.displayName,
      profileImg: user.photoURL,
      userColor: color,
    };
    await addDoc(collection(db, "msg"), deweets).catch((e) => {
      console.error(e);
    });
    //창비우기
    setDeweet("");
    onClearAttachment();
  };



  return (
    <>
      <form onSubmit={onSubmitDeweet} className="factoryForm">
        <p>{`${user.displayName}님 환영합니다!`}</p>
        <div className="factoryInput__container">
          <input
            className="factoryInput__input"
            value={deweet}
            onChange={onChange}
            type="text"
            placeholder="What's on your mind ?"
            maxLength={120}
          ></input>
          <label htmlFor="submitBtn" className="factoryInput__arrow">
            <FontAwesomeIcon icon={faPaperPlane} />
          </label>
          <input id="submitBtn" type="submit" value="" />
        </div>
        <label htmlFor="attach-file" className="factoryInput__label">
          <span>파일첨부</span>
          <FontAwesomeIcon icon={faPlus} />
        </label>
        <input
          id="attach-file"
          type="file"
          accept="image/*, audio/*"
          onChange={onFileChange}
          ref={fileInput}
          style={{
            opacity: 0,
          }}
        />
        {attachment && (
          <div className="factoryForm__attachment">
            <div>
              <img
                src={attachment}
                alt={fileInput.current.value.substring(12)}
              />
            </div>
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
