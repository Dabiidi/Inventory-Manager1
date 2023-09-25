import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";

export const getUserAcc = () => {
  return useQuery({
    queryKey: ["Users"], // Use the email as part of the query key
    queryFn: async () => {
      try {
        const response = await axios.get(
          "http://192.168.1.30:4000/inventoryapp/userlogs"
        );

        const userData = response.data;

        return userData;
      } catch (error) {
        throw error;
      }
    },
  });
};
export const useGetItems = () => {
  return useQuery({
    queryKey: ["Items"],
    queryFn: async () => {
      const response = await axios.get(
        "http://192.168.1.30:4000/inventoryapp/itemlist"
      );
      return response.data;
    },
    refetchInterval: 5000, // 5 seconds in milliseconds (adjust as needed)
    staleTime: 5000, // 5 seconds in milliseconds
  });
};

export const useGetLogs = () => {
  return useQuery({
    queryKey: ["itemLogs"],
    queryFn: async () => {
      const response = await axios.get(
        "http://192.168.1.30:4000/inventoryapp/itemlogs"
      );
      return response.data;
    },
    refetchInterval: 5000, // 5 seconds in milliseconds (adjust as needed)
    staleTime: 5000, // 5 seconds in milliseconds
  });
};

export const useGetShipping = () => {
  return useQuery({
    queryKey: ["ShipItems"],
    queryFn: async () => {
      const response = await axios.get(
        "http://192.168.1.30:4000/inventoryapp/ship-items"
      );
      return response.data;
    },
    refetchInterval: 5000,
  });
};

export const useDeleteInventory = (id: string, name: string) => {
  const navigation = useNavigation();
  return useMutation({
    mutationFn: async () => {
      const res = await axios.delete(
        `http://192.168.1.30:4000/inventoryapp/itemlist/${id}`
      );

      return res.data;
    },
    onSuccess: () => {
      Alert.alert("Delete", `Item ${name} Successfully deleted.`);
      navigation.goBack();
      console.log("test");
    },
  });
};

//ADD API
export const useUpdateInventory = () => {
  const navigation = useNavigation();

  const updateItem = async (data: any) => {
    const response = await axios.put(
      `http://192.168.1.30:4000/inventoryapp/itemlist/${data.id}`,
      data.data
    );
    console.log("Item Updated.", response);

    return response;
  };

  return useMutation(updateItem);
};

//ADD API
export const UseAddItem = () => {
  const navigation = useNavigation();

  const addItem = async (data: any) => {
    const response = await axios.post(
      "http://192.168.1.30:4000/inventoryapp/itemlist",
      data
    );

    console.log("Item Added", response.data);
  };

  return useMutation(addItem);
};

export const saveLogs = () => {
  const res = async (logData: any) => {
    const response = await axios.post(
      "http://192.168.1.30:4000/inventoryapp/itemlogs",
      logData
    );

    console.log("Added Logs", response.data);

    return response.data;
  };
  return useMutation(res);
};

export const UseCheckItemExistance = () => {
  const navigation = useNavigation();

  const res = async (itemName: string) => {
    const response = await axios.get(
      `http://192.168.1.30:4000/inventoryapp/itemlist/${itemName}`
    );

    console.log("Exist Item Inventory", response.data);
    return response.data;
  };

  return useMutation(res);
};
