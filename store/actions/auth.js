import { AsyncStorage } from "react-native";
import axios from "axios";
export const AUTHENTICATE = "AUTHENTICATE";

export const LOGOUT = "LOGOUT";

export const authenticate = (user, myprofile, token) => {
  return dispatch => {
    dispatch({
      type: AUTHENTICATE,
      user: user,
      myprofile: myprofile,
      token: token
    });
  };
};

export const signup = (email, password) => {
  return async dispatch => {
    const response = await fetch(
      "http://67.207.91.188:3333/api/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = "Algo errado aconteceu!";
      if (errorId === "EMAIL_EXISTS") {
        message = "Email ja cadastrado!";
      }
      throw new Error(message);
    }

    const resData = await response.json();
    dispatch(authenticate(resData.user, resData.token));
    saveDataToStorage(resData.token, resData.user);
  };
};

export const getAuthState = () => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    if (token) {
      config.headers["Authorization"] = `Token ${token}`;
    }
    const response = await axios.get(
      "http://67.207.91.188:3333/api/auth/user",
      config
    );
    if (response.status !== 200) {
      throw error("Algo errado aconteceu!");
    }

    dispatch(
      authenticate(
        response.data?.user,
        response.data?.myprofile,
        response.data?.token
      )
    );

    saveDataToStorage(
      response.data?.token,
      response.data?.user,
      response.data?.myprofile
    );
  };
};

export const login = (email, password) => {
  return async dispatch => {
    const response = await fetch("http://67.207.91.188:3333/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: email,
        password: password
      })
    });

    if (!response.ok) {
      const errorResData = await response.json();
      console.log(errorResData.non_field_errors, "non field errors");
      console.log(errorResData, "errors");
      // const errorId = errorResData.non_field_errors[0];
      const error = errorResData;
      if (error) {
        let message = "Algo errado aconteceu!";
        if (error.non_field_errors !== undefined && error.non_field_errors[0]) {
          if (error.non_field_errors[0] === "Incorrect Credentials") {
            message = "Usuário e/ou senha inválido(s)!";
          } else if (error.non_field_errors[0] === "INVALID_PASSWORD") {
            message = "Email e/ou senha inválido(s)!";
          }
        }

        if (error.username && error.username[0]) {
          message = "Digite um email.";
        }
        if (error.password && error.password[0]) {
          message = "Digite um password.";
        }

        throw new Error(message);
      }
    }

    const resData = await response.json();

    dispatch(authenticate(resData.user, resData.myprofile, resData.token));

    saveDataToStorage(resData.token, resData.user, resData.myprofile);
  };
};

export const logout = () => {
  AsyncStorage.removeItem("userData");
  return { type: LOGOUT };
};

const saveDataToStorage = (token, user, myprofile) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token: token,
      user: user,
      myprofile: myprofile
    })
  );
};
