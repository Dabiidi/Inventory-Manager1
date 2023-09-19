import { View, Text } from "react-native";
import React from "react";
import {
  Container,
  ButtonAdd,
  ButtonTexts,
  ButtonScan,
} from "./QRDashboardStyle";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";

const QRDashboard = () => {
  const navigation = useNavigation<any>();
  const ScanToSearch = () => {
    navigation.navigate("ScanSearch");
  };

  const ScanToAdd = () => {
    navigation.navigate("ScanToAdd");
  };

  return (
    <Container>
      <ButtonAdd onPress={ScanToAdd}>
        <MaterialCommunityIcons name="cube-scan" size={100} color="black" />

        <ButtonTexts>Scan to ADD</ButtonTexts>
      </ButtonAdd>

      <ButtonScan onPress={ScanToSearch}>
        <MaterialCommunityIcons name="magnify-scan" size={100} color="black" />

        <ButtonTexts>Scan to Search</ButtonTexts>
      </ButtonScan>
    </Container>
  );
};

export default QRDashboard;
