import React, { Fragment, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { GiFoxHead } from "react-icons/gi";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import AuthContext1 from "../../context/librarianauth/authContext";
import ContactContext from "../../context/contact/contactContext";

const Navbar = ({ title }) => {
  const authContext = useContext(AuthContext);
  const contactContext = useContext(ContactContext);

  const authContext1 = useContext(AuthContext1);

  const { isAuthenticated, logout, user, loadUser } = authContext;
  const { isAuthenticated1, logout1, user1, loadUser1 } = authContext1;

  useEffect(() => {
    loadUser();
    loadUser1();
    // eslint-disable-next-line
  }, []);

  const onLogout = () => {
    logout();
    logout1();
    window.location.reload();
  };

  const test = () => {
    console.log(authContext);
    console.log(authContext1);
    if(user!=null){
      console.log(isAuthenticated);
      return authLinks
    }
    else if(user1!=null)
      return authLinks1
    else
      return guestLinks
  };


  const authLinks = (
    <Fragment>
      <li>Hello, {user && user.user_name}</li>
      <li>
        <a onClick={onLogout} href="#!">
          <i className="fas fa-sign-out-alt"></i>{" "}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </Fragment>
  );

  const authLinks1 = (
    <Fragment>
      <li>Hello, {user1 && user1.user_name}</li>
      <li>
        <a onClick={onLogout} href="#!">
          <i className="fas fa-sign-out-alt"></i>{" "}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </Fragment>
  );


  const guestLinks = (
    <Fragment>
      <li>
        <Link to="/register">Register</Link> •
      </li>
      <li>
        <Link to="/login"> User Login</Link> •
      </li>
      <li>
        <Link to="/liblogin">Librarian Login</Link> 
      </li>
    </Fragment>
  );

  return (
    <div className="navbar bg-primary">
      <Link to = "/">
      <h1>
        CSC 675 Library App
        &nbsp;
      </h1>
      </Link>
      <ul>{test()}</ul>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
};

Navbar.defaultProps = {
  title: "CSC 675 App",
};

export default Navbar;
