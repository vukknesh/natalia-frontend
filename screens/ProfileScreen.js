import React from "react";
import Colors from "../constants/colors";
import HeaderButton from "../components/UI/HeaderButton";
import Tabs from "../components/Tabs";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import PerfilInfo from "../components/PerfilInfo";
import LogoTopo from "../components/LogoTopo";
import { View, StyleSheet, Platform } from "react-native";

const ProfileScreen = props => {
  return (
    <View style={styles.container}>
      <LogoTopo />
      <PerfilInfo />
      <Tabs />
    </View>
  );
};

ProfileScreen.navigationOptions = navData => {
  return {
    headerTitle: "Profile",
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
          title="Evento"
          iconName={Platform.OS === "android" ? "person" : "person"}
          onPress={() => {
            navData.navigation.navigate("Evento");
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
    backgroundColor: "#F7D1C6",
    alignItems: "center",
    justifyContent: "center"
  },
  headerTitle: {
    color: "black",
    fontSize: 18
  },
  container: {
    flex: 1,
    backgroundColor: "#F7D1C6",

    justifyContent: "center"
  }
});

export default ProfileScreen;
