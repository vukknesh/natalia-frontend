import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../constants/colors";
import HeaderButton from "../components/UI/HeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Platform,
  Dimensions
} from "react-native";
import EventCalendar from "react-native-events-calendar";
let { width } = Dimensions.get("window");
import * as eventosActions from "../store/actions/eventos";
const EventoScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const eventos = useSelector(state => state.eventos.eventos);
  const userEventos = useSelector(state => state.eventos.userEventos);
  const dispatch = useDispatch();
  console.log("[EventosScreen eventos state = ]", eventos);
  console.log("[EventosScreen userEventos state = ]", userEventos);
  const loadEventos = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(eventosActions.fetchEventos());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener("willFocus", loadEventos);

    return () => {
      willFocusSub.remove();
    };
  }, [loadEventos]);

  useEffect(() => {
    setIsLoading(true);
    loadEventos().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadEventos]);
  const eventClicked = event => {
    //On Click oC a event showing alert from here
    alert(JSON.stringify(event));
  };
  return (
    <View style={{ flex: 1, marginTop: 20 }}>
      <EventCalendar
        eventTapped={eventClicked.bind(this)}
        //Function on event press
        events={eventos}
        //passing the Array of event
        width={width}
        //Container width
        size={60}
        //number of date will render before and after initDate
        //(default is 30 will render 30 day before initDate and 29 day after initDate)
        // initDate={"2019-01-01"}
        //show initial date (default is today)
        scrollToFirst
        //scroll to first event of the day (default true)
      />
    </View>
  );
};

EventoScreen.navigationOptions = navData => {
  return {
    headerTitle: "Evento",
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
          title="Profile"
          iconName={Platform.OS === "android" ? "person" : "person"}
          onPress={() => {
            navData.navigation.navigate("Profile");
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
    backgroundColor: "#f7287b",
    alignItems: "center",
    justifyContent: "center"
  },
  headerTitle: {
    color: "black",
    fontSize: 18
  },
  gridItem: {
    marginBottom: 3,
    padding: 5,
    backgroundColor: "#fff"
  }
});

export default EventoScreen;
