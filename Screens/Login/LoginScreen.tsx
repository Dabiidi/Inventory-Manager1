import {
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  Text,
} from "react-native";
import React, { useState } from "react";
import {
  EmailInput,
  Title,
  Logo,
  PassInput,
  LoginButton,
  ButtonText,
  LoginContainer,
  Container,
  TitleText,
  IntroHeader,
  PasswordContainer,
  Header,
  TextContainer,
} from "./LoginStyle";
import axios from "axios";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getUserAcc } from "../../services/Items";

interface LoginForms {
  // defining the emal and password datatype
  email: string;
  password: string;
}
interface loginFormsError {
  // Checking errors
  email?: string;
  password?: string;
}

interface LoginformProps {
  navigate: (screen: string, params?: object) => void;
}
interface LandingScreenProps {
  navigation: LoginformProps;
}

const LoginScreen: React.FC<LandingScreenProps> = ({ navigation }) => {
  const { navigate } = navigation;

  const [values, setValues] = useState<LoginForms>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const [errors, setErrors] = useState<loginFormsError>({});

  const validateEmail = (email: string) => {
    // Check email validation
    const emailRegex = /\S+@\S+\.\S+/; //Regix method
    if (!emailRegex.test(email)) {
      //test all the users input and check if it followed the regex method
      return "Invalid email address";
    }
    return undefined;
  };

  const validatePassword = (password: string) => {
    // Check password validation
    if (password.length < 6) {
      //Password must be more than 6 characters
      return "Password must be at least 6 characters";
    }
    return undefined;
  };

  const handleChange = (name: keyof LoginForms, value: string) => {
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: undefined });
  };

  const { data } = getUserAcc();
  const handleSubmit = async () => {
    // Validate email and password inputs
    const emailError = validateEmail(values.email);
    const passwordError = validatePassword(values.password);

    if (emailError || passwordError) {
      // Display validation errors if there are any
      setErrors({ email: emailError, password: passwordError });
    } else {
      try {
        // Retrieve user account based on the entered email

        if (data[0].name) {
          // Check if the entered password matches the user's password
          if (values.password === data[0].pass) {
            // Navigate to the "Home" screen with email as a parameter
            navigation.navigate("Home", {
              screen: "Menu",
              params: { email: values.email },
            });
          } else {
            // Display an error if the password is incorrect
            setErrors({ password: "Incorrect password" });
          }
        } else {
          // Display an error if the user is not found
          setErrors({ email: "User not found" });
        }
      } catch (error) {
        // Handle errors that occur during the login process
        console.error("Error during login:", error);
      }
    }
  };

  return (
    <>
      <Container>
        <Header>
          <ImageBackground
            source={require("../../Images/header.png")}
            resizeMode="cover"
            style={{ flex: 1, position: "relative" }}
            blurRadius={1}
          ></ImageBackground>
        </Header>
        <IntroHeader>
          <Logo source={require("../../Images/Logo1.png")} />
          <TextContainer>
            <Title>Scanventory</Title>
            <TitleText>Empowering Your Inventory Management</TitleText>
          </TextContainer>
        </IntroHeader>

        <LoginContainer>
          <EmailInput
            value={values.email}
            onChangeText={(value) => handleChange("email", value)}
          ></EmailInput>
          {errors.email && (
            <Text style={{ color: "red", textAlign: "center" }}>
              {errors.email}
            </Text>
          )}
          <PasswordContainer>
            <PassInput
              value={values.password}
              secureTextEntry={!showPassword}
              onChangeText={(value) => handleChange("password", value)}
            />
            <MaterialCommunityIcons
              name={showPassword ? "eye-off" : "eye"}
              size={24}
              color="#aaa"
              onPress={toggleShowPassword}
              style={{ marginRight: 10 }}
            />
          </PasswordContainer>
          {errors.password && (
            <Text style={{ color: "red", textAlign: "center" }}>
              {errors.password}
            </Text>
          )}
          <LoginButton onPress={handleSubmit}>
            <ButtonText>Login</ButtonText>
          </LoginButton>
          <Text style={{ textAlign: "center" }}> Forgot Password?</Text>
        </LoginContainer>
      </Container>
    </>
  );
};

export default LoginScreen;
