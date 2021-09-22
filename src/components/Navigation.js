import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Navigation = ({ user }) => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">
            <FontAwesomeIcon icon={faTwitter} color={"#04AAFF"} size="2x" />
            Deweet
          </Link>
        </li>
        <li>
          <Link to="/profile">  
            <FontAwesomeIcon icon={faUser} color={"#04AAFF"} size="2x" />
            {user.displayName}의 Profile
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
