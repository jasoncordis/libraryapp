import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../../context/librarianauth/authContext";
import Spinner from "../../components/layout/Spinner";

const PrivateRoute2 = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated1, loading } = authContext;

  return (
    <Route
      {...rest}
      render={(props) =>
        loading ? (
          <Spinner />
        ) : isAuthenticated1 ? (
          <Component {...props} />
        ) : (
          <Redirect to="/liblogin" />
        )
      }
    />
  );
};

export default PrivateRoute2;

