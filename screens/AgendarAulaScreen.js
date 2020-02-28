import React, { useState, useEffect, useCallback } from "react";
import moment from "moment";
import bonus from "../assets/bonus.png";
import slideleft from "../assets/slideleft.png";
import Icon from "react-native-vector-icons/MaterialIcons";
import {
  View,
  Text,
  Platform,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  TouchableHighlight
} from "react-native";
import HeaderButton from "../components/UI/HeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";
import * as eventosActions from "../store/actions/eventos";
import { LinearGradient } from "expo-linear-gradient";
import Swipeout from "react-native-swipeout";
import { SwipeListView } from "react-native-swipe-list-view";
import Colors from "../constants/colors";
const AgendarAulaScreen = props => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState({});
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [id, setId] = useState(null);
  const dispatch = useDispatch();
  const eventos = useSelector(state => state.eventos.eventos);
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
  const onDesmarcar = id => {
    setIsLoading(true);
    try {
      dispatch(eventosActions.updateEvento(id)).then(
        setTimeout(() => {
          dispatch(eventosActions.fetchEventos());
        }, 1000)
      );
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }

    setIsLoading(false);
  };
  const n = Date.now();
  console.log(moment.utc(n).format("DD/MM/YYYY HH:mm:ss"), "date utc");
  console.log(moment(n).format("DD/MM/YYYY HH:mm:ss"), "date now");
  return (
    <View style={styles.screen}>
      {isLoading ? (
        <View
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            opacity: 0.5,
            backgroundColor: "black",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      ) : (
        <LinearGradient
          colors={[Colors.secondary, "white"]}
          style={styles.gradient}
        >
          <View
            style={{
              alignItems: "center",
              backgroundColor: "white",
              height: 100,
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 15,
              margin: 1
            }}
          >
            <View style={{ alignItems: "center" }}>
              <Image
                style={{ width: 30, height: 30, tintColor: "black" }}
                source={bonus}
              />
              <Text>BÔNUS</Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Image
                style={{ width: 30, height: 30, tintColor: Colors.escuro }}
                source={slideleft}
              />
              <Text>DESLIZE</Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Icon name="lock" size={24} color={Colors.primary} />
              <Text>DESMARCADA</Text>
            </View>
          </View>

          <SwipeListView
            onRefresh={() => loadEventos()}
            refreshing={isRefreshing}
            useFlatList={true}
            data={eventos}
            renderItem={(rowData, rowMap) => (
              <View style={styles.standaloneRowBack}>
                <Text style={{ color: Colors.secondary }}>
                  {moment.utc(rowData.item.starting_date).format("DD/MM")} às{" "}
                  {moment.utc(rowData.item.starting_date).format("HH:mm:ss")}
                </Text>
                {rowData.item.bonus && !rowData.item.desmarcado && (
                  <Image
                    style={{ width: 20, height: 20, tintColor: "white" }}
                    source={bonus}
                  />
                )}
                {rowData.item.desmarcado && (
                  <Icon name="lock" size={24} color={Colors.primary} />
                )}
              </View>
            )}
            renderHiddenItem={(rowData, rowMap) => (
              <View style={styles.rowBack}>
                <TouchableOpacity
                  style={[styles.backRightBtn, styles.backRightBtnRight]}
                  onPress={() => {
                    onDesmarcar(rowData.item.id);
                  }}
                >
                  <Text style={styles.backTextWhite}>Desmarcar</Text>
                </TouchableOpacity>
              </View>
            )}
            leftOpenValue={75}
            rightOpenValue={-150}
            onRowOpen={(rowKey, rowMap) => {
              setTimeout(() => {
                rowMap[rowKey].closeRow();
              }, 2000);
            }}
          />
        </LinearGradient>
      )}
    </View>
  );
};

AgendarAulaScreen.navigationOptions = navData => {
  return {
    headerTitle: "Minhas Aulas",
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
          title="Perfil"
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
  screen: {
    flex: 1
  },
  aulasDesmarcadas: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: Colors.escuro
  },
  aulas: { display: "flex", flexDirection: "column" },
  header: {
    width: 200,
    height: 250,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center"
  },
  gradient: {
    flex: 1
  },
  item: {
    width: 400,
    padding: 20,
    backgroundColor: "white",
    color: "black",
    borderColor: "black",
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: "black"
  },
  authContainer: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 400,

    textAlign: "center",
    padding: 20,
    backgroundColor: "white"
  },
  buttonContainer: {
    marginTop: 10
  },
  container: {
    backgroundColor: "white",
    flex: 1
  },
  standalone: {
    marginTop: 30,
    marginBottom: 30
  },
  standaloneRowFront: {
    alignItems: "center",
    backgroundColor: "#CCC",
    justifyContent: "center",
    height: 50
  },
  standaloneRowBack: {
    alignItems: "center",
    backgroundColor: Colors.escuro,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    margin: 1
  },
  backTextWhite: {
    color: "#FFF"
  },
  rowFront: {
    alignItems: "center",
    backgroundColor: "#CCC",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    justifyContent: "center",
    height: 50
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: "#DDD",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 15,
    margin: 1
  },
  backRightBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 75
  },
  backRightBtnLeft: {
    backgroundColor: "blue",
    right: 75
  },
  backRightBtnRight: {
    backgroundColor: "red",
    right: 0,
    margin: 1
  },
  controls: {
    alignItems: "center",
    marginBottom: 30
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 5
  },
  switch: {
    alignItems: "center",
    borderWidth: 1,
    borderColor: "black",
    paddingVertical: 10,
    width: 100
  }
});

export default AgendarAulaScreen;

{
  /* <FlatList
                  data={eventos}
                  renderItem={({ item }) => {
                    return (
              <TouchableOpacity
                key={item.id}
                style={styles.item}
                disabled={item.desmarcado}
                onLongPress={() => {
                  console.log(item.starting_date);
                  if (item.desmarcado) return;
                  onDesmarcar(item.id);
                }}
              >
                <View
                  style={
                    item.desmarcado ? styles.aulasDesmarcadas : styles.aulas
                  }
                >
                  <Text>{item.comentario}</Text>
                  <Text>{moment(item.starting_date).format("DD/MM")}</Text>
                </View>
              </TouchableOpacity>
           );
         }}
        /> */
}
