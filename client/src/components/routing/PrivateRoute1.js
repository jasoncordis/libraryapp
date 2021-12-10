import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import LibraryContext from "../../context/librarianauth/authContext";
import Spinner from "../layout/Spinner";

const PrivateRoute1 = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loading } = authContext;

  const libraryAuthContext = useContext(AuthContext);
  const { isAuthenticated1, loading1 } = libraryAuthContext;

  return (
    <Route
      {...rest}
      render={(props) =>
        loading ? (
          <Spinner />
        ) : isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute1;
