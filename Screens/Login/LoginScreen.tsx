import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Text, ImageBackground } from "react-native";
import {
  ButtonText,
  Container,
  EmailInput,
  Header,
  IntroHeader,
  LoginButton,
  LoginContainer,
  Logo,
  PassInput,
  PasswordContainer,
  StyledErrorText,
  TextContainer,
  Title,
  TitleText,
} from "./LoginStyle";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getUserAcc } from "../../services/userAPI";

interface FormData {
  email: string;
  password: string;
}
interface LoginformProps {
  navigate: (screen: string, params?: object) => void;
}
interface LandingScreenProps {
  navigation: LoginformProps;
}

const LoginForm: React.FC<LandingScreenProps> = ({ navigation }) => {
  const { control, handleSubmit, formState } = useForm<FormData>();

  const [error, setError] = React.useState<string | null>(null);

  const [showPassword, setShowPassword] = React.useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const { data: account } = getUserAcc();

  const onSubmit = (data: FormData) => {
    const user = account.find((user: any) => user.name === data.email);

    console.log("users", user);
    if (user) {
      if (user.pass === data.password) {
        console.log("name", user.name);
        navigation.navigate("Home", {
          screen: "Menu",
          params: { email: user.name },
        });
      } else {
        setError("Incorrect Email or Password.");
      }
    } else {
      setError("Incorrect Email or Password.");
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
          <Controller
            control={control}
            render={({ field, fieldState }) => (
              <>
                <EmailInput
                  isError={fieldState.invalid}
                  placeholder="Email"
                  value={field.value}
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                />
                {fieldState.invalid && (
                  <StyledErrorText>
                    {fieldState.error ? fieldState.error.message : ""}
                  </StyledErrorText>
                )}
              </>
            )}
            name="email"
            rules={{
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Invalid email format",
              },
            }}
            defaultValue=""
          />

          <Controller
            control={control}
            render={({ field, fieldState }) => (
              <>
                <PasswordContainer isError={fieldState.invalid}>
                  <PassInput
                    isError={fieldState.invalid}
                    placeholder="Password"
                    secureTextEntry={!showPassword}
                    value={field.value}
                    onChangeText={field.onChange}
                    onBlur={field.onBlur}
                  />
                  <MaterialCommunityIcons
                    name={showPassword ? "eye-off" : "eye"}
                    size={24}
                    color="#aaa"
                    onPress={toggleShowPassword}
                    style={{ marginRight: 10 }}
                  />
                </PasswordContainer>
                {fieldState.invalid && (
                  <StyledErrorText>
                    {fieldState.error ? fieldState.error.message : ""}
                  </StyledErrorText>
                )}
                {error && <StyledErrorText>{error}</StyledErrorText>}
              </>
            )}
            name="password"
            rules={{ required: "Password is required", minLength: 6 }}
            defaultValue=""
          />
          <LoginButton onPress={handleSubmit(onSubmit)}>
            <ButtonText>Login</ButtonText>
          </LoginButton>
          <Text style={{ textAlign: "center" }}> Forgot Password?</Text>
        </LoginContainer>
      </Container>
    </>
  );
};

export default LoginForm;
