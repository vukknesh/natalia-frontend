import React, { useEffect } from "react";
import Colors from "../constants/colors";
import HeaderButton from "../components/UI/HeaderButton";
import Tabs from "../components/Tabs";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import PerfilInfo from "../components/PerfilInfo";
import LogoTopo from "../components/LogoTopo";
import { View, StyleSheet, Platform } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import * as eventosActions from "../store/actions/eventos";
import * as authActions from "../store/actions/auth";
const ProfileScreen = props => {
  const myprofile = useSelector(state => state.auth.myprofile);
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <LogoTopo />
      <PerfilInfo user={user} myprofile={myprofile} />
      <Tabs props={props} />
    </View>
  );
};

ProfileScreen.navigationOptions = navData => {
  return {
    headerTitle: "Perfil",
    headerTintColor: "white",
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "menu" : "menu"}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Aulas"
          iconName={Platform.OS === "android" ? "person" : "person"}
          onPress={() => {
            navData.navigation.navigate("Perfil");
          }}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 90,
    paddingTop: 36,
    backgroundColor: Colors.escuro,
    alignItems: "center",
    justifyContent: "center"
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18
  },
  container: {
    flex: 1,
    backgroundColor: Colors.escuro,

    justifyContent: "center"
  },
  headerLeft: {
    color: "white"
  }
});

export default ProfileScreen;
