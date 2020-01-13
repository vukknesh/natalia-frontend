import React from "react";
import { TouchableOpacity } from "react-native";
import { Container, TabsContainer, TabItem, TabText } from "./Styles";
import Icon from "react-native-vector-icons/MaterialIcons";
export default function Tabs(props) {
  return (
    <Container>
      <TabsContainer>
        <TouchableOpacity
          onPress={() => props.props.navigation.navigate("AgendarAula")}
        >
          <TabItem>
            <Icon name="alarm" size={24} color="#fff" />
            <TabText>Desmarcar Aula</TabText>
          </TabItem>
        </TouchableOpacity>
        {/* <TabItem>
          <Icon name="person-add" size={24} color="#fff" />
          <TabText>Proximas Aulas</TabText>
        </TabItem>
        <TabItem>
          <Icon name="person-add" size={24} color="#fff" />
          <TabText>Agendar Aula</TabText>
        </TabItem>
        <TabItem>
          <Icon name="schedule" size={24} color="#fff" />
          <TabText>Desmarcar Aula</TabText>
        </TabItem>
        <TabItem>
          <Icon name="arrow-upward" size={24} color="#fff" />
          <TabText>Mudar Plano</TabText>
        </TabItem> */}
      </TabsContainer>
    </Container>
  );
}
