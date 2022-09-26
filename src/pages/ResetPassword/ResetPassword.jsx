import { sendPasswordResetEmail } from "firebase/auth";
import { useRef } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";
import { allRoutes } from "../../utils/routes";

const ResetPassword = () => {
  const [showCheckInbox, setShowCheckInbox] = useState(false);
  const emailRef = useRef();

  const handleResetPassword = (e) => {
    e.preventDefault();

    sendPasswordResetEmail(auth, emailRef.current.value)
      .then(() => {
        setShowCheckInbox(true);
      })
      .catch((error) => {});
  };

  return (
    <div className="form-container">
      <form onSubmit={handleResetPassword}>
        <h2 className="title">Reset Password</h2>
        {showCheckInbox && (
          <div className="green-message">
            Check your inbox for further instructions
          </div>
        )}
        <div className="inputs">
          <div className="email">
            <label>Email</label>
            <input type="email" ref={emailRef} required />
          </div>
        </div>
        <button>Reset Password</button>
        <Link
          style={{ textDecoration: "none" }}
          className="blue-button"
          to={allRoutes.login.path}
        >
          Log In
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

export default ResetPassword;
