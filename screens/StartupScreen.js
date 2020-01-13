import React, { useEffect } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  AsyncStorage
} from "react-native";
import { useDispatch } from "react-redux";

import Colors from "../constants/colors";
import * as authActions from "../store/actions/auth";

const StartupScreen = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem("userData");
      if (!userData) {
        props.navigation.navigate("Auth");
        return;
      }
      const transformedData = JSON.parse(userData);
      console.log("[startup screen userdata]", transformedData);
      const { token, user, myprofile } = transformedData;

      if (!token || !user || !myprofile) {
        props.navigation.navigate("Auth");
        return;
      }
      dispatch(authActions.authenticate(user, myprofile, token));
      props.navigation.navigate("Perfil");
    };

    tryLogin();
  }, []);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default StartupScreen;
