import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { deleteDoc, updateDoc, getFirestore, doc } from "@firebase/firestore";
import f_app from "../m_base";
import { useState } from "react";

const db = getFirestore(f_app);

const Deweet = ({ deweetObj, isOwned }) => {
  const [editing, setEditing] = useState(false);
  const [newDeweet, setNewDeweet] = useState(deweetObj.text);

  const deleteDeweet = async () => {
    const ok = window.confirm("Are you sure you want to delete?");
    if (ok) {
      //경/로를 지정
      await deleteDoc(doc(db, `msg/${deweetObj.id}`));
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
    <div>
      {editing ? (
        //에딧버튼눌렀을때
        <>
          <form onSubmit={on_EditSubmit}>
            <input
              type="text"
              placeholder="Edit your deweet"
              value={newDeweet}
              required
              onChange={onChange}
            />
          </form>
          <button onClick={toggleEdit}>Cancel</button>
        </>
      ) : (
        //안눌렀을때
        <>
          <h3>{deweetObj.text}</h3>
          <p>{new Date(deweetObj.createdAt).toString()}</p>
          {isOwned && (
            <>
              <button class="btn" onClick={deleteDeweet}>
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
              <button class="btn" onClick={toggleEdit}>
                <FontAwesomeIcon icon={faEdit} />
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Deweet;
