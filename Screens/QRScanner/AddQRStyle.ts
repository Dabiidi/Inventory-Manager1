import styled from "styled-components/native";
import { BarCodeScanner } from "expo-barcode-scanner";

export const Container = styled.View`
  padding: 0 20px;
  background-color: #fff;
  height: 50px;

  flex: 1;
`;
export const HeaderContainer = styled.View`
  justify-content: center;
  margin: 50px;
  align-items: center;
`;

export const ScanData = styled.Text`
  font-size: 20px;
  font-weight: 900;
`;

export const Texts = styled.Text`
  font-size: 20px;
`;

export const HeaderInformation = styled.Text`
  font-size: 30px;
  text-align: center;
  font-weight: 900;
`;

export const ResultHeader = styled.View``;

export const SubmitButtom = styled.TouchableOpacity`
  margin-top: 10px;
  background-color: #2f4f4f;
  height: 13%;
  border-radius: 30px;
`;

export const TextStyleSubmit = styled.Text`
  color: #fff;
  text-align: center;
  font-size: 25px;
  font-weight: 800;
`;

export const BarcodeBox = styled.View`
  height: 300px;
  width: 300px;
  overflow: hidden;
  border-radius: 30px;
  background-color: tomato;
`;

export const StyledBarCodeScanner = styled(BarCodeScanner)`
  width: 300px;
  height: 400px;
`;

export const ScanAgainButton = styled.TouchableOpacity`
  margin-top: 10px;
  background-color: tomato;
  height: 10%;
  border-radius: 30px;
`;
export const TextStyle = styled.Text`
  color: #fff;
  text-align: center;
  font-size: 25px;
  font-weight: 800;
`;
