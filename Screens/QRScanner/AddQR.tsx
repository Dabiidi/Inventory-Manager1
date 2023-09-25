import React, { useState, useEffect } from "react";
import { View, Text, Button, Alert } from "react-native";
import axios from "axios";
import { BarCodeScanner } from "expo-barcode-scanner";
import {
  BarcodeBox,
  ScanAgainButton,
  StyledBarCodeScanner,
  SubmitButtom,
  TextStyle,
  Container,
  Texts,
  TextStyleSubmit,
  ResultHeader,
  ScanData,
  HeaderInformation,
  HeaderContainer,
} from "./AddQRStyle";
import { UseAddItem, UseCheckItemExistance } from "../../services/Items";

const AddQR = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState<boolean>(false);
  const [text, setText] = useState<string>("Not yet scanned");
  const [name, setName] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [desc, setDesc] = useState<string>("");
  const [classification, setClassification] = useState<string>("");

  const handleBarCodeScanned = ({
    type,
    data,
  }: {
    type: string;
    data: string;
  }) => {
    setScanned(true);
    setText(data);

    const [Name, quant, itemPrice, Description, classification] =
      data.split(",");
    setName(Name);
    setQuantity(parseInt(quant));
    setPrice(parseFloat(itemPrice));
    setDesc(Description);
    setClassification(classification);
  };

  const askForCameraPermission = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === "granted");
  };

  const scanFalse = () => {
    setScanned(false);
    setName("");
    setQuantity(0);
    setPrice(0);
    setDesc("");
    setClassification("");
  };

  const { isLoading: loadingCheck, mutateAsync: loadingAsync } =
    UseCheckItemExistance();

  const { isLoading, mutateAsync } = UseAddItem();

  const handleSave = async () => {
    if (!name || !quantity || !price || !desc || !classification) {
      Alert.alert("Error", "Please fill in all fields before submitting");
      return;
    }
    const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
    const nameExists = await loadingAsync(capitalizedName);
    console.log("NameExistLog", nameExists);
    if (nameExists.exists !== false) {
      // Check for existence and if exists is true
      Alert.alert("Error", `Item ${capitalizedName} already exists.`);
      return;
    }
    try {
      await mutateAsync({
        name: capitalizedName,
        quantity,
        price,
        desc,
        classification,
      });

      Alert.alert(`Inventory Item ${capitalizedName} added successfully.`);
      setName("");
      setQuantity(0);
      setPrice(0);
      setDesc("");
      setClassification("");
    } catch (error: any) {
      Alert.alert("Error", error.message || "An error occurred");
    }
  };

  useEffect(() => {
    askForCameraPermission();
  }, []);

  return (
    <>
      <HeaderContainer>
        <BarcodeBox>
          <StyledBarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          />
        </BarcodeBox>
      </HeaderContainer>

      <Container>
        <></>

        <ResultHeader>
          <ScanData>Scanned Data: {text}</ScanData>
        </ResultHeader>
        <HeaderInformation>Item Information</HeaderInformation>
        <Texts>Name: {name}</Texts>
        <Texts>Quantity: {quantity}</Texts>
        <Texts>Price: {price}</Texts>
        <Texts>Description: {desc}</Texts>
        <Texts>Item Classification: {classification}</Texts>

        <SubmitButtom onPress={handleSave}>
          <TextStyleSubmit>Submit</TextStyleSubmit>
        </SubmitButtom>

        {scanned && (
          <ScanAgainButton onPress={scanFalse}>
            <TextStyle>Scan Again</TextStyle>
          </ScanAgainButton>
        )}
      </Container>
    </>
  );
};

export default AddQR;
