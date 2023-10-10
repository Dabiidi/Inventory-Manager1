import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../../../Home/HomeScreen";
import InventoryList from "../../../Inventory/InventoryList";
import QRDashboard from "../../../QRScanner/QRDashboard";
import {
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import Profile from "../../../Profile/Profile";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export function TabNavigator() { 
  return (
    <Tab.Navigator initialRouteName="Menu">
      <Tab.Screen
        name="Menu"
        component={HomeScreen}
        options={{
          title: "Dashboard",
          headerStyle: {
            backgroundColor: "#12486B",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },

          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Inventory List"
        component={InventoryList}
        options={{
          headerStyle: {
            backgroundColor: "#12486B",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="inventory" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Scan QR"
        component={QRDashboard}
        options={{
          headerStyle: {
            backgroundColor: "#12486B",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },

          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="qrcode-scan"
              size={24}
              color="black"
            />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerStyle: {
            backgroundColor: "#12486B",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },

          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-circle-outline"
              size={24}
              color="black"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
