import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { deleteDoc,  getFirestore, doc } from '@firebase/firestore';
import f_app from "../m_base";
import { useState } from 'react';


const db = getFirestore(f_app);


const Deweet = ({deweetObj, isOwned}) =>{

const [editing, setEditing] = useState(false);
const [newDeweet, setDeweet] = useState(deweetObj.text);

    const deleteDeweet = async ()=>{
        const ok = window.confirm("Are you sure you want to delete?");
        if(ok){
          //경/로를 지정
            await deleteDoc(doc(db, `msg/${deweetObj.id}`));
        }
    }
    
    //에딧버튼
    const toggleEdit = () =>setEditing(prev => !prev);

    return (
      <div>
        {editing ? (
          //에딧버튼눌렀을때
          <>
            <form>
              <input value={newDeweet} required />
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
}

export default Deweet;