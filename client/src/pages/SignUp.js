import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Join from "../components/Join"
import { auth, signInWithGoogle, generateUserDocument } from "../utils/firebase";
import "./style.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState(null);

  const createUserWithEmailAndPasswordHandler = async (event, email, password) => {
    event.preventDefault();
    try{
      const {user} = await auth.createUserWithEmailAndPassword(email, password);
      generateUserDocument(user, {displayName});
    }
    catch(error){
      setError('Error Signing up with email and password');
    }
      
    setEmail("");
    setPassword("");
    setDisplayName("");
  };

  const onChangeHandler = event => {
    const { name, value } = event.currentTarget;

    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    } else if (name === "displayName") {
      setDisplayName(value);
    }
  };

  return (
    <Container>
      <Join>

      </Join>
    <div className="mt-8">
      <div className="card-body">
        {error !== null && ( <div className="py-4 bg-red-600 w-full text-black text-center mb-3"> {error} </div> )}
        <form>
          <div className="form-group">
          <label htmlFor="displayName"> User Name </label>
          <input
            type="text"
            className="form-control"
            name="displayName"
            value={displayName}
            placeholder="Display Name"
            id="displayName"
            onChange={event => onChangeHandler(event)}
          />
          <label htmlFor="userEmail" className="block"> Email </label>
          <input
            type="email"
            className="form-control"
            name="userEmail"
            value={email}
            placeholder="Your Email"
            id="userEmail"
            onChange={event => onChangeHandler(event)}
          />
          <label htmlFor="userPassword" className="block"> Password </label>
          <input
            type="password"
            className="form-control"
            name="userPassword"
            value={password}
            placeholder="Your Password"
            id="userPassword"
            onChange={event => onChangeHandler(event)}
          />
          <br/>

          <div class="d-flex justify-content-center">
          <button className="btn" onClick={event => { createUserWithEmailAndPasswordHandler(event, email, password); }} >
            Join
          </button>
          </div>
          </div>  
        </form>
        <p className="text-center my-3" id="text-or">or</p>
        <div class="d-flex justify-content-center">
        <button onClick={() => { try { signInWithGoogle(); } catch (error) { console.error("Error signing in with Google", error); } }}
          className="btn" id="btn-goo" >
          Sign In with Google
        </button>
        </div>
        <p className="text-center my-3" id="text">
          Already have an account?{" "}
          <Link to="/" className="text-blue-500 hover:text-blue-600">
            Sign in here
          </Link>{" "}
        </p>
      </div>
    </div>
    </Container>
  );
};

export default SignUp;