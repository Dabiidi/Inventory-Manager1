import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
  ImageBackground,
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
  PickerContainer,
  ButtonDelete,
} from "./InventoryDetailStyle";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import debounce from "lodash/debounce";

import { Picker } from "@react-native-picker/picker";

import {
  useDeleteInventory,
  useUpdateInventory,
  saveLogs,
} from "../../services/ItemsAPI";
type Items = {
  _id: string;
  name: string;
  quantity: number;
  price: number;
  desc: string;
  classification: string;
  [key: string]: string | number;
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

  const [editedInventory, setEditedInventory] = useState<Items>(
    inventory as Items
  );
  const [editMode, setEditMode] = useState(false);
  const [originalInventory, setOriginalInventory] = useState<Items>(inventory);

  const [editableField, setEditableField] = useState<string | null>(null);
  const [changesMade, setChangesMade] = useState<string>();

  const queryClient = useQueryClient();

  const { isLoading: loadingLogs, mutateAsync: mutateLogs } = saveLogs();

  const handleInputChange = async (fieldName: string, value: any) => {
    if (editedInventory[fieldName] !== value) {
      const changeDescription = `Changed ${fieldName} from "${editedInventory[fieldName]}" to "${value}"`;
      setChangesMade(changeDescription);
    }

    if (
      fieldName !== "name" &&
      fieldName !== "desc" &&
      (value === "" || value === null || isNaN(Number(value)))
    ) {
      value = 0;
    }

    setEditedInventory({
      ...editedInventory,
      [fieldName]: value,
    });
  };

  const CancelMode = () => {
    if (originalInventory) {
      setEditedInventory({ ...originalInventory });
    }

    setEditMode(false);
    setEditableField(null);
  };

  const {
    isLoading: loadingUpdate,
    mutateAsync: mutateUpdate,
    data,
    isSuccess,
  } = useUpdateInventory();

  const handleSave = async () => {
    console.log("Clicked");
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

    const dataChanged =
      editedInventory.name !== originalInventory.name ||
      editedInventory.quantity !== originalInventory.quantity ||
      editedInventory.price !== originalInventory.price ||
      editedInventory.desc !== originalInventory.desc ||
      editedInventory.classification !== originalInventory.classification;

    if (dataChanged) {
      const payload = { id: editedInventory._id, data: editedInventory };

      try {
        const updateResult = await mutateUpdate(payload);

        if (updateResult.status === 200) {
          await mutateLogs({
            itemName: editedInventory.name,
            action: changesMade,
          });
          queryClient.invalidateQueries(["Items"]);

          Alert.alert("Success", "Inventry item updated successfully");
          setEditMode(false);
          setEditableField(null);
        } else {
          Alert.alert("Error", data?.data.message || "Something went wrong");
        }
      } catch (error) {
        console.error("Error updating inventory item:", error);
        Alert.alert("Error", "Something went wrong");
      }
      navigation.goBack();
    } else {
      Alert.alert("No Changes", "No changes were made.");
      CancelMode();
      return;
    }
  };

  const classificationOptions = [
    "School Supplies",
    "Hardware",
    "Accessories",
    "Balls",
  ];

  const { mutateAsync } = useDeleteInventory(
    editedInventory._id,
    editedInventory.name
  );

  const displayDeleteAlert = () => {
    Alert.alert(
      "Delete an item",
      "This action will delete your item in your inventory!",
      [
        {
          text: "No",
          onPress: () => console.log("no thanks"),
        },
        {
          text: "Delete",

          onPress: () => mutateAsync(),
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  return (
    <>
      <ImageBackground
        source={require("../../Images/header.png")}
        resizeMode="cover"
        style={{ flex: 1, position: "relative" }}
        blurRadius={1}
      >
        <Container>
          <NameContainer>
            <Name>Item Name: {editedInventory.name}</Name>
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
              <PickerContainer>
                <Picker
                  selectedValue={editedInventory.classification}
                  onValueChange={(value) =>
                    handleInputChange("classification", value)
                  }
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
              <>
                <Buttons onPress={() => setEditMode(true)}>
                  <EditTexts>Edit Item</EditTexts>
                </Buttons>
                <ButtonDelete onPress={() => displayDeleteAlert()}>
                  <EditTexts>Delete Item</EditTexts>
                </ButtonDelete>
              </>
            ) : (
              <>
                <Buttons onPress={handleSave}>
                  <EditTexts>Save</EditTexts>
                </Buttons>
                <ButtonDelete onPress={CancelMode}>
                  <CancelButton>Cancel</CancelButton>
                </ButtonDelete>
              </>
            )}
          </ButtonContainer>
        </Container>

        <InfoContainer></InfoContainer>
      </ImageBackground>
    </>
  );
};
export default InventoryDetail;
