import React from "react";
import Icon from "react-native-vector-icons/MaterialIcons";

import {
  Content,
  Container,
  Cartao,
  Title,
  CartaoHeader,
  CardContent,
  CardFooter,
  Annotation,
  Description
} from "./styles";
export default function Tabs({ user, myprofile }) {
  if (user) {
    var first_name = user.first_name;
  }
  if (myprofile) {
    var aulas_remarcadas = myprofile.aulas_remarcadas;
    var plano = myprofile.plano;
    var n_plano = plano.split(" ")[0];
    var restante;
    switch (parseInt(n_plano, 10)) {
      case 4:
        restante = 1 - aulas_remarcadas;
        break;
      case 8:
        restante = 2 - aulas_remarcadas;
        break;
      case 4:
        restante = 3 - aulas_remarcadas;
        break;
      default:
        break;
    }
  }
  return (
    <Container>
      <Content>
        <Cartao>
          <CartaoHeader>
            {/* <Icon name="attach-money" size={24} color="#666" />
            <Icon name="attach-money" size={24} color="#666" /> */}
            <Annotation>{first_name}</Annotation>
            <Icon name="person" size={24} color="#666" />
          </CartaoHeader>
          <CardContent>
            <Title>Plano Atual</Title>
            <Description>{plano}</Description>
          </CardContent>
          <CardFooter>
            <Annotation>
              Você ainda tem {restante} remarcações este mês.
            </Annotation>
          </CardFooter>
        </Cartao>
      </Content>
    </Container>
  );
}
