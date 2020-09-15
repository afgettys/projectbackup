import React, { useState } from "react";
import { auth } from "../utils/firebase";
import { Link } from "react-router-dom";
import { Container } from "../components/Grid";
import "./style.css"; 

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [emailHasBeenSent, setEmailHasBeenSent] = useState(false);
  const [error, setError] = useState(null);

  const onChangeHandler = event => {
    const { name, value } = event.currentTarget;

    if (name === "userEmail") {
      setEmail(value);
    }
  };

  const sendResetEmail = event => {
    event.preventDefault();
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
          setEmailHasBeenSent(true);
        setTimeout(() => {setEmailHasBeenSent(false)}, 3000);
      })
      .catch(() => {
        setError("Error resetting password");
      });
  };
  return (
    <Container>

    <div className="card-body">
      <h1 className="text-xl text-center font-bold mb-3" id="reset">
        Forgot your Password?
      </h1>
      <div className="form-control">
        <form action="">
          {emailHasBeenSent && (
            <div className="py-3 bg-green-400 w-full text-black text-center mb-3">
              An email has been sent to you!
            </div>
          )}
          {error !== null && (
            <div className="py-3 bg-red-600 w-full text-black text-center mb-3">
              {error}
            </div>
          )}
          <label htmlFor="userEmail" className="w-full block">
            Email
          </label>
          <input
            type="email"
            name="userEmail"
            id="userEmail"
            value={email}
            placeholder="Enter your Email and we will send you a link to reset your password"
            onChange={onChangeHandler}
            className="form-control"
          />
          <br/>
          <div class="d-flex justify-content-center">      
          <button
            className="btn"
            // id="post"
            onClick={event => {
              sendResetEmail(event);
            }}
          >
            Send me a reset link
          </button>
          </div>
        </form>
        <br/>
    <div class="row">
      <div class="col d-flex justify-content-center">
        <Link
          to="/"
          className="text"
          id="text"
        >
          &larr; back to sign in page
        </Link>
        </div>
        </div>
      </div>
    </div>
    </Container>
  );
};

export default PasswordReset;