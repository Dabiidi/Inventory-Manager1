import React from "react";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import {
  Body,
  Container,
  Greetings,
  Header,
  Texts,
  Logo,
  GreetingsText,
  AddButton,
  ButtonText,
  TextBody,
  ItemLogo,
  ReportButton,
  ItemLogoQR,
  ReportLogo,
  DashboardCon,
} from "./HomeStyle";

import { useInventory } from "../Context/InventoryContent";

type DashboardScreenRouteParams = {
  email: string;
};

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<any>();

  // const route =
  const { inventories } = useInventory();

  //   useRoute<RouteProp<Record<string, DashboardScreenRouteParams>, string>>();
  // const { email } = route.params;

  const [currentDateTime, setCurrentDateTime] = React.useState(new Date());
  const navigateToAdd = () => {
    console.log("Click");
    navigation.navigate("AddInventory");
  };
  const navigateToReport = () => {
    console.log("Click");
    navigation.navigate("Report Screen");
  };

  const countItemsByClassification = () => {
    const classificationCounts: Record<string, number> = {};

    inventories.forEach((item) => {
      const { classification } = item;
      if (classificationCounts[classification]) {
        classificationCounts[classification]++;
      } else {
        classificationCounts[classification] = 1;
      }
    });

    return classificationCounts;
  };

  const classificationCounts = countItemsByClassification();
  const sortedClassifications = Object.keys(classificationCounts).sort();

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Container>
      <Header>
        <Greetings>
          <GreetingsText>
            <Texts>Hello User</Texts>
            <Texts>
              {currentDateTime.toLocaleDateString()} |{" "}
              {currentDateTime.toLocaleTimeString()}
            </Texts>

            <Texts>Inventory Count: {inventories.length}</Texts>
          </GreetingsText>
        </Greetings>

        <Logo source={require("../../Images/Profile.png")}></Logo>
      </Header>
      <TextBody>Inventory Dashboard</TextBody>
      <Body>
        <DashboardCon>
          {sortedClassifications.map((classification) => (
            <Texts key={classification}>
              {classification}: {classificationCounts[classification]} items
            </Texts>
          ))}
        </DashboardCon>

        <AddButton onPress={navigateToAdd}>
          <ItemLogo source={require("../../Images/AddItem.png")}></ItemLogo>

          <ButtonText>Add Item</ButtonText>
        </AddButton>

        <ReportButton onPress={navigateToReport}>
          <ReportLogo
            source={require("../../Images/ReportLogo.png")}
          ></ReportLogo>

          <ButtonText>Reports</ButtonText>
        </ReportButton>
      </Body>
    </Container>
  );
};

export default HomeScreen;
