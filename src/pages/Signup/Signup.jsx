import "../../styles/forms.scss";
import { useRef } from "react";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";
import { allRoutes } from "../../utils/routes";

const Signup = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }
    if (passwordRef.length < 6) {
      return setError("Password is too short. (Min 6 characters)");
    }

    try {
      setError("");
      setLoading(true);
      await createUserWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
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
        <h2 className="title">Sign Up</h2>
        {error && <div className="error-message">{error}</div>}
        <div className="inputs">
          <div className="email">
            <label>Email</label>
            <input type="email" ref={emailRef} required />
          </div>
          <div className="password">
            <label>Password</label>
            <input type="password" ref={passwordRef} required />
          </div>
          <div className="password">
            <label>Password Confirmation</label>
            <input type="password" ref={passwordConfirmRef} required />
          </div>
        </div>
        <button disabled={loading}>Sign Up</button>
      </form>
      <div className="outerbox">
        <p>Already have an account?</p>
        <Link
          style={{ textDecoration: "none" }}
          className="blue-button"
          to={allRoutes.login.path}
        >
          Log In
        </Link>
      </div>
    </div>
  );
};

export default Signup;
