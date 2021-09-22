import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { deleteDoc, updateDoc, doc } from "@firebase/firestore";
import { ref, deleteObject } from "@firebase/storage";
import { db, storageSv } from "m_base";
import { useState } from "react";



const Deweet = ({ deweetObj, isOwned, attachmentUrl }) => {
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

  return (
    <div className="deweet">
      {editing ? (
        //에딧버튼눌렀을때
        <>
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
          <button onClick={on_EditSubmit}>Edit!</button>
          <button onClick={toggleEdit} className="formBtn cancelBtn">Cancel</button>
        </>
      ) : (
        //안눌렀을때
        <>
        {attachmentUrl && <img src={attachmentUrl} alt="attach"/>}
          <h3>{deweetObj.text}</h3>
          <p>{new Date(deweetObj.createdAt).toString()}</p>
          {isOwned && (
            <div class="deweet__actions">
              <span class="btn" onClick={deleteDeweet}>
                <FontAwesomeIcon icon={faTrashAlt} />
              </span>
              <span class="btn" onClick={toggleEdit}>
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
