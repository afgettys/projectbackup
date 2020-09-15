import React, {useState} from "react";
import { Link } from "react-router-dom";
import { signInWithGoogle, auth } from "../utils/firebase";
import { Container } from "../components/Grid";
import Header from "../components/Header"
import Log from "../components/Log"
import "./style.css";

const SignIn = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const signInWithEmailAndPasswordHandler = (event, email, password) => {
    event.preventDefault();
    auth.signInWithEmailAndPassword(email, password).then((userCredential) => {
      // Set the state
      localStorage.setItem('user', JSON.stringify(userCredential, null, 2))
      window.location.href = window.location.origin + "/"
    }).catch((error) => {
      // User login unsuccessful
      setError("Error signing in with password and email!");
      console.error("Error signing in with password and email", error);
    });
  };

  const onChangeHandler = (event) => {
    const {name, value} = event.currentTarget;

    if(name === 'userEmail') {
      setEmail(value);
    }
    else if(name === 'userPassword'){
      setPassword(value);
    }
  };


  return (
    <Container>
      <Header>

      </Header>
    <div className="mt-8">
      <div className="card-body">
        {error !== null && <div className = "py-4 bg-red-600 w-full text-white text-center mb-3">{error}</div>}
        <form>
        <div className="form-group">
          <label htmlFor="userEmail"> Email </label>
          <input
            type="email"
            className="form-control"
            name="userEmail"
            value = {email}
            placeholder="Your Email"
            id="userEmail"
            onChange = {(event) => onChangeHandler(event)}
          />
          <br/>
          <label htmlFor="userPassword" className="block"> Password </label>
          <input
            type="password"
            className="form-control"
            name="userPassword"
            value = {password}
            placeholder="Your Password"
            id="userPassword"
            onChange = {(event) => onChangeHandler(event)}
          />
          <br/>
          <div class="d-flex justify-content-center">
          <button className="btn justify-content-center" onClick = {(event) => {signInWithEmailAndPasswordHandler(event, email, password)}}>
            Sign in
          </button>
          </div>
        </div>
        </form>

        <Log>

        </Log> 
        < div class="row justify-content-center">
          <div class="col-md-auto">
            <div class="">
              <button className="btn" onClick={() => { signInWithGoogle(); }} > Sign in with Google </button>
            </div>
          </div>
            <div class="col-md-auto">
              <Link to="signUp" className="btn" id="link"> Create an Account </Link>{" "}
            </div>
        </div>
        <br/>          
        < div class="row">
          <div class="col d-flex justify-content-center">
          <Link to="passwordReset" className="text" id="text"> Forgot Password? </Link>{" "}
          </div>
          </div>  
      </div>
    </div>
    </Container>
  );
};

export default SignIn;
