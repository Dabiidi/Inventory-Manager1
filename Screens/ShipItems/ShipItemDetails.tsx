import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { RouteProp } from "@react-navigation/native";
import Picker from "react-native-picker-select";
import {
  Container,
  NameContainer,
  Name,
  QuantityContainer,
  Quantity,
  PriceContainer,
  Price,
  DescContainer,
  Desc,
  ClassificationContainer,
  Classification,
  BottomSheetContainer,
  BottomSheetContent,
  MapContainer,
  Text3,
} from "./ShipDetailStyle";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

type Items = {
  _id: string;
  name: string;
  quantity: number;
  price: number;
  desc: string;
  classification: string;
};

// Define the type for the route params
type ShipItemDetailsRouteParams = {
  ShipItemDetails: {
    inventory: Items;
  };
};
const ShipItemDetails: React.FC<{
  route: RouteProp<ShipItemDetailsRouteParams, "ShipItemDetails">;
}> = ({ route }) => {
  // Access the inventory item passed from the previous screen
  const { inventory } = route.params;
  const [currentAddress, setCurrentAddress] = useState("");

  const [mapRegion, setMapRegion] = useState({
    latitude: 7.1907,
    longitude: 125.4553,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });

  //   let getAddress = await Location.reverseGeocodeAsync(location.coords);
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const userLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Permission Denied");
    }
    let location = await Location.getCurrentPositionAsync();
    setCurrentLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
    let getAddress = await Location.reverseGeocodeAsync(location.coords);
    const formattedAddress = `${getAddress[0].name}, ${getAddress[0].city}, ${getAddress[0].region}`;
    setCurrentAddress(formattedAddress);
    console.log("Address", getAddress);
    setMapRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.001,
      longitudeDelta: 0.001,
    });
    console.log(location.coords.latitude, location.coords.longitude);
    return getAddress;
  };
  React.useEffect(() => {
    userLocation();
  }, []);

  return (
    <>
      <Container>
        <NameContainer>
          <Name>
            Item Name:
            {inventory.name}
          </Name>
        </NameContainer>

        <QuantityContainer>
          <Quantity>
            Quantity:
            {inventory.quantity}
          </Quantity>
        </QuantityContainer>

        <PriceContainer>
          <Price>
            Price:
            {inventory.price}
          </Price>
        </PriceContainer>

        <DescContainer>
          <Desc>
            Description:
            {inventory.desc}
          </Desc>
        </DescContainer>
        <ClassificationContainer>
          <Classification>
            Classification:
            {inventory.classification}
          </Classification>
        </ClassificationContainer>
        <MapView style={styles.map} region={mapRegion}>
          <Marker coordinate={mapRegion} title="Marker" />
          <Marker coordinate={currentLocation} title="My Location" />
        </MapView>
      </Container>
    </>
  );
};

const styles = StyleSheet.create({
  map: {
    height: 350,
    width: "100%",
  },
  showButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#F0F0F0",
    padding: 10,
    borderRadius: 10,
  },
});

export default ShipItemDetails;
