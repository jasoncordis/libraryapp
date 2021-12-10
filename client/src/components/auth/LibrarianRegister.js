import React, { useState, useContext, useEffect } from "react";
import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/librarianauth/authContext";

var randomID = Math.floor(Math.random() * 899999 + 100000)

const LibrarianRegister = (props) => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);


  const { setAlert } = alertContext;
  const { register, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }

    if (error === "User already exists. Please choose another email address.") {
      setAlert(error, "danger");
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    user_name: "",
    librarianID: randomID,
    password: "",
    password2: "",
  });

  const { user_name, librarianID, password, password2 } = user;

  const onSubmit = (event) => {
    var user_name = document.getElementById("user_name").value;
    var password = document.getElementById("password").value;
    event.preventDefault();
    if (user_name === "" || librarianID === "" || password === "") {
      setAlert("Please enter all fields.", "danger");
    } else if (document.getElementById("password").value !== document.getElementById("password2").value) {
      setAlert("Passwords do not match.", "danger");
    } else {
      register({
        user_name,
        librarianID:randomID,
        password,
      });
    }
  };

  return (
    <div className="form-container">
      <h1>
        <span className="text-primary">Register</span> Account
      </h1>
      <h2> Your LibrarianID is: {librarianID} </h2>
      <p id = "">Your 6-Digit Library ID will be used to log in to the library.</p>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id = "user_name" name="name" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id = "password"
            minLength="6"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password2">Confirm Password</label>
          <input
            type="password"
            name="password2"
            id = "password2"
            minLength="6"
          />
        </div>
        <input
          type="submit"
          value="Register"
          className="btn btn-primary btn-block"
        />
      </form>
    </div>
  );
};

export default LibrarianRegister;
