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
export default function Tabs() {
  return (
    <Container>
      <Content>
        <Cartao>
          <CartaoHeader>
            {/* <Icon name="attach-money" size={24} color="#666" />
            <Icon name="attach-money" size={24} color="#666" /> */}
            <Annotation>Natalia Sechi</Annotation>
            <Icon name="build" size={24} color="#666" />
          </CartaoHeader>
          <CardContent>
            <Title>Plano Atual</Title>
            <Description>12 Aulas</Description>
          </CardContent>
          <CardFooter>
            <Annotation>3 Reagendamentos Restante</Annotation>
          </CardFooter>
        </Cartao>
      </Content>
    </Container>
  );
}
