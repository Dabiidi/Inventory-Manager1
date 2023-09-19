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
  InfoContainer,
  ReportLogo,
  DashboardCon,
  ShipButton,
  ButtonShip,
  Top,
  TopText,
} from "./HomeStyle";

import { useInventory } from "../Context/InventoryContent";
import { Octicons } from "@expo/vector-icons";
import { useGetItems } from "../../services/Items";

type DashboardScreenRouteParams = {
  email: string;
};

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<any>();

  const { inventories } = useInventory();

  const route =
    useRoute<RouteProp<Record<string, DashboardScreenRouteParams>, string>>();
  const { email } = route.params;
  const [currentDateTime, setCurrentDateTime] = React.useState(new Date());
  const navigateToAdd = () => {
    console.log("Click");
    navigation.navigate("AddInventory");
  };
  const navigateToReport = () => {
    console.log("Click");
    navigation.navigate("Report Screen");
  };

  const navigateToShip = () => {
    console.log("Click");
    navigation.navigate("ShipItem");
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
      <Top>
        <TopText>Menu</TopText>
      </Top>
      <Header>
        <Greetings>
          <GreetingsText>
            <Texts>Email:{email} </Texts>
            <Texts>
              {currentDateTime.toLocaleDateString()} |{" "}
              {currentDateTime.toLocaleTimeString()}
            </Texts>

            <Texts>Inventory Count: {inventories.length}</Texts>
          </GreetingsText>
        </Greetings>

        <Logo source={require("../../Images/Profile.png")}></Logo>
      </Header>
      <InfoContainer>
        <TextBody>Inventory Summary (in Quantity)</TextBody>

        <Texts>Numbers of Items(Classifications):</Texts>
        <DashboardCon>
          {sortedClassifications.map((classification) => (
            <Texts key={classification}>
              {classification}: {classificationCounts[classification]} item/s
            </Texts>
          ))}
        </DashboardCon>
      </InfoContainer>

      <Body>
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

        <ShipButton onPress={navigateToShip}>
          <Octicons name="package-dependents" size={60} color="black" />
          <ButtonShip>Ship Item</ButtonShip>
        </ShipButton>
      </Body>
    </Container>
  );
};

export default HomeScreen;
