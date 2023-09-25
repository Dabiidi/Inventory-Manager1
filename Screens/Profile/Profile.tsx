import { View, Text, Button, ActivityIndicator } from "react-native";
import React from "react";

import { useNavigation } from "@react-navigation/native";
import {
  Logout,
  TextStyle,
  Container,
  Logo,
  Texts,
  Greetings,
  GreetingsText,
  HeaderLogo,
} from "./ProfileStyle";
import { getUserAcc } from "../../services/Items";

interface User {
  name: string;
}

const Profile = () => {
  const navigation = useNavigation<any>();
  const [currentDateTime, setCurrentDateTime] = React.useState(new Date());

  const { data, isLoading } = getUserAcc();

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
    console.log("Click");
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
    <Container>
      <HeaderLogo>
        <Logo source={require("../../Images/Profile.png")}></Logo>
        <Texts>Welcome! {data[0].name} </Texts>
      </HeaderLogo>

      <Greetings>
        <GreetingsText>
          <Texts>
            {currentDateTime.toLocaleDateString()} |{" "}
            {currentDateTime.toLocaleTimeString()}
          </Texts>
        </GreetingsText>
      </Greetings>

      <Logout onPress={navigateToScreen}>
        <TextStyle>Logout</TextStyle>
      </Logout>
    </Container>
  );
};

export default Profile;
