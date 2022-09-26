import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import "../../styles/forms.scss";
import { allRoutes } from "../../utils/routes";

const UpdateProfile = () => {
  const newEmailRef = useRef();
  const newPasswordRef = useRef();
  const newPasswordConfirmRef = useRef();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPasswordRef.current.value !== newPasswordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }
    if (newPasswordRef.length < 6) {
      return setError("Password is too short. (Min 6 characters)");
    }

    try {
      setError("");
      setLoading(true);
      await createUserWithEmailAndPassword(
        auth,
        newEmailRef.current.value,
        newPasswordConfirmRef.current.value
      );
    } catch {
      setError("Failed to create an account");
    }
    setLoading(false);
    navigate(allRoutes.profile.path);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2 className="title">Update Profile</h2>
        {error && <div className="error-message">{error}</div>}
        <div className="inputs">
          <div className="email">
            <label>New Email</label>
            <input type="email" ref={newEmailRef} required />
          </div>
          <div className="password">
            <label>New Password</label>
            <input type="password" ref={newPasswordRef} required />
          </div>
          <div className="password">
            <label>New Password Confirmation</label>
            <input type="password" ref={newPasswordConfirmRef} required />
          </div>
        </div>
        <button disabled={loading}>Update</button>
      </form>
      <div className="outerbox">
        <Link
          style={{ textDecoration: "none" }}
          className="blue-button"
          to={allRoutes.profile.path}
        >
          Cancel
        </Link>
      </div>
    </div>
  );
};

export default UpdateProfile;
