import React from "react";

import { Container, TabsContainer, TabItem, TabText } from "./Styles";
import Icon from "react-native-vector-icons/MaterialIcons";
export default function Tabs() {
  return (
    <Container>
      <TabsContainer>
        <TabItem>
          <Icon name="person-add" size={24} color="#fff" />
          <TabText>Indicar Amigos</TabText>
        </TabItem>
        <TabItem>
          <Icon name="navigate_next" size={24} color="#fff" />
          <TabText>Proximas Aulas</TabText>
        </TabItem>
        <TabItem>
          <Icon name="event_note" size={24} color="#fff" />
          <TabText>Agendar Aula</TabText>
        </TabItem>
        <TabItem>
          <Icon name="schedule" size={24} color="#fff" />
          <TabText>Desmarcar Aula</TabText>
        </TabItem>
        <TabItem>
          <Icon name="arrow-upward" size={24} color="#fff" />
          <TabText>Mudar Plano</TabText>
        </TabItem>
      </TabsContainer>
    </Container>
  );
}
