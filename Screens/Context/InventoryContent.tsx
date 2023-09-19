import { View, Text } from "react-native";
import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

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

  const { isLoading, error, data, refetch, isRefetching } = useQuery({
    queryKey: ["Items"],

    queryFn: async () => {
      const response = await axios.get(
        "http://192.168.100.10:4000/inventoryapp/itemlist"
      );

      return response.data;
    },
  });
  // console.log("ItemList", inventories);
  console.log({ isRefetching });
  React.useEffect(() => {
    if (data && !isLoading) {
      setInventories(data);
      setMasterInventory(data);
    }
    refetch();
  }, [isLoading, data, refetch]);

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text> Error gathering data.</Text>;
  const findInventory = () => data;

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
