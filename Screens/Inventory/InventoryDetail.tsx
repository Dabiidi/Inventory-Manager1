import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { RouteProp, useNavigation } from "@react-navigation/native";
import {
  Container,
  Name,
  Total,
  Price,
  Desc,
  Classification,
  InfoContainer,
  TextInputs,
  EditTexts,
  NameContainer,
  QuantityContainer,
  PriceContainer,
  DescContainer,
  ClassificationContainer,
  CancelButton,
  ButtonContainer,
  Buttons,
  Texts,
} from "./InventoryDetailStyle";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
type Items = {
  _id: string;
  name: string;
  quantity: number;
  price: number;
  desc: string;
  classification: string;
};
type InventoryDetailRouteParamList = {
  "Inventory Detail": {
    inventory: Items;
  };
};
type Props = {
  route: RouteProp<InventoryDetailRouteParamList, "Inventory Detail">;
};
const InventoryDetail: React.FC<Props> = ({ route }: Props) => {
  const { inventory } = route.params;
  // console.log("Item ID", inventory._id);
  const navigation = useNavigation();
  // State variables to hold edited data and edit mode
  const [editedInventory, setEditedInventory] = useState<Items>(inventory);
  const [editMode, setEditMode] = useState(false);
  const [editableField, setEditableField] = useState<string | null>(null);

  const queryClient = useQueryClient();

  // Function to handle changes in the form inputs
  const handleInputChange = (fieldName: string, value: any) => {
    setEditedInventory({
      ...editedInventory,
      [fieldName]: value,
    });
  };

  const CancelMode = async () => {
    setEditMode(false);
    setEditableField(null);
  };

  // Function to save the edited data to the database
  const handleSave = async () => {
    // console.log("Item ID", editedInventory._id);
    if (
      !editedInventory.name ||
      !editedInventory.quantity ||
      !editedInventory.price ||
      !editedInventory.desc ||
      !editedInventory.classification
    ) {
      Alert.alert("Error", "Fields must not be empty!");
      return;
    }

    try {
      const response = await axios.put(
        `http://192.168.100.10:4000/inventoryapp/itemlist/${editedInventory._id}`,
        editedInventory
      );
      // console.log(editedInventory);

      if (response.status === 200) {
        queryClient.invalidateQueries(["Items"]);
        Alert.alert("Success", "Inventory item updated successfully");
        setEditMode(false);
        setEditableField(null);
      } else {
        // Handle server errors or validation errors and show an appropriate error message
        Alert.alert("Error", response.data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error updating inventory item:", error);
      Alert.alert("Error", "Something went wrong");
    }
    navigation.goBack();
  };

  useEffect(() => {}, []);

  console.log(editMode);
  return (
    <>
      <Container>
        <NameContainer>
          <Name>Item Name:</Name>
          {editMode ? (
            <TextInputs
              editable
              value={editedInventory.name}
              onChangeText={(value) => handleInputChange("name", value)}
            ></TextInputs>
          ) : (
            <Name
              onPress={() => {
                console.log(editMode);

                if (editMode) setEditableField("name");
              }}
            >
              {editedInventory.name}
            </Name>
          )}
        </NameContainer>

        <QuantityContainer>
          <Total>Quantity: </Total>
          {editMode ? (
            <TextInputs
              value={editedInventory.quantity.toString()}
              onChangeText={(value) =>
                handleInputChange("quantity", parseInt(value))
              }
              keyboardType="numeric"
            />
          ) : (
            <Total
              onPress={() => {
                if (editMode) setEditableField("quantity");
                console.log(editMode);
              }}
            >
              {" "}
              {editedInventory.quantity}
            </Total>
          )}
        </QuantityContainer>

        <PriceContainer>
          <Price>Price: </Price>
          {editMode ? (
            <TextInputs
              value={editedInventory.price.toString()}
              onChangeText={(value) =>
                handleInputChange("price", parseFloat(value))
              }
              keyboardType="numeric"
            />
          ) : (
            <Price
              onPress={() => {
                if (editMode) setEditableField("price");
              }}
            >
              {editedInventory.price}
            </Price>
          )}
        </PriceContainer>

        <DescContainer>
          <Desc>Description:</Desc>
          {editMode ? (
            <TextInputs
              value={editedInventory.desc}
              onChangeText={(value) => handleInputChange("desc", value)}
            />
          ) : (
            <Desc
              onPress={() => {
                if (editMode) setEditableField("desc");
              }}
            >
              {editedInventory.desc}
            </Desc>
          )}
        </DescContainer>
        <ClassificationContainer>
          <Classification>Classification:</Classification>
          {editMode ? (
            <TextInputs
              value={editedInventory.classification}
              onChangeText={(value) =>
                handleInputChange("classification", value)
              }
            />
          ) : (
            <Classification
              onPress={() => {
                if (editMode) setEditableField("classification");
              }}
            >
              {editedInventory.classification}
            </Classification>
          )}
        </ClassificationContainer>

        <ButtonContainer>
          {!editMode ? (
            <Buttons onPress={() => setEditMode(true)}>
              <EditTexts>Edit Items</EditTexts>
            </Buttons>
          ) : (
            <>
              <Buttons onPress={handleSave}>
                <EditTexts>Save</EditTexts>
              </Buttons>
              <Buttons onPress={CancelMode}>
                <CancelButton>Cancel</CancelButton>
              </Buttons>
            </>
          )}
        </ButtonContainer>
      </Container>

      <InfoContainer>
        <Texts> {inventory.name} Logs</Texts>
      </InfoContainer>
    </>
  );
};
export default InventoryDetail;
