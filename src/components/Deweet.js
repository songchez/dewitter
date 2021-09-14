import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { deleteDoc,  getFirestore, doc } from '@firebase/firestore';
import f_app from "../m_base";

const db = getFirestore(f_app);


const Deweet = ({deweetObj, isOwned}) =>{

    const deleteDeweet = async ()=>{
        const ok = window.confirm("Are you sure you want to delete?");
        if(ok){
            await deleteDoc(doc(db, `msg/${deweetObj.id}`));
        }
    }

    return (
      <div>
        <h3>{deweetObj.text}</h3>
        <p>{new Date(deweetObj.createdAt).toString()}</p>
        {isOwned && (
          <>
            <button class="btn" onClick = {deleteDeweet}>
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
            <button class="btn">
              <FontAwesomeIcon icon={faEdit} />
            </button>
          </>
        )}
      </div>
    );
}

export default Deweet;