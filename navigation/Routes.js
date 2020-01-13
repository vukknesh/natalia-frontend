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
import AgendarAulaScreen from "../screens/AgendarAulaScreen";
import Colors from "../constants/colors";
import * as authActions from "../store/actions/auth";
import Icon from "react-native-vector-icons/MaterialIcons";
const defaultNavOptions = {
  headerStyle: {
    // backgroundColor: Platform.OS === "android" ? Colors.primary : "#534a37"
    backgroundColor: Colors.escuro,
    color: "white"
  },

  // headerTintColor: Platform.OS === "android" ? "white" : Colors.primary
  headerTintColor: "white"
};

const ProfileNavigator = createStackNavigator(
  {
    Perfil: ProfileScreen
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

const AgendarAulaNavigator = createStackNavigator(
  {
    AgendarAula: AgendarAulaScreen
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
    Perfil: ProfileNavigator,
    AgendarAula: AgendarAulaNavigator
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
