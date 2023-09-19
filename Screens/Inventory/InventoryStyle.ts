import { TextInput } from "react-native";
import { styled } from "styled-components/native";

export const SearchInput = styled(TextInput).attrs({
  placeholder: "Search an item",
})`
  margin-top: 5px;
  flex-direction: row;
  background-color: #fff;
  height: 50px;
  width: 100%;
  border-radius: 10px;
  padding: 10px;
`;

export const PickerContainer = styled.View`
  padding: 10px;
  justify-content: center;
  height: 50px;
  background-color: #ffffff;
  border-radius: 10px;
  margin-top: 10px;
`;
export const SearchContainer = styled.View`
  height: 50px;
`;
