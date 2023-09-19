import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: #b9eddd;
`;
export const Top = styled.View`
  flex-direction: row;
  height: 7%;
  background-color: #016a70;
`;
export const TopText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #b9eddd;
  justify-content: center;
  margin-top: 15px;
  margin-left: 17px;
`;

export const Header = styled.View`
  flex-direction: row;
  align-content: center;
  justify-content: space-between;
  padding: 10px;
  background-color: #b9eddd;
  border-bottom: black;
`;

export const Texts = styled.Text`
  font-size: 20px;
  font-weight: 400;
`;
export const TextBody = styled.Text`
  font-size: 20px;
  font-weight: 400;
  text-align: center;
  background-color: #016a70;
  color: #ffffff;
`;
export const Logo = styled.Image`
  width: 100px;
  height: 100px;
  padding: 30px;
  border-radius: 50px;
`;

export const GreetingsText = styled.View``;

export const DashboardCon = styled.View`
  justify-content: center;
  margin-bottom: 50px;
`;
export const Greetings = styled.Text``;

export const InfoContainer = styled.View`
  height: 20%;
  margin-bottom: 50px;
  background-color: #b9eddd;
`;

export const Body = styled.View`
  background-color: #b9eddd;

  padding: 20px;
`;
export const ReportButton = styled.TouchableOpacity`
  background-color: #016a70;
  height: 20%;
  width: 90%;
  border-radius: 30px;
  margin-bottom: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-left: 18px;
`;

export const AddButton = styled.TouchableOpacity`
  background-color: #016a70;
  height: 20%;
  width: 90%;
  border-radius: 30px;
  margin-bottom: 10px;
  flex-direction: row;
  align-items: center;
  margin-left: 18px;
  justify-content: center;
`;

export const ButtonText = styled.Text`
  font-size: 30px;
  color: white;
  font-weight: bold;
  margin-left: 20px;
  margin-right: 16px;
  text-align: center;
`;

export const ButtonShip = styled.Text`
  font-size: 30px;
  color: white;
  font-weight: bold;
  text-align: center;
  margin-left: 34px;
  margin-right: 1px;
`;
export const ItemLogo = styled.Image`
  width: 50px;
  height: 60px;
  margin-right: 20px;
`;
export const ItemLogoQR = styled.Image`
  width: 40px;
  height: 80px;
  margin-right: 20px;
`;

export const ReportLogo = styled.Image`
  width: 70px;
  height: 70px;
  margin-left: 2px;
  margin-right: 10px;
`;

export const ShipButton = styled.TouchableOpacity`
  background-color: #016a70;
  height: 20%;
  width: 90%;
  border-radius: 30px;
  margin-bottom: 10px;
  flex-direction: row;
  align-items: center;
  margin-left: 18px;
  justify-content: center;
`;
