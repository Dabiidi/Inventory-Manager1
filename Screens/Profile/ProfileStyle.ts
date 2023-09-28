import { styled } from "styled-components/native";
import { Platform } from "react-native";

export const BoxShadowView = styled.View`
  background-color: white; /* Set the background color as needed */
  padding: 16px;

  ${Platform.select({
    ios: `
      shadow-color: black;
      shadow-offset: 0px 2px; /* Adjust the offset as needed */
      shadow-opacity: 0.2; /* Adjust the opacity as needed */
      shadow-radius: 4px; /* Adjust the radius as needed */
    `,
    android: `
      elevation: 10; /* Adjust the elevation level as needed */
    `,
  })}
`;

export const Container = styled.View`
  flex: 1;
  background-color: #b9eddd;
  align-items: center;
  justify-content: center;
`;
export const Logout = styled.TouchableOpacity`
  background-color: #000;
  border-radius: 20px;
  font-weight: bold;
  margin-top: 8px;
`;

export const TextStyle = styled.Text`
  font-size: 18px;
  color: #fff;
  padding: 10px 20px;
  text-align: center;
  font-weight: bold;
`;
export const HeaderLogo = styled.View`
  border-radius: 40px;
`;

export const Logo = styled.Image`
  width: 100px;
  height: 100px;
  padding: 30px;
  border-radius: 50px;
  align-self: center;
`;

export const GreetingsText = styled.View``;
export const Greetings = styled.Text``;

export const Texts = styled.Text`
  font-size: 20px;
  font-weight: 400;
`;
