import { KeyboardAvoidingView, ScrollView, Text } from "react-native";
import React, { useState } from "react";
import {
  EmailInput,
  Title,
  Logo,
  PassInput,
  LoginButton,
  ButtonText,
  LoginContainer,
  Footer,
  PasswordContainer,
  InnerContainer,
} from "./LoginStyle";
import axios from "axios";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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

  const handleSubmit = async () => {
    const emailError = validateEmail(values.email);
    const passwordError = validatePassword(values.password);

    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
    } else {
      try {
        console.log("Test button", { email: values.email });
        navigation.navigate("Home", {
          screen: "Menu",
          params: { email: values.email },
        });
        console.log(values.email, values.password);
        const response = await axios.post(
          "http://192.168.100.10:4000/inventoryapp/userlogs",
          { name: values.email, pass: values.password }
        ); //own ip (android)
        //10.0.2.2

        console.log("error", response);
      } catch (error: any) {
        console.log("error", error.message);
      }
    }
  };

  return (
    <>
      <LoginContainer>
        <InnerContainer>
          <Logo source={require("../../Images/Logo1.png")} />
          <Title>Inventory Manager</Title>
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

          <Footer></Footer>
        </InnerContainer>
      </LoginContainer>
    </>
  );
};

export default LoginScreen;
