import styled from "styled-components/native";
export const Container = styled.View`
  height: 100px;
  border: 1px solid black;
`;

export const TabsContainer = styled.ScrollView.attrs({
  horizontal: true,
  contentContainerStyle: { paddingLeft: 10, paddingRight: 20 },
  showsHorizontalIndicator: false
})``;

export const TabItem = styled.View`
  width: 400px;
  height: 100px;
  background: #ccc2b8;
  border-radius: 3px;
  margin-left: 10px;
  padding: 10px;
  justify-content: space-between;
`;

export const TabText = styled.Text`
  font-size: 22px;
  color: #fff;
`;
