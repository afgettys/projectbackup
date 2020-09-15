import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import Logo from "../img/logo_nav.png";
import UserContext from "../../utils/UserContext";

class Nav extends Component {
  state = {
    open: false,
    width: window.innerWidth,
  };

  updateWidth = () => {
    const newState = { width: window.innerWidth };

    if (this.state.open && newState.width > 991) {
      newState.open = false;
    }

    this.setState(newState);
  };

  toggleNav = () => {
    this.setState({ open: !this.state.open });
  };

  componentDidMount() {
    window.addEventListener("resize", this.updateWidth);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWidth);
  }

  render() {
    // If i am logged out, show only these nav points
    //let user;
    //const user = useContext(UserContext);
    let loggedIn = false;
    try {
      const user = localStorage.getItem("user");
      const profile = JSON.parse(user);
      if (profile.user) {
        loggedIn = true;
      }
    } catch (e) {}

    //console.log('loggedin', loggedIn)

    return (
      <nav className="navbar navbar-expand-lg">
        <Link className="navbar-brand" to="/">
          <img src={Logo} alt="logo" />
        </Link>
        <button
          onClick={this.toggleNav}
          className="navbar-toggler"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className={`${this.state.open ? "" : "collapse "}navbar-collapse`} id="navbarNav" >
          <ul className="navbar-nav"> <li className="nav-item"> <Link onClick={this.toggleNav} className={ window.location.pathname === "/" ? "nav-link active" : "nav-link"} to="/" >
                Home
              </Link>
            </li>
            {loggedIn && (
              <li className="nav-item">
                <Link onClick={this.toggleNav} className={ window.location.pathname === "/mybooks" ? "nav-link active" : "nav-link" } to="/mybooks" >
                  My Books
                </Link>
              </li>
            )}
            {loggedIn && (
              <li className="nav-item">
                <Link onClick={this.toggleNav} className={ window.location.pathname === "/discussion" ? "nav-link active" : "nav-link" } to="/discussion" >
                  Discussion
                </Link>
              </li>
            )}
            {loggedIn ? (
              <li className="nav-item">
                <Link onClick={() => { localStorage.removeItem("user"); }} className={"nav-link active"} to="/signin" >
                  Sign Out
                </Link>
              </li>
            ) : (
              <li className="nav-item">
                <Link onClick={this.toggleNav} className={ window.location.pathname === "/signin" ? "nav-link active" : "nav-link" } to="/signin" >
                  Sign In
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    );
  }
}

export default Nav;
