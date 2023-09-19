import React, { useState, useEffect } from "react";
import { View, Button, Alert } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import {
  BarcodeBox,
  StyledBarCodeScanner,
  Texts,
  Container,
  OutputData,
} from "./SearchStyle";

interface Items {
  name: string;
  quantity: number;
  total: number;
}
const ScantoSearch = () => {
  const [hasPermission, setHasPermission] = useState<Boolean | null>(null);
  const [scanned, setScanned] = useState<boolean>(false);
  const [text, setText] = useState<string>("Not yet Scanned");
  const [itemData, setItemData] = useState<any | null>(null);
  const askForCameraPermission = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === "granted");
  };

  const scanFalse = () => {
    setScanned(false);
    setText("");
    setItemData("");
  };

  useEffect(() => {
    askForCameraPermission();
  }, []);

  const handleBarCodeScanned = async ({
    type,
    data,
  }: {
    type: string;
    data: string;
  }) => {
    setScanned(true);
    setText(data);

    const checkItemExistence = async (itemName: string) => {
      try {
        const response = await fetch(
          `http://192.168.1.30:4000/inventoryapp/itemlist/${itemName}`
        );

        if (response.ok) {
          const data = await response.json();
          console.log("The data", data);
          return data;
        } else {
          // Handle error response
          console.error("Error checking item existence");
          return false;
        }
      } catch (error) {
        // Handle connection errors
        console.error("Error:", error);
        return false;
      }
    };

    const [Name] = data.split(",");
    // Check the database for the item using the item's name
    const itemExists = await checkItemExistence(Name);

    if (itemExists.name && itemExists) {
      // Fetch and display item data from the database
      alert(`Item ${itemExists.name} Found!`);
      setItemData(itemExists);
    } else {
      Alert.alert("ITEM NOT FOUND", `Item ${data} doesn't exist.`);

      setItemData(null);
    }
  };

  if (hasPermission === false) {
    return (
      <View>
        <Texts style={{ margin: 10 }}> No access to camera.</Texts>
        <Button
          title={"allow camera"}
          onPress={() => askForCameraPermission()}
        />
      </View>
    );
  }

  return (
    <>
      <Container>
        <Texts>Scan QR to Search an Item</Texts>
        <BarcodeBox>
          <StyledBarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          />
        </BarcodeBox>

        <Container>
          <OutputData>Scanned Data: {text}</OutputData>

          <OutputData>Item Name: {itemData?.name}</OutputData>
          <OutputData>Item Quantity: {itemData?.quantity}</OutputData>
          <OutputData>Item Total: {itemData?.price}</OutputData>
          <OutputData>Item Description: {itemData?.desc}</OutputData>
          <OutputData>
            Item Classification: {itemData?.classification}
          </OutputData>
          <Button
            title={"Scan again?"}
            onPress={() => scanFalse()}
            color="tomato"
          />
        </Container>
      </Container>
    </>
  );
};

export default ScantoSearch;
