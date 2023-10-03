import { View, Text, FlatList, Alert } from "react-native";
import React from "react";

import moment from "moment"; // Import Moment.js
import {
  Container,
  InfoText,
  ItemContainer,
  TimeDate,
  Name,
  Header,
  ButtonText,
  ClearButton,
} from "./ReportScreenStyle";
import { useDeleteItemsLogs, useGetLogs } from "../../services/ItemsAPI";
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
  const { mutateAsync, isError: ErrorDelete } = useDeleteItemsLogs();
  const onClear = () => {
    Alert.alert(
      "Clear Shiping Logs",
      "Are you sure to clear all Item logs?",
      [
        {
          text: "No",
          onPress: () => console.log("no thanks"),
        },

        {
          text: "Yes",

          onPress: () => mutateAsync(),
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  if (isLoading) return <Text> Loading Data...</Text>;
  if (error) {
    return <Text>Error loading data</Text>;
  }

  return (
    <Container>
      <ClearButton onPress={onClear}>
        <ButtonText>Clear Shipping Logs</ButtonText>
      </ClearButton>
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
