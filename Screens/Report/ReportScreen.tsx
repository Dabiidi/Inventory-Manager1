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
import { useGetLogs } from "../../services/ItemsAPI";
const ReportScreen: React.FC = () => {
  const { isLoading, error, data } = useGetLogs();

  const formatDate = (timestamp: string) => {
    try {
      const formattedDate = moment(timestamp).format("MMMM DD, YYYY, hh:mm A");
      return formattedDate;
    } catch (error) {
      console.error("Error formatting timestamp:", error);
      return "Invalid Timestamp";
    }
  };

  if (isLoading) return <Text> Loading Data...</Text>;
  if (error) {
    return <Text>Error loading data</Text>;
  }

  return (
    <Container>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <ItemContainer>
            <TimeDate>{`${formatDate(item.createdAt)} ${
              item.action
            }.`}</TimeDate>

            <Name>{`Item Name: ${item.itemName}`} </Name>
          </ItemContainer>
        )}
        scrollEnabled
        keyExtractor={(item) => item.itemName}
      />
    </Container>
  );
};

export default ReportScreen;
