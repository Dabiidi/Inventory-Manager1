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
  return (
    <Container>
      <ButtonAdd onPress={ScanToSearch}>
        <ButtonTexts>
          <MaterialCommunityIcons name="cube-scan" size={24} color="black" />
          Scan to ADD Item
        </ButtonTexts>
      </ButtonAdd>

      <ButtonScan>
        <ButtonTexts>
          <MaterialCommunityIcons name="magnify-scan" size={24} color="black" />
          Scan to Search Item
        </ButtonTexts>
      </ButtonScan>
    </Container>
  );
};

export default QRDashboard;
