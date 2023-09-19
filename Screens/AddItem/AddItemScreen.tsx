import { View, Text, Alert, ScrollView } from "react-native";
import React from "react";
import {
  Container,
  Input,
  Header,
  Texts,
  SubmitButton,
  ButtonText,
  Logo,
  Body,
  ButtonContainer,
  PickerContainer,
} from "../AddItem/AddStyle";
import { useNavigation } from "@react-navigation/native";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";

const AddItemScreen = () => {
  const [name, setName] = React.useState<string>("");
  const [quantity, setQuantity] = React.useState<number>(0);
  const [price, setPrice] = React.useState<number>(0);
  const [desc, setDesc] = React.useState<string>("");
  const navigation = useNavigation<any>();
  const [classification, setClassification] = React.useState<string | null>(
    null
  );
  const checkItemExistence = async (itemName: string) => {
    try {
      // Use axios to make the API request
      const response = await axios.get(
        `http://192.168.1.30:4000/inventoryapp/itemlist/${itemName}`
      );

      return response.data;
    } catch (error) {
      // Handle errors
      console.error("Error:", error);
      throw error;
    }
  };

  const createInventoryItem = async (data: any) => {
    try {
      const response = await axios.post(
        "http://192.168.1.30:4000/inventoryapp/itemlist",
        data
      );
      return response.data;
    } catch (error) {
      // console.log("Error", error);
    }
  };
  //Use Mutations
  const { mutate: addInventoryItem } = useMutation(createInventoryItem);

  const handleSubmit = async () => {
    if (!name || !quantity || !price || !desc || !classification) {
      Alert.alert("Error", "Please fill in all fields before submitting");
      return;
    }
    const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
    const nameExists = await checkItemExistence(capitalizedName);
    if (nameExists.name == name) {
      Alert.alert("Error", `Item ${name} is already Exists.`);
      return;
    }
    try {
      // Call the mutation function when the "Submit" button is pressed
      const result = await addInventoryItem({
        name,
        quantity,
        price,
        desc,
        classification,
      });

      Alert.alert(`Inventory Item name ${name} added successfully.`);
      setName("");
      setQuantity(0);
      setPrice(0);
      setDesc("");
      navigation.navigate("Home");
    } catch (error: any) {
      Alert.alert("Error", error.message || "An error occurred");
    }
  };

  const handleCancel = () => {
    Alert.alert("Cancel", "Cancel Adding Item");
    navigation.navigate("Home");
  };
  const classificationOptions = [
    "School Supplies",
    "Hardware",
    "Accessories",
    "Balls",
  ];

  return (
    <Container>
      <ScrollView>
        <Header>
          <Texts>ADD INVENTORY ITEM </Texts>
          <Logo source={require("../../Images/AddInventory.png")}></Logo>
        </Header>
        <Body>
          <Input
            placeholder="Item Name"
            autoCapitalize="words"
            onChangeText={(text) => setName(text)}
            value={name}
          />
          <Input
            placeholder="Quantity"
            onChangeText={(text) => setQuantity(parseInt(text))}
            value={quantity ? quantity.toString() : ""}
            keyboardType="numeric"
          />
          <Input
            placeholder="Price"
            onChangeText={(text) => setPrice(parseFloat(text))}
            value={price ? price.toString() : ""}
            keyboardType="numeric"
          />
          <Input
            placeholder="Description"
            autoCapitalize="words"
            onChangeText={(text) => setDesc(text)}
            value={desc}
          />
        </Body>
        <PickerContainer>
          <Picker
            selectedValue={classification}
            onValueChange={(itemValue) => setClassification(itemValue)}
          >
            <Picker.Item label="Select Classification" value={null} />
            {classificationOptions.map((option, index) => (
              <Picker.Item key={index} label={option} value={option} />
            ))}
          </Picker>
        </PickerContainer>

        <ButtonContainer>
          <SubmitButton onPress={handleSubmit}>
            <ButtonText>Submit</ButtonText>
          </SubmitButton>
          <SubmitButton onPress={handleCancel}>
            <ButtonText>Cancel</ButtonText>
          </SubmitButton>
        </ButtonContainer>
      </ScrollView>
    </Container>
  );
};

export default AddItemScreen;
