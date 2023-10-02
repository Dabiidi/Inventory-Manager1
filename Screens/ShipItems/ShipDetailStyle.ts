import styled from "styled-components/native";

export const Container = styled.View`
  background-color: #fff;
  flex: 1;
`;
export const TextHeader = styled.Text`
  font-size: 30px;
  color: #000;
  text-align: center;
  font-weight: 600;
`;
export const ItemHeader = styled.View`
  margin-top: 10px;
  padding: 20px;
  width: 90%;
  background-color: #12486b;
  align-self: center;

  align-content: center;
`;
export const MapContainer = styled.View`
  flex-direction: row;
`;

export const LocContainer = styled.View`
  flex-direction: column;
  background-color: #ffffff;
`;

export const LocationText = styled.Text`
  font-size: 15px;
  text-align: left;
  font-weight: 400;
  color: #000;
  text-align: center;
`;
export const LocateText = styled.Text`
  font-size: 15px;
  text-align: left;
  font-weight: 700;
  color: #000;
  text-align: center;
`;

export const ShippingContainer = styled.View`
  align-items: center;
`;

export const Name = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #fff;
`;
export const Quantity = styled.Text`
  font-size: 16px;
  color: #fff;
`;
export const Price = styled.Text`
  font-size: 16px;
  color: #fff;
`;
export const Desc = styled.Text`
  font-size: 16px;
  color: #fff;
`;
export const Classification = styled.Text`
  font-size: 16px;
  color: #fff;
`;
export const QuantityText = styled.TextInput`
  border-width: 1px;
  width: 90%;
  border-color: #000;
  padding: 10px;
  margin-top: 10px;
  border-radius: 5px;
`;
export const ButtonText = styled.Text`
  font-size: 20px;
  font-weight: 400;
  color: #fff;
  text-align: center;
`;
export const ShipButton = styled.TouchableOpacity`
  margin-top: 10px;
  width: 90%;
  background-color: #12486b;
  height: 40px;
  justify-content: center;
  border-radius: 20px;
`;
