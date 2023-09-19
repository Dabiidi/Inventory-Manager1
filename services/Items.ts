import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetItems = () => {
  return useQuery({
    queryKey: ["Items"],
    queryFn: async () => {
      const response = await axios.get(
        "http://192.168.1.30:4000/inventoryapp/itemlist"
      );
      return response.data;
    },

    staleTime: 5000, // 5 seconds in milliseconds
  });
};

export const AddItem = () => {};
