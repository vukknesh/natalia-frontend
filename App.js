import React, { useState } from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import * as Font from "expo-font";
import NavigationContainer from "./navigation/NavigationContainer";
import { AppLoading } from "expo";
//reducers
import errors from "./store/reducers/errors";
import auth from "./store/reducers/auth";
import eventos from "./store/reducers/eventos";
import profiles from "./store/reducers/profiles";
import messages from "./store/reducers/messages";

const rootReducer = combineReducers({
  auth,
  profiles,
  eventos,
  messages,
  errors
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf")
  });
};
export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
      />
    );
  }
  return (
    <Provider store={store}>
      <NavigationContainer />
    </Provider>
  );
}
