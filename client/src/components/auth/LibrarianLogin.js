import React, { useState, useContext, useEffect } from "react";
import libraryAuthContext from "../../context/librarianauth/authContext";
import AlertContext from "../../context/alert/alertContext";

const LibrarianLogin = (props) => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(libraryAuthContext);

  const { setAlert } = alertContext;
  const { login, error, clearErrors, isAuthenticated } = authContext;

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

  const [user, setUser] = useState({
    librarianID: 0,
    password: "",
  });

  const { librarianID, password } = user;

  const onChange = (event) =>
    setUser({ ...user, [event.target.name]: event.target.value });

  const onSubmit = (event) => {
    console.log(librarianID, password)
    event.preventDefault();
    if (librarianID === 0 || password === "") {
      setAlert("Please fill in all fields.", "danger");
    } else {
      login({
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
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="librarianID">Librarian ID</label>
          <input type="number" name="librarianID" onChange={onChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
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
