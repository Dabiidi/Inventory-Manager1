import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
} from "react-native";
import { RouteProp, useNavigation } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import {
  Container,
  Name,
  Quantity,
  Price,
  Desc,
  Classification,
  LocationText,
  ShippingContainer,
  ItemHeader,
  LocContainer,
  MapContainer,
  LocateText,
  ButtonText,
  ShipButton,
  QuantityText,
} from "./ShipDetailStyle";
import CustomModal from "../Custom/CustomModal";

type Items = {
  _id: string;
  name: string;
  quantity: number;
  price: number;
  desc: string;
  classification: string;
};

type ShipItemDetailsRouteParams = {
  ShipItemDetails: {
    inventory: Items;
  };
};

const ShipItemDetails: React.FC<{
  route: RouteProp<ShipItemDetailsRouteParams, "ShipItemDetails">;
}> = ({ route }) => {
  const navigation = useNavigation<any>();
  const [total, setTotal] = React.useState(0);

  const { inventory } = route.params;
  const [currentAddress, setCurrentAddress] = useState("");

  const [quantityToShip, setQuantityToShip] = useState("");

  const [mapRegion, setMapRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [selectedLocation, setSelectedLocation] = useState({
    latitude: 0, // Initial latitude
    longitude: 0, // Initial longitude
  });

  const [selectedPlaceName, setSelectedPlaceName] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const userLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission Denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync();
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setCurrentLocation(coords);

      let getAddress = await Location.reverseGeocodeAsync(coords);
      const formattedAddress = `${getAddress[0].name}, ${getAddress[0].street}, ${getAddress[0].city}, ${getAddress[0].region}`;
      setCurrentAddress(formattedAddress);

      setMapRegion({
        ...coords,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      });
      return getAddress;
    } catch (error) {
      console.error("Error getting user location:", error);
    }
  };

  const shipItem = async () => {
    try {
      const response = await fetch(
        "http://192.168.1.30:4000/inventoryapp/ship-items",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            itemId: inventory._id,
            itemName: inventory.name,
            quantityToShip: parseInt(quantityToShip, 10),
            destination: selectedPlaceName,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        Alert.alert(
          "Ship Status",
          `Items shipped successfully.\nShipped quantity: ${data.shippedQuantity}`
        );
        navigation.goBack();
      } else {
        Alert.alert("Ship Status", `Item ${inventory.name} shipped Failed.`);
      }
    } catch (error) {
      Alert.alert("Ship Status", `Item ${inventory.name} shipped Failed.`);
    }
  };

  const submitItem = async () => {
    const quantitySelected = parseInt(quantityToShip, 10);
    console.log(quantitySelected);
    if (!selectedPlaceName && !quantityToShip === null) {
      Alert.alert("Error", "Please fill in all fields before submitting");
      return;
    } else if (
      quantityToShip === "0" ||
      quantitySelected > inventory.quantity
    ) {
      Alert.alert("Error", "Selected quantity is not allowed.");
      return;
    } else {
      const totalAmount = parseInt(quantityToShip, 10) * inventory.price;
      setTotal(totalAmount);
      setIsModalVisible(true);
    }
  };

  const handleMapTap = async (e: any) => {
    const tappedLocation = e.nativeEvent.coordinate;
    setSelectedLocation(tappedLocation);

    try {
      const getAddress = await Location.reverseGeocodeAsync(tappedLocation);
      if (getAddress.length > 0) {
        const formattedAddress = `${getAddress[0].name}, ${getAddress[0].street}, ${getAddress[0].city}, ${getAddress[0].region}`;
        setSelectedPlaceName(formattedAddress);

        console.log("textors", formattedAddress);
      } else {
        setSelectedPlaceName("Location not found");
      }
    } catch (error) {
      console.error("Error getting place name:", error);
      setSelectedPlaceName("Location not found");
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      // Reset the state when navigating away
      setMapRegion({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      });
      setSelectedLocation({
        latitude: 0,
        longitude: 0,
      });
      setSelectedPlaceName("");
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    userLocation();
  }, []);

  return (
    <>
      <Container>
        <MapContainer>
          <MapView style={styles.map} region={mapRegion} onPress={handleMapTap}>
            <Marker
              coordinate={selectedLocation}
              title="Selected Location"
              draggable={true}
              onDragEnd={(e) => {
                setSelectedLocation(e.nativeEvent.coordinate);
                handleMapTap(e);
              }}
            />

            <Marker coordinate={currentLocation} title="My Location" />
          </MapView>
        </MapContainer>
        <LocContainer>
          <LocationText>User Location </LocationText>
          <LocateText>{currentAddress}</LocateText>
          <LocationText>Selected Destination</LocationText>
          <LocateText>{selectedPlaceName}</LocateText>
        </LocContainer>

        <ItemHeader>
          <Name>Item Name:{inventory.name}</Name>

          <Quantity>Quantity:{inventory.quantity}</Quantity>

          <Price>Price: ₱{inventory.price}</Price>

          <Desc>Description:{inventory.desc}</Desc>

          <Classification>
            Classification:{inventory.classification}
          </Classification>
        </ItemHeader>

        <ShippingContainer>
          <QuantityText
            placeholder="Enter quantity to ship"
            keyboardType="numeric"
            onChangeText={(text) => setQuantityToShip(text)}
          />

          <ShipButton onPress={submitItem}>
            <ButtonText>Ship Item</ButtonText>
          </ShipButton>
        </ShippingContainer>
        <CustomModal
          visible={isModalVisible}
          ItemName={inventory.name}
          total={total}
          currentAddress={currentAddress}
          shipAddress={selectedPlaceName}
          onCancel={() => setIsModalVisible(false)}
          onConfirm={shipItem} // You can call shipItem when the user confirms
        />
      </Container>
    </>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    alignItems: "center",
  },
  map: {
    height: 300,
    width: "100%",
  },

  input: {
    width: 200,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default ShipItemDetails;
