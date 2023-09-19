import { View, Text, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useGetItems } from "../../services/Items";

interface Item {
  name: string;
  quantity: number;
  price: number;
  desc: string;
  classification: string;
}

interface ItemContextType {
  inventories: Item[];
  setInventories: React.Dispatch<React.SetStateAction<Item[]>>;
  findInventory: () => void;
  masterInventory: Item[];
}

const initialContext: ItemContextType = {
  inventories: [],
  setInventories: () => {},
  findInventory: () => {},
  masterInventory: [],
};

interface InventoryProviderProp {
  children: React.ReactNode;
}

const InventoryContext = React.createContext<ItemContextType>(initialContext);
const InventoryContent: React.FC<InventoryProviderProp> = ({ children }) => {
  const [inventories, setInventories] = useState<Item[]>([]);
  const [masterInventory, setMasterInventory] = useState<Item[]>([]);
  const [inventoryCount, setInventoryCount] = useState<Item[]>([]);

  const GetItemData = useGetItems();

  // console.log("ItemList", inventories);
  console.log(GetItemData.isRefetching);
  React.useEffect(() => {
    if (GetItemData.data && !GetItemData.isLoading) {
      setInventories(GetItemData.data);
      setMasterInventory(GetItemData.data);
    }
    GetItemData.refetch();
  }, [GetItemData.isLoading, GetItemData.data, GetItemData.refetch]);

  if (GetItemData.isLoading)
    return (
      <>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size="large" color="#00ff00" />
          <Text style={{ textAlign: "center" }}>Loading...</Text>
        </View>
      </>
    );

  if (GetItemData.error) return <Text> Error gathering data.</Text>;
  const findInventory = () => GetItemData.data;

  return (
    <InventoryContext.Provider
      value={{ inventories, setInventories, findInventory, masterInventory }}
    >
      {children}
    </InventoryContext.Provider>
  );
};
export const useInventory = () => React.useContext(InventoryContext);

export default InventoryContent;
