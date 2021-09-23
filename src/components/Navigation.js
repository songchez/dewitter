import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome} from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom";

const Navigation = ({ user }) => {
  return (
    <nav>
      <ul style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
        <li>
          <Link to="/" style={{ marginRight: 30 }}>
            <FontAwesomeIcon icon={faHome} color={"#04AAFF"} size="2x" />
          </Link>
        </li>
        <li>
          <Link to="/profile">
              <img src={user.photoURL} alt="userprofilePhoto" className="navProfile"/>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
