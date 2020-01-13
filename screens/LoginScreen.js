import React, { useState, useEffect, useReducer, useCallback } from "react";
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Button,
  ActivityIndicator,
  Alert,
  Image
} from "react-native";
import logo from "../assets/logobranca.png";

import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";

import Input from "../components/UI/Input";
import Card from "../components/UI/Card";
import Colors from "../constants/colors";
import * as authActions from "../store/actions/auth";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues
    };
  }
  return state;
};

const LoginScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: ""
    },
    inputValidities: {
      email: false,
      password: false
    },
    formIsValid: false
  });

  useEffect(() => {
    if (error) {
      Alert.alert("Algo errado!", error, [{ text: "Tente novamente!" }]);
    }
  }, [error]);

  const authHandler = async () => {
    let action;
    if (isSignup) {
      action = authActions.signup(
        formState.inputValues.email,
        formState.inputValues.password
      );
    } else {
      action = authActions.login(
        formState.inputValues.email,
        formState.inputValues.password
      );
    }
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(action);
      props.navigation.navigate("Perfil");
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier
      });
    },
    [dispatchFormState]
  );

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={0}
      style={styles.screen}
    >
      <LinearGradient colors={["#f5cab3", "#f5cabe"]} style={styles.gradient}>
        <Image style={styles.imageLogo} source={logo} />
        <Card style={styles.authContainer}>
          <ScrollView>
            <Input
              id="email"
              label="E-Mail"
              keyboardType="email-address"
              required
              autoCapitalize="none"
              errorText="Digite um email valido."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <Input
              id="password"
              label="Senha"
              keyboardType="default"
              secureTextEntry
              required
              minLength={5}
              autoCapitalize="none"
              errorText="Digite uma senha valida."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <View style={styles.buttonContainer}>
              {isLoading ? (
                <ActivityIndicator size="small" color={Colors.primary} />
              ) : (
                <Button
                  title={"Logar"}
                  color={Colors.primary}
                  onPress={authHandler}
                />
              )}
            </View>
            <View style={styles.buttonContainer}>
              {/* <Button
                title={`Trocar para ${isSignup ? "Login" : "Cadastrar"}`}
                color={Colors.accent}
                onPress={() => {
                  setIsSignup(prevState => !prevState);
                }}
              /> */}
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

LoginScreen.navigationOptions = {
  headerTitle: "Studio Natália Secchi",
  titleStyle: {
    /* this only styles the title/text (font, color etc.)  */

    color: "#fff"
  }
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  imageLogo: {
    width: 150,
    height: 150,
    borderRadius: 50
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  authContainer: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 400,
    padding: 20
  },
  buttonContainer: {
    marginTop: 10
  }
});

export default LoginScreen;
