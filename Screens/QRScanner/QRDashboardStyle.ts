import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: #b9eddd;
`;

export const ButtonAdd = styled.TouchableOpacity`
  background-color: #b9eddd;
  height: 25%;
  width: 70%;
  justify-content: center;
  align-items: center;
  margin-top: 25%;
  border-radius: 50px;
`;

export const ButtonTexts = styled.Text`
  text-align: center;
  font-size: 30px;
`;

export const ButtonScan = styled.TouchableOpacity`
  background-color: #b9eddd;
  height: 25%;
  width: 70%;
  align-items: center;
  border-radius: 50px;
  margin-bottom: 30%;
`;
