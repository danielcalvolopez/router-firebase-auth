import {
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { auth } from "../../firebase";
import "../../styles/forms.scss";
import { allRoutes } from "../../utils/routes";

const Login = () => {
  const { currentUser } = useContext(AuthContext);
  console.log(
    "🚀 ~ file: login.jsx ~ line 15 ~ Login ~ currentUser",
    currentUser
  );
  const emailRef = useRef();
  const passwordRef = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleLogIn = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    ).catch((error) => {
      setError(error);
      console.log(error);
    });
    setLoading(false);
    navigate(allRoutes.profile.path);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleLogIn}>
        <h2 className="title">Log In</h2>
        <div className="inputs">
          <div className="email">
            <label>Email</label>
            <input type="email" ref={emailRef} required />
          </div>
          <div className="password">
            <label>Password</label>
            <input type="password" ref={passwordRef} required />
          </div>
        </div>
        <button disabled={loading}>Log In</button>
        <Link
          style={{ textDecoration: "none" }}
          className="blue-button"
          to={allRoutes.resetPassword.path}
        >
          Forgot Password?
        </Link>
      </form>
      <div className="outerbox">
        <p>Need an account?</p>
        <Link
          style={{ textDecoration: "none" }}
          className="blue-button"
          to={allRoutes.signup.path}
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Login;
