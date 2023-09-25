import { View, Text, FlatList } from "react-native";
import React from "react";
import { useInventory } from "../Context/InventoryContent";
import InventoryComponent from "../Inventory/Inventory";
import { useNavigation } from "@react-navigation/native";
import { ButtonLogs, ButtonText, Texts, Container, BodyContainer } from "./ShipItemStyle";
const ShipItems = () => {
  const navigation = useNavigation<any>();
  const { inventories, setInventories } = useInventory();

  const navigateToScreen = (inventory: any) => {
    navigation.navigate("ShipItemDetails", { inventory });
  };

  const NavigateToLogs = () => {
    navigation.navigate("OutOfStock");
  };

  const NavigateToStock = () => {
    navigation.navigate("ShipLogs");
  };

  const filterInventory = (inventory: any) => {
    return inventory.filter((inv: any) => inv.quantity > 0);
  };

  return (
    <>
      <Container>
        <ButtonLogs onPress={NavigateToStock}>
          <ButtonText>Shipping Logs</ButtonText>
        </ButtonLogs>

        <ButtonLogs onPress={NavigateToLogs}>
          <ButtonText>Out of stock Logs</ButtonText>
        </ButtonLogs>

        <Texts> Available Items: (Click to Ship)</Texts>
        <BodyContainer>
          <FlatList
            data={filterInventory(inventories)}
            renderItem={({ item }) => (
              <InventoryComponent
                onPress={() => navigateToScreen(item)}
                item={item}
              />
            )}
            // renderItem={({item}) => (<InventoryComponent items={[item]} onPress={() => navigateToScreen(item) }></InventoryComponent>)}
            // keyExtractor={(item, index) => `${item.name}_${index}`}
            scrollEnabled
            keyExtractor={(item) => item.name}
          />
        </BodyContainer>
      </Container>
    </>
  );
};

export default ShipItems;
