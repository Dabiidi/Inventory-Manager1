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
