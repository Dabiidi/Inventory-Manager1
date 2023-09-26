import { KeyboardAvoidingView, TextInput } from "react-native";
import { styled } from "styled-components/native";

export const Container = styled.View`
  background-color: #419197;
  flex: 1;
  justify-content: center;
`;
export const Header = styled.View`
  background-color: #419197;
  height: 20%;
  flex: 1;
`;

export const LoginContainer = styled.View`
  padding-top: 40px;
  background-color: #fff;
  justify-content: center;
  padding-bottom: 30px;
`;

export const IntroHeader = styled.View`
  padding-top: 40px;
  border-top-right-radius: 40px;
  border-top-left-radius: 40px;
  background-color: #fff;
  flex-direction: row;
  justify-content: center;
`;
export const Logo = styled.Image`
  width: 100px;
  height: 100px;
`;

export const TextContainer = styled.View`
  margin-left: 13px;
  margin-top: 5px;
`;

export const Title = styled.Text`
  margin-top: 10px;
  font-size: 30px;
  font-weight: bold;
`;

export const TitleText = styled.Text`
  font-size: 12px;
  font-weight: 500;
`;

export const LoginButton = styled.TouchableOpacity`
  background-color: #016a70;
  height: 60px;
  width: 90%;
  margin-left: 20px;
  border-radius: 40px;
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text`
  font-size: 23px;
  font-weight: 400;
  color: #fff;
`;
export const EmailInput = styled.TextInput<{ isError: boolean }>`
  background-color: white;
  height: 50px;
  border-width: 1px;
  width: 90%;
  margin-left: 18px;
  border-radius: 30px;
  margin-bottom: 10px;
  padding: 10px;
  border-color: ${({ isError }) => (isError ? "red" : "gray")};
`;
export const StyledErrorText = styled.Text`
  color: red;
  margin-bottom: 10px;
  text-align: center;
`;

export const PassInput = styled.TextInput<{ isError: boolean }>`
  height: 50px;
  padding: 8px;
  flex: 1;
  border-color: ${({ isError }) => (isError ? "red" : "gray")};
`;

export const PasswordContainer = styled.View<{ isError: boolean }>`
  flex-direction: row;
  align-items: center;
  border-color: ${({ isError }) => (isError ? "red" : "gray")};
  border-width: 1px;
  margin-left: 18px;
  border-radius: 30px;
  width: 90%;
  margin-bottom: 10px;
  background-color: white;
`;
