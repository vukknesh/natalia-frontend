import React from "react";
import { Container, Top, Logo, Title } from "./styles";
import Icon from "react-native-vector-icons/MaterialIcons";
import logo from "../../assets/logobranca.png";
export default function index() {
  return (
    <Container>
      <Top>
        <Logo source={logo} />
      </Top>
    </Container>
  );
}
