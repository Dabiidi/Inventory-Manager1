import React from "react";
import { View, Text, FlatList, Alert } from "react-native";
import {
  useGetShipping,
  useDeleteShippingLogs,
} from "../../services/shippingAPI"; // Make sure to import your hook
import styled from "styled-components/native";
import moment from "moment";

const ShipLogs = () => {
  // Use the custom hook to fetch ship items
  const { data: shipItems, isLoading, isError } = useGetShipping();
  const {
    data: logsData,
    isLoading: loadDelLogs,
    isError: errorLogs,
    mutateAsync,
  } = useDeleteShippingLogs();
  // Check if shipItems is undefined or null
  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (isError || shipItems === undefined || shipItems === null) {
    return (
      <View>
        <Text>Error fetching ship items</Text>
      </View>
    );
  }

  // Calculate total sales by summing up the 'total' property of all items
  const totalSales = shipItems.reduce(
    (total: any, item: any) => total + item.total,
    0
  );

  const onClear = () => {
    Alert.alert(
      "Clear Shipping Logs",
      "Are you sure to clear all shipping logs?",
      [
        {
          text: "No",
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

  const formatDate = (timestamp: string) => {
    try {
      const formattedDate = moment(timestamp).format("MMMM DD, YYYY, hh:mm A");
      return formattedDate;
    } catch (error) {
      console.error("Error formatting timestamp:", error);
      return "Invalid Timestamp";
    }
  };

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View>
        <Text>Error fetching ship items</Text>
      </View>
    );
  }

  return (
    <>
      <MainContaier>
        <ClearButton onPress={onClear}>
          <ButtonText>Clear Shipping Logs</ButtonText>
        </ClearButton>
        <FlatList
          data={shipItems}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <Container>
              <Name>Item Name: {item.name}</Name>
              <InfoText>Quantity To Ship: {item.quantityToShip}</InfoText>
              <InfoText>Total Sales: ₱{item.total}</InfoText>
              <InfoText>Destination: {item.destination}</InfoText>
              <InfoText>Shipped Date: {formatDate(item.createdAt)}</InfoText>
            </Container>
          )}
        />
      </MainContaier>
    </>
  );
};

const Container = styled.View`
  background-color: #12486b;
  padding: 20px;
  margin-top: 8px;
  border-radius: 8px;
  width: 90%;

  align-self: center;
`;
const MainContaier = styled.View`
  flex: 1;
`;
const Name = styled.Text`
  font-weight: bold;
  font-size: 20px;
  color: #fff;
`;

const InfoText = styled.Text`
  font-size: 15px;
  font-weight: bold;
  color: #fff;
`;
const ClearButton = styled.TouchableOpacity`
  height: 50px;
  border-radius: 10px;
  padding-top: 10px;
  margin-top: 10px;
  width: 90%;
  align-self: center;
  background-color: #ad0000;
`;
const ButtonText = styled.Text`
  font-size: 20px;
  text-align: center;
  color: #ffffff;
`;
export default ShipLogs;
