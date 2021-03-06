import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";

const Login = (props) => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

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
    libraryID: 0,
    password: "",
  });

  const { libraryID, password } = user;

  const onChange = (event) =>
    setUser({ ...user, [event.target.name]: event.target.value });

  const onSubmit = (event) => {
    event.preventDefault();
    if (libraryID === 0 || password === "") {
      setAlert("Please fill in all fields.", "danger");
    } else {
      login({
        libraryID,
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
          <label htmlFor="libraryID">Library ID </label> <p></p>
          <input type="number" name="libraryID" onChange={onChange} />
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

export default Login;
