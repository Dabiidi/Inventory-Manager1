import { KeyboardAvoidingView, TextInput } from "react-native";
import { styled } from "styled-components/native";

export const Header = styled.View`
  background-color: #b9eddd;
  border-bottom-right-radius: 100px;
`;
export const LoginContainer = styled.View`
  flex: 1;
  background-color: #b9eddd;
  justify-content: center;
`;

export const Logo = styled.Image`
  margin-top: 100px;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;

  margin-left: auto;
  margin-right: auto;
`;
export const Title = styled.Text`
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  justify-content: center;
`;

export const InputContainer = styled.View`
  border-top-left-radius: 100px;
  background-color: #87cbb9;
  height: 70%;
  margin-top: 5%;
`;
export const EmailInput = styled(TextInput).attrs({
  placeholder: "Email",
})`
  background-color: white;
  height: 50px;
  width: 90%;
  margin-top: 50px;
  margin-left: 18px;
  border-radius: 30px;
  margin-bottom: 10px;
  padding: 10px;
`;

export const PassInput = styled(TextInput).attrs({
  placeholder: "Password",
})`
  height: 50px;

  padding: 8px;
  flex: 1;
`;

export const PasswordContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: 1px solid #ccc;

  border-radius: 0px;
  margin-left: 18px;
  border-radius: 30px;
  width: 90%;
  margin-bottom: 10px;
  background-color: white;
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

export const Footer = styled.View`
  background-color: #b9eddd;
  height: 20%;
`;

export const InnerContainer = styled.View`


`