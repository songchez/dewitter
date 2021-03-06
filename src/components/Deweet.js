import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { deleteDoc, updateDoc, doc } from "@firebase/firestore";
import { ref, deleteObject } from "@firebase/storage";
import { db, storageSv } from "m_base";
import { useState } from "react";

const Deweet = ({
  deweetObj,
  isOwned,
  attachmentUrl,
  fileTypes,
  photoUrl,
  userName,
  color,
}) => {
  const [editing, setEditing] = useState(false);
  const [newDeweet, setNewDeweet] = useState(deweetObj.text);

  const deleteDeweet = async () => {
    const ok = window.confirm("Are you sure you want to delete?");
    if (ok) {
      //경/로를 지정
      await deleteDoc(doc(db, `msg/${deweetObj.id}`));
      await deleteObject(ref(storageSv, deweetObj.attachmentUrl));
    }
  };

  //에딧버튼
  const toggleEdit = () => setEditing((prev) => !prev);

  const on_EditSubmit = async (event) => {
    event.preventDefault();
    await updateDoc(doc(db, `msg/${deweetObj.id}`), {
      text: newDeweet,
      createdAt: Date.now(),
    });
    setEditing(false);
  };

  //실시간 변경
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDeweet(value);
  };

  const deweetDate = () => {
    let nDate = new Date(deweetObj.createdAt).toString();
    nDate = nDate.substring(3, 21);
    return nDate;
  };

  const viewFile = () => {
    console.log("타입: ", fileTypes);
    if (fileTypes === "image") {
      return (
        <img className="deweet__attach" src={attachmentUrl} alt="attach" />
      );
    } else if (fileTypes === "audio") {
      //audio이무니다
      return (
        <div className="deweet__audio">
          <audio controls>
            <source src={attachmentUrl} />
          </audio>
        </div>
      );
    }
  };

  return (
    <div className="deweet">
      {editing ? (
        //에딧버튼눌렀을때
        <div className="deweetEdit">
          <form onSubmit={on_EditSubmit} className="container deweetEdit">
            <input
              type="text"
              placeholder="Edit your deweet"
              value={newDeweet}
              required
              autoFocus
              className="formInput"
              onChange={onChange}
            />
          </form>
          <button onClick={on_EditSubmit} className="formBtn">
            Edit
          </button>
          <button onClick={toggleEdit} className="formBtn cancelBtn">
            Cancel
          </button>
        </div>
      ) : (
        //안눌렀을때 화면
        <>
          {photoUrl && (
            <img className="deweet__photoUrl" src={photoUrl} alt="photoUrl" />
          )}
          {attachmentUrl && viewFile()}
          <h3 className="deweet__disName" style={{ color: color }}>
            {userName}
          </h3>
          <h4>{deweetObj.text}</h4>
          <p>{deweetDate()}</p>
          {isOwned && (
            <div className="deweet__actions">
              <span className="btn" onClick={deleteDeweet}>
                <FontAwesomeIcon icon={faTrashAlt} />
              </span>
              <span className="btn" onClick={toggleEdit}>
                <FontAwesomeIcon icon={faEdit} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Deweet;
