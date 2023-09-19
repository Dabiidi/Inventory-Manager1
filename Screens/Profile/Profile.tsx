import { View, Text, Button } from "react-native";
import React from "react";

import { useNavigation } from "@react-navigation/native";
import { Logout, TextStyle, Container, Logo } from "./ProfileStyle";

const Profile = () => {
  const navigation = useNavigation<any>();

  const navigateToScreen = () => {
    console.log("Click");
    navigation.navigate("Login", {
      screen: "Login",
    });
  };

  return (
    <Container>
      <Logo source={require("../../Images/Profile.png")}></Logo>

      <Button title="Logout" onPress={navigateToScreen}></Button>
    </Container>
  );
};

export default Profile;
