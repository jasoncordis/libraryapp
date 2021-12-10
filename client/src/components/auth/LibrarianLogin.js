import React, { useState, useContext, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import libraryAuthContext from "../../context/librarianauth/authContext";
import AlertContext from "../../context/alert/alertContext";

const LibrarianLogin = (props) => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(libraryAuthContext);

  const { setAlert } = alertContext;
  const { login1, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }

    if (error === "Invalid credentials.") {
      setAlert(error, "danger");
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser1] = useState({
    librarianID: 0,
    password: "",
  });

  const { librarianID, password } = user;

  const onChange = (event) =>
    setUser1({ ...user, [event.target.name]: event.target.value });

  const onSubmit = (event) => {
    console.log(librarianID, password)
    event.preventDefault();
    if (librarianID === 0 || password === "") {
      setAlert("Please fill in all fields.", "danger");
    } else {
      login1({
        librarianID,
        password,
      });
    }
  };


  return (
    <div className="form-container">
      <h1>
        <span className="text-primary">Login</span> Account
      </h1>
      <p><h4>For test purposes:</h4> </p><p><h4> librarianID = 123456 password = password</h4></p>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="librarianID">Librarian ID </label> <p></p>
          <input type="number" name="librarianID" onChange={onChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input class = "passwordInput"
            type="password"
            name="password"
            value={password}
            onChange={onChange}
          />
        </div>
        <input
          type="submit"
          value="Login"
          className="btn btn-primary btn-block"
        />
      </form>
    </div>
  );
};

export default LibrarianLogin;
