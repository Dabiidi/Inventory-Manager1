import React from "react";
import { View, Text, FlatList } from "react-native";
import { useGetShipping } from "../../services/Items"; // Make sure to import your hook
import styled from "styled-components/native";

const ShipLogs = () => {
  // Use the custom hook to fetch ship items
  const { data: shipItems, isLoading, isError } = useGetShipping();

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

  console.log(totalSales);
  // Handle loading and error states
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
      <FlatList
        data={shipItems}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Container>
            <Name>Item Name: {item.name}</Name>
            <InfoText>Quantity To Ship: {item.quantityToShip}</InfoText>
            <InfoText>Total Sales: ₱{item.total}</InfoText>
            <InfoText>Destination: {item.destination}</InfoText>
          </Container>
        )}
      />
    </>
  );
};

const Container = styled.View`
  background-color: #2f4f4f;
  padding: 20px;
  margin-top: 8px;
  border-radius: 8px;
  width: 90%;
  align-self: center;
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

export default ShipLogs;
