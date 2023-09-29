import React from "react";
import {
  Modal,
  ScrollView,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import {
  Body,
  Container,
  Greetings,
  Header,
  AddButton,
  ButtonText,
  TextBody,
  ReportButton,
  InfoContainer,
  ShipButton,
  ButtonShip,
  TextWrapper1,
  TextCount,
  SalesText,
  BoxShadowView,
  AddContainer,
  ReportContainer,
  ShipContaier,
} from "./HomeStyle";

import { useInventory } from "../Context/InventoryContent";
import { AntDesign, MaterialIcons, Octicons } from "@expo/vector-icons";

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

  const [infoModalVisible, setInfoModalVisible] = React.useState(false);

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

  //   <Header>
  //   <Logo source={require("../../Images/Profile.png")}></Logo>
  //   <HeaderTexts>
  //     <TopText>Hello!</TopText>
  //     <TopText>{email}</TopText>
  //
  //   </HeaderTexts>
  // </Header>

  return (
    <Container>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Header>
          <BoxShadowView>
            <SalesText>Total Sales: ₱{totalSales.toFixed(2)}</SalesText>
            <AntDesign
              onPress={() => setInfoModalVisible(true)}
              name="exclamationcircleo"
              size={24}
              color="white"
            />
          </BoxShadowView>

          <Modal
            animationType="fade"
            transparent={true}
            visible={infoModalVisible}
            onRequestClose={() => {
              setInfoModalVisible(false);
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                right: 10,
                top: 140,
                position: "absolute",
              }}
            >
              <View
                style={{
                  backgroundColor: "white",
                  padding: 10,
                  borderRadius: 10,
                }}
              >
                <Text>Total Sales</Text>
                <TouchableHighlight
                  onPress={() => {
                    setInfoModalVisible(false);
                  }}
                  underlayColor="transparent"
                >
                  <Text
                    style={{
                      marginTop: 10,
                      color: "blue",
                      textAlign: "center",
                    }}
                  >
                    Ok
                  </Text>
                </TouchableHighlight>
              </View>
            </View>
          </Modal>
        </Header>
        <Body>
          <AddContainer>
            <AddButton onPress={navigateToAdd}>
              <MaterialIcons
                style={{ alignSelf: "center" }}
                name="add-box"
                size={70}
                color="red"
              />
            </AddButton>
            <ButtonText>Add Item</ButtonText>
          </AddContainer>

          <ReportContainer>
            <ReportButton onPress={navigateToReport}>
              <Octicons
                style={{ alignSelf: "center" }}
                name="report"
                size={70}
                color="red"
              />
            </ReportButton>
            <ButtonText>Reports</ButtonText>
          </ReportContainer>

          <ShipContaier>
            <ShipButton onPress={navigateToShip}>
              <Octicons
                style={{ alignSelf: "center" }}
                name="package-dependents"
                size={70}
                color="red"
              />
            </ShipButton>
            <ButtonShip>Ship Item</ButtonShip>
          </ShipContaier>
        </Body>
        <Greetings>Summary</Greetings>
        <InfoContainer>
          <TextWrapper1 onPress={NavigateToLogs}>
            <TextBody>Unavailable Item/s</TextBody>
            <TextCount>{noStock}</TextCount>
          </TextWrapper1>

          <TextWrapper1 onPress={navigateToShip}>
            <TextBody>Available Item/s </TextBody>
            <TextCount>{haveStock}</TextCount>
          </TextWrapper1>

          <TextWrapper1 onPress={NavigateToStock}>
            <TextBody>Shipped Item/s</TextBody>
            <TextCount>{haveStock}</TextCount>
          </TextWrapper1>
        </InfoContainer>
      </ScrollView>
    </Container>
  );
};

export default HomeScreen;
