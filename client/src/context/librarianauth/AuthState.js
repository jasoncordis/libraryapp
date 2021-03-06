import React, { useReducer } from "react";
import axios from "axios";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import setAuthToken from "../../utils/setAuthToken";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from "../types";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Function to load user. (Will check to see which user is logged in by hitting the auth endpoint to get the user data.)
  const loadUser1 = async () => {
    // Loads token into global headers.
    setAuthToken(localStorage.token);
    console.log("loaduser");
    try {
      const res = await axios.get("/api/librarianauth");
      console.log(res);
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  // Function to register user. (Will sign the user up for the application and get a token for the user.)
  const register = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/librarians", formData, config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });

      loadUser1();
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  // Function to log in user. (Will log the user in for the application and get a token for the user.)
  const login1 = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/librarianauth", formData, config);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });

      loadUser1();
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg,
      });
    }
    window.location = '/librarian';
  };

  // Function to log out user. (Will destroy the user's token and clear any logged in user.)
  const logout1 = () => {
    dispatch({ type: LOGOUT });
  };

  // Function to clear errors. (Will clear out any errors in the state.)
  const clearErrors = () => {
    dispatch({ type: CLEAR_ERRORS });
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated1: state.isAuthenticated,
        loading: state.loading,
        user1: state.user,
        error: state.error,
        register,
        loadUser1,
        login1,
        logout1,
        clearErrors,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
