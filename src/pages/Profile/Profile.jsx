import { signOut } from "firebase/auth";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { auth } from "../../firebase";
import "../../styles/forms.scss";
import { allRoutes } from "../../utils/routes";

const Profile = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  console.log(
    "🚀 ~ file: Profile.jsx ~ line 12 ~ Profile ~ currentUser",
    currentUser
  );

  const signout = async (e) => {
    e.preventDefault();
    try {
      await signOut(auth);
    } catch {}
    navigate(allRoutes.login.path);
  };

  return (
    <div className="form-container">
      <form>
        <h2 className="title">Profile</h2>
        <label style={{ marginBottom: "10px", fontWeight: "300" }}>
          Email: {currentUser?.email}
        </label>

        <button>
          <Link
            style={{ textDecoration: "none", color: "inherit" }}
            to={allRoutes.updateProfile.path}
          >
            Update Profile
          </Link>
        </button>
      </form>
      <div className="outerbox">
        <p className="blue-button" onClick={signout}>
          Log Out
        </p>
      </div>
    </div>
  );
};

export default Profile;
