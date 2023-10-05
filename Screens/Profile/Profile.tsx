import { View, Text, Button, ActivityIndicator, Image } from "react-native";
import React, { useEffect } from "react";

import * as ImagePicker from "expo-image-picker";

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
import { getUserAcc, useUploadImage } from "../../services/userAPI";

interface User {
  name: string;
}
interface ImagePickerResponse {
  uri: string;
  // Add other properties based on the response from your image picker library
}

const Profile = () => {
  const [image, setImage] = React.useState<any>(null);
  const [newImage, setNewImage] = React.useState<any>(null);
  const navigation = useNavigation<any>();
  const [currentDateTime, setCurrentDateTime] = React.useState(new Date());

  const { data, isLoading } = getUserAcc();
  const uploadImageMutation = useUploadImage();

  const handleImageUpload = async () => {
    const payload = { id: data[0]._id, profilePicture: image };

    try {
      await uploadImageMutation.mutateAsync(payload);
    } catch (error) {
      // Handle error if necessary
      console.error("Error uploading image:", error);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      handleImageUpload();
    }
  };

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
    navigation.replace("Login", {
      screen: "Login",
    });
  };

  React.useEffect(() => {
    setImage(data[0].profilePicture);

    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, [data]);

  return (
    <BackgroundImage source={require("../../Images/Details.png")}>
      <Container>
        <BoxShadowView>
          <HeaderLogo>
            <Logo source={{ uri: image }}></Logo>
            <Texts>Welcome! {data[0].name} </Texts>
            <Texts>
              {currentDateTime.toLocaleDateString()} |
              {currentDateTime.toLocaleTimeString()}
            </Texts>

            <Button
              title="Pick an image from camera roll"
              onPress={pickImage}
            />
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
