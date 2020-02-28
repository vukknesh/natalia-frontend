import React, { useEffect } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Text } from "react-native";
import * as pActions from "../../store/actions/profiles";
import { useDispatch, useSelector } from "react-redux";

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
  const currentProfile = useSelector(state => state.profiles.profile);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(pActions.getCurrentProfile(myprofile?.id));
  }, []);
  if (user) {
    var first_name = user.first_name;
  }
  if (currentProfile) {
    var aulas_remarcadas = currentProfile.aulas_remarcadas;
    var plano = currentProfile.plano;
    var n_plano = plano.split(" ")[0];
    var restante = 0;
    switch (parseInt(n_plano, 10)) {
      case 4:
        restante = 1 - aulas_remarcadas;
        break;
      case 8:
        restante = 2 - aulas_remarcadas;
        break;
      case 12:
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
            <Text>{aulas_remarcadas}</Text>
            <Title>Plano Atual</Title>
            <Description>{plano}</Description>
          </CardContent>
          <CardFooter>
            {restante > 0 ? (
              <Annotation>
                Você ainda tem {restante} remarcações este mês.
              </Annotation>
            ) : (
              <Annotation>Você não tem mais remarcações este mês.</Annotation>
            )}
          </CardFooter>
        </Cartao>
      </Content>
    </Container>
  );
}
