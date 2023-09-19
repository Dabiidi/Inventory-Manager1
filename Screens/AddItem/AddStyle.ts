import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: #0ea293;
  justify-content: center;
`;
export const Header = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: white;
  align-items: center;
  border-bottom-left-radius: 100px;
`;
export const Logo = styled.Image`
  width: 100px;

  height: 100px;
`;
export const Body = styled.View`
  width: 100%;
  background-color: #0ea293;
  align-items: center;
  border-top-right-radius: 100px;
`;

export const Texts = styled.Text`
  font-size: 30px;
  font-weight: bold;
`;
export const Input = styled.TextInput`
  border-bottom-width: 2px;
  border-bottom-color: black;
  font-size: 15px;
  color: black;
  width: 80%;
  margin-top: 20px;
`;

export const ButtonContainer = styled.View`
  width: 100%;
  padding: 20px;
  align-items: center;
`;
export const SubmitButton = styled.TouchableOpacity`
  background-color: #2f4f4f;
  width: 80%;
  padding: 15px;
  border-radius: 20px;
  margin-bottom: 10px;
  margin-top: 10px;
`;
export const ButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
  text-align: center;
`;

export const PickerContainer = styled.View`
  width: 90%;
  margin-left: 20px;
  padding: 5px;
  justify-content: center;
  flex: 1;  
`;
