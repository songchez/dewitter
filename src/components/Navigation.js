import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Navigation = ({ user }) => {
  return (
    <>
      <nav>
        <ul
          style={{ display: "flex", justifyContent: "center", marginTop: 50 }}
        >
          <li>
            <Link to="/">
              <div className="top__Logo">
                <h4>DEWITTER</h4>
              </div>
            </Link>
          </li>

          <li>
            <Link to="/">
              <div className="navHome">
                <FontAwesomeIcon icon={faHome} color={"#37c0ff"} size="2x" />
              </div>
            </Link>
          </li>
          <li>
            <Link to="/profile">
              <img
                src={user.photoURL}
                alt="userprofilePhoto"
                className="navProfile"
              />
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navigation;
