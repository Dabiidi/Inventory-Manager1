import { View, Text, FlatList } from "react-native";
import React from "react";
import { useInventory } from "../Context/InventoryContent";
import InventoryComponent from "../Inventory/Inventory";
import { useNavigation } from "@react-navigation/native";
import { ButtonLogs, ButtonText, Texts, Container } from "./ShipItemStyle";
const ShipItems = () => {
  const navigation = useNavigation<any>();
  const { inventories, setInventories } = useInventory();

  const navigateToScreen = (inventory: any) => {
    navigation.navigate("ShipItemDetails", { inventory });
  };

  const NavigateToLogs = (inventory: any) => {
    navigation.navigate("ShipItemDetails", { inventory });
  };

  return (
    <>
      <Container>
        <ButtonLogs onPress={NavigateToLogs}>
          <ButtonText>Shipping Logs</ButtonText>
        </ButtonLogs>
      </Container>
      <Texts> Available Items</Texts>
      <FlatList
        data={inventories}
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
    </>
  );
};

export default ShipItems;
