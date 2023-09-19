import { View, Text, FlatList } from "react-native";
import React, { useEffect } from "react";
import styled from "styled-components/native";
import InventoryComponent from "../Inventory/Inventory";

import { useNavigation } from "@react-navigation/native";

import { useInventory } from "../Context/InventoryContent";
import {
  PickerContainer,
  SearchContainer,
  SearchInput,
} from "./InventoryStyle";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";
import { AntDesign } from "@expo/vector-icons";
const InventoryList = ({}) => {
  const navigation = useNavigation<any>();
  const { inventories, setInventories, masterInventory } = useInventory();
  const [search, setSearch] = React.useState(""); // Search data
  const [masterDataSource, setMasterDataSource] = React.useState([]); // All data

  const [selectedClassification, setSelectedClassification] = React.useState<
    string | null
  >(null);

  const classificationOptions = [
    "School Supplies",
    "Hardware",
    "Accessories",
    "Balls",
    // Add more classification options as needed
  ];

  const applyClassificationFilter = (selectedClassification: string | null) => {
    if (selectedClassification) {
      // Inserted text is not blank
      // Filter the inventories

      const newData = masterInventory.filter(function (item) {
        // Applying filter for the inserted text in the search bar (Checking the name)
        const itemData = item.classification
          ? item.classification.toUpperCase()
          : "".toUpperCase();
        const textData = selectedClassification.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setInventories(newData);
      setSearch(selectedClassification);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setInventories(masterDataSource);
      setSearch("");
    }
  };

  const navigateToScreen = (inventory: any) => {
    console.log("Inventory", inventory);
    navigation.navigate("Inventory Detail", { inventory });
  };

  const searchFilterFunction = (text: any) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the inventories
      const newData = inventories.filter(function (item) {
        // Applying filter for the inserted text in the search bar (Checking the name)
        const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setInventories(newData);
      setSearch(text);
    } else {
      // Update FilteredDataSource with masterDataSource
      setInventories(masterDataSource);
      setSearch(text);
    }
  };
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["Items"],
    queryFn: async () => {
      const response = await axios.get(
        "http://1192.168.100.10:4000/inventoryapp/itemlist"
      );
      return response.data;
    },

    staleTime: 5000, // 5 seconds in milliseconds
  });

  React.useEffect(() => {
    if (data && !isLoading) {
      setInventories(data);
      setMasterDataSource(data);
      refetch();
    }
  }, [isLoading, data, refetch]);

  if (isLoading) return <Text> Loading data</Text>;
  if (error) return <Text> Error data</Text>;
  //<AntDesign name="search1" size={40} color="black" style={{ left: 8 }} />

  return (
    <Container>
      <SearchInput
        autoCapitalize="none"
        autoCorrect={false}
        clearButtonMode="always"
        placeholder="Click here to search an item"
        onChangeText={(text) => searchFilterFunction(text)}
        value={search}
      />

      <PickerContainer>
        <Picker
          selectedValue={selectedClassification}
          onValueChange={(itemValue) => {
            setSelectedClassification(itemValue);
            console.log("Item Value", itemValue);
            setInventories(masterDataSource);
            applyClassificationFilter(itemValue);
          }}
        >
          <Picker.Item label="Select Classification Filter" value={null} />
          {classificationOptions.map((option) => (
            <Picker.Item key={option} label={option} value={option} />
          ))}
        </Picker>
      </PickerContainer>
      <FlatList
        data={inventories}
        renderItem={({ item }) => (
          <InventoryComponent
            onPress={() => navigateToScreen(item)}
            item={item}
          />
        )}
        // renderItem={({item}) => (<InventoryComponent items={[item]} onPress={() => navigateToScreen(item) }></InventoryComponent>)}
        // keyExtractor={(item, index) => `${item.name}_${index}`}
        scrollEnabled
        keyExtractor={(item) => item.name}
      />
    </Container>
  );
};

const Container = styled.View`
  background-color: #fff;
  padding: 20px;
  margin-left: 8px;
  border-radius: 8px;
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

export default InventoryList;