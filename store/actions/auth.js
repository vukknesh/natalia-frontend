import { AsyncStorage } from "react-native";
export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";

let timer;

export const authenticate = (user, token, expiryTime) => {
  return dispatch => {
    dispatch(setLogoutTimer(expiryTime));
    dispatch({ type: AUTHENTICATE, user: user, token: token });
  };
};

export const signup = (email, password) => {
  return async dispatch => {
    const response = await fetch("http://192.168.0.16:8000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    });

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
    console.log(resData);
    const expDate = 600000;
    dispatch(authenticate(resData.user, resData.token, expDate));
    const expirationDate = new Date(new Date().getTime() + expDate);
    saveDataToStorage(resData.token, resData.user, expirationDate);
  };
};

export const login = (email, password) => {
  return async dispatch => {
    const response = await fetch("http://192.168.0.16:8000/api/auth/login", {
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
      console.log(errorResData.non_field_errors);
      const errorId = errorResData.non_field_errors[0];
      let message = "Algo errado aconteceu!";
      if (errorId === "Incorrect Credentials") {
        message = "Usuario e/ou senha invalido(s)!";
      } else if (errorId === "INVALID_PASSWORD") {
        message = "Email e/ou senha invalido(s)!";
      }
      throw new Error(message);
    }

    const resData = await response.json();
    console.log(resData);
    const expDate = 600000;
    dispatch(authenticate(resData.user, resData.token, expDate));
    const expirationDate = new Date(new Date().getTime() + expDate);
    saveDataToStorage(resData.token, resData.user, expirationDate);
  };
};

export const logout = () => {
  clearLogoutTimer();
  AsyncStorage.removeItem("userData");
  return { type: LOGOUT };
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const setLogoutTimer = expirationTime => {
  return dispatch => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};

const saveDataToStorage = (token, user, expirationDate) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token: token,
      user: user,
      expiryDate: expirationDate.toISOString()
    })
  );
};
