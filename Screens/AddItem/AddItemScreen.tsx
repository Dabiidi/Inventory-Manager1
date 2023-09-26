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
import { Picker } from "@react-native-picker/picker";
import {
  UseAddItem,
  UseCheckItemExistance,
  saveLogs,
} from "../../services/ItemsAPI";

const AddItemScreen = () => {
  const [name, setName] = React.useState<string>("");
  const [quantity, setQuantity] = React.useState<number>(0);
  const [price, setPrice] = React.useState<number>(0);
  const [desc, setDesc] = React.useState<string>("");
  const navigation = useNavigation<any>();
  const [classification, setClassification] = React.useState<string | null>(
    null
  );

  const { isLoading: loadingCheck, mutateAsync: loadingAsync } =
    UseCheckItemExistance();

  const [changesMade, setChangesMade] = React.useState<string>();

  const { isLoading, mutateAsync } = UseAddItem();
  const { isLoading: loadingLogs, mutateAsync: mutateLogs } = saveLogs();

  const handleSubmit = async () => {
    if (!name || !quantity || !price || !desc || !classification) {
      Alert.alert("Error", "Please fill in all fields before submitting");
      return;
    }
    const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
    const nameExists = await loadingAsync(capitalizedName);

    if (nameExists.exists !== false) {
      Alert.alert("Error", `Item ${name} is already Exists.`);
      return;
    }
    try {
      // Call the mutation function when the "Submit" button is pressed
      await mutateAsync({
        name: capitalizedName,
        quantity,
        price,
        desc,
        classification,
      });

      await mutateLogs({
        itemName: name,
        action: `Added ${name} to the inventory.`,
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
            placeholderTextColor={"white"}
            autoCapitalize="words"
            onChangeText={(text) => setName(text)}
            value={name}
          />
          <Input
            placeholder="Quantity"
            placeholderTextColor={"white"}
            onChangeText={(text) => setQuantity(parseInt(text))}
            value={quantity ? quantity.toString() : ""}
            keyboardType="numeric"
          />
          <Input
            placeholder="Price"
            placeholderTextColor={"white"}
            onChangeText={(text) => setPrice(parseFloat(text))}
            value={price ? price.toString() : ""}
            keyboardType="numeric"
          />
          <Input
            placeholder="Description"
            placeholderTextColor={"white"}
            autoCapitalize="words"
            onChangeText={(text) => setDesc(text)}
            value={desc}
          />
        </Body>
        <PickerContainer>
          <Picker
            selectedValue={classification}
            onValueChange={(itemValue) => setClassification(itemValue)}
            style={{
              color: "#fff",
            }}
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
