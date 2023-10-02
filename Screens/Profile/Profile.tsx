import { View, Text, Button, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";

import { useNavigation } from "@react-navigation/native";
import {
  Logout,
  TextStyle,
  Container,
  Logo,
  Texts,
  HeaderLogo,
  BoxShadowView,
  BackgroundImage,
} from "./ProfileStyle";
import { getUserAcc } from "../../services/userAPI";

interface User {
  name: string;
}

const Profile = () => {
  const navigation = useNavigation<any>();
  const [currentDateTime, setCurrentDateTime] = React.useState(new Date());

  const { data, isLoading } = getUserAcc();

  useEffect(() => {}, [data]);
  if (isLoading)
    return (
      <>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" color="#00ff00" />
          <Text style={{ textAlign: "center" }}> Loading...</Text>
        </View>
      </>
    );
  const navigateToScreen = () => {
    navigation.navigate("Login", {
      screen: "Login",
    });
  };

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <BackgroundImage source={require("../../Images/Details.png")}>
      <Container>
        <BoxShadowView>
          <HeaderLogo>
            <Logo source={require("../../Images/Profile.png")}></Logo>
            <Texts>Welcome! {data[0].name} </Texts>
            <Texts>
              {currentDateTime.toLocaleDateString()} | |
              {currentDateTime.toLocaleTimeString()}
            </Texts>
          </HeaderLogo>
        </BoxShadowView>

        <Logout onPress={navigateToScreen}>
          <TextStyle>Logout</TextStyle>
        </Logout>
      </Container>
    </BackgroundImage>
  );
};

export default Profile;
