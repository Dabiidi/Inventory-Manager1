import { styled } from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: white;
  align-items: center;
  justify-content: center;
`;
export const Logout = styled.TouchableOpacity`
  background-color: #fff;
  border-radius: 20px;
  font-weight: bold;
  margin-top: 8px;
`;

export const TextStyle = styled.Text`
  font-size: 18px;
  color: #000;
  padding: 10px 20px;
  text-align: center;
  font-weight: bold;
`;

export const Logo = styled.Image`
  width: 100px;
  height: 100px;
  padding: 30px;
  border-radius: 50px;
`;
