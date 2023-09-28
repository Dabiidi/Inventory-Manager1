import React from "react";
import { ScrollView, Text, View } from "react-native";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import {
  Body,
  Container,
  Greetings,
  Header,
  Texts,
  Logo,
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
  TextWrapper1,
  TextWrapper2,
  HeaderTexts,
  TextCount,
  AvailableCount,
  TextWrappper3,
  TextBodyShip,
  TextCountShip,
  SalesText,
  MainContainer,
} from "./HomeStyle";

import { useInventory } from "../Context/InventoryContent";
import { Octicons } from "@expo/vector-icons";
import { useGetItems } from "../../services/ItemsAPI";

import { ImageBackground } from "react-native";
import ShipLogs from "../ShipItems/ShipLogs";
import { useGetShipping } from "../../services/shippingAPI";

type DashboardScreenRouteParams = {
  email: string;
};

interface ShipItem {
  total: number;
  // Add other properties as needed
}

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [noStock, useNoStock] = React.useState(0);
  const [haveStock, useHaveStock] = React.useState(0);
  const { inventoryCount } = useInventory();
  const [inventSales, setTotalSales] = React.useState(0);

  const route =
    useRoute<RouteProp<Record<string, DashboardScreenRouteParams>, string>>();
  const { email } = route.params;

  const filterInventory = (inventory: any) => {
    return useNoStock(inventory.filter((inv: any) => inv.quantity === 0));
  };

  React.useEffect(() => {
    const filteredInventoryNoStock = inventoryCount.filter(
      (inv) => inv.quantity === 0
    );
    useNoStock(filteredInventoryNoStock.length);

    const filteredInventoryhaveStock = inventoryCount.filter(
      (inv) => inv.quantity > 0
    );
    useHaveStock(filteredInventoryhaveStock.length);
  }, [inventoryCount]);

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

  const NavigateToLogs = () => {
    navigation.navigate("OutOfStock");
  };

  const NavigateToStock = () => {
    navigation.navigate("ShipLogs");
  };

  const countItemsByClassification = () => {
    const classificationCounts: Record<string, number> = {};

    inventoryCount.forEach((item) => {
      const { classification } = item;
      if (classificationCounts[classification]) {
        classificationCounts[classification]++;
      } else {
        classificationCounts[classification] = 1;
      }
    });

    return classificationCounts;
  };

  const { data, isLoading, isError, refetch } = useGetShipping();

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (isError || data === undefined || data === null) {
    return (
      <View>
        <Text>Error fetching ship items</Text>
      </View>
    );
  }

  const totalSales = data.reduce(
    (total: number, item: ShipItem) => total + item.total,
    0
  );

  return (
    <Container>
      <ScrollView>
        <Header>
          <Logo source={require("../../Images/Profile.png")}></Logo>
          <HeaderTexts>
            <TopText>Hello!</TopText>
            <TopText>{email}</TopText>
            <SalesText>Total Sales: ₱{totalSales.toFixed(2)}</SalesText>
          </HeaderTexts>
        </Header>

        <MainContainer>
          <InfoContainer>
            <Greetings>Summary</Greetings>
            <Top>
              <TextWrapper1 onPress={NavigateToLogs}>
                <TextCount>{noStock}</TextCount>

                <TextBody>Unavailable Item/s</TextBody>
              </TextWrapper1>

              <TextWrapper2 onPress={navigateToShip}>
                <AvailableCount>{haveStock}</AvailableCount>
                <TextBody>Available Item/s </TextBody>
              </TextWrapper2>
            </Top>

            <TextWrappper3 onPress={NavigateToStock}>
              <TextCountShip>{haveStock}</TextCountShip>
              <TextBodyShip>Shipped Item/s</TextBodyShip>
            </TextWrappper3>
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
        </MainContainer>
      </ScrollView>
    </Container>
  );
};

export default HomeScreen;
