import React from "react";
import {
  createStackNavigator,
  createDrawerNavigator,
  createSwitchNavigator,
  createAppContainer,
  DrawerItems
} from "react-navigation";
import { Platform, SafeAreaView, Button, View } from "react-native";
import { useDispatch } from "react-redux";
import LoginScreen from "../screens/LoginScreen";
import StartupScreen from "../screens/StartupScreen";
import ProfileScreen from "../screens/ProfileScreen";
import EventoScreen from "../screens/EventoScreen";
import Colors from "../constants/colors";
import * as authActions from "../store/actions/auth";
import Icon from "react-native-vector-icons/MaterialIcons";
const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : ""
  },

  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary
};

const EventosNavigator = createStackNavigator(
  {
    Eventos: EventoScreen
  },
  {
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Icon
          name={Platform.OS === "android" ? "schedule" : "schedule"}
          size={23}
          color={drawerConfig.tintColor}
        />
      )
    },
    defaultNavigationOptions: defaultNavOptions
  }
);

const ProfileNavigator = createStackNavigator(
  {
    Profile: ProfileScreen
  },
  {
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Icon name="person" size={23} color={drawerConfig.tintColor} />
      )
    },
    defaultNavigationOptions: defaultNavOptions
  }
);

const Routes = createDrawerNavigator(
  {
    Profile: ProfileNavigator,
    Eventos: EventosNavigator
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary
    },
    contentComponent: props => {
      const dispatch = useDispatch();
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
            <DrawerItems {...props} />
            <Button
              title="Logout"
              color={Colors.primary}
              onPress={() => {
                dispatch(authActions.logout());
              }}
            />
          </SafeAreaView>
        </View>
      );
    }
  }
);

const AuthNavigator = createStackNavigator(
  {
    Auth: LoginScreen
  },
  {
    defaultNavigationOptions: defaultNavOptions
  }
);

const MainNavigator = createSwitchNavigator({
  Startup: StartupScreen,
  Auth: AuthNavigator,
  Routes: Routes
});

export default createAppContainer(MainNavigator);
