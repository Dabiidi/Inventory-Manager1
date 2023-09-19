import { View, Text, FlatList } from "react-native";
import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import moment from "moment"; // Import Moment.js
import {
  Container,
  InfoText,
  ItemContainer,
  TimeDate,
  Name,
  Header,
} from "./ReportScreenStyle";
const ReportScreen: React.FC = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["Items"],

    queryFn: async () => {
      const response = await axios.get(
        "http://192.168.100.10:4000/inventoryapp/itemlist"
      );

      return response.data;
    },
  });

  const formatDate = (timestamp: string) => {
    try {
      // Parse the timestamp using Moment.js and format it
      const formattedDate = moment(timestamp).format("MMMM DD, YYYY, hh:mm A");
      return formattedDate;
    } catch (error) {
      console.error("Error formatting timestamp:", error);
      return "Invalid Timestamp";
    }
  };
  if (error) {
    return <Text>Error loading data</Text>;
  }

  //  <Name>{`Quantity: ${item.quantity}`}</Name>
  //           <Name>{`Price: ${item.price}`}</Name>
  //           <Name>{`Description: ${item.desc}`}</Name>

  return (
    <Container>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <ItemContainer>
            <TimeDate>{`Item added from inventory at: ${formatDate(
              item.createdAt
            )}`}</TimeDate>

            <Name>{`Item Name: ${item.name}`} </Name>

            <Name>{`Classification: ${item.classification}`}</Name>
          </ItemContainer>
        )}
        scrollEnabled
        keyExtractor={(item) => item.name}
      />
    </Container>
  );
};

export default ReportScreen;
