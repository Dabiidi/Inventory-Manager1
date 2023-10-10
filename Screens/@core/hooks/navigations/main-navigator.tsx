import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AddItem from "../../../AddItem/AddItemScreen";
import QRDashboard from "../../../QRScanner/QRDashboard";
import InventoryDetail from "../../../Inventory/InventoryDetail";
import ShipItemDetails from "../../../ShipItems/ShipItemDetails";
import ReportScreen from "../../../Report/ReportScreen";
import ScantoSearch from "../../../QRScanner/SearchQR";
import ScanToAdd from "../../../QRScanner/AddQR";
import ShipItems from "../../../ShipItems/ShipItems";
import OutofStockItems from "../../../ShipItems/OutofStockItems";
import ShipLogs from "../../../ShipItems/ShipLogs";
import {
  AntDesign,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import HomeScreen from "../../../Home/HomeScreen";
import InventoryList from "../../../Inventory/InventoryList";
import Profile from "../../../Profile/Profile";
const RenderDetaiScreen = (props: any) => <InventoryDetail {...props} />;
const RenderShipScreen = (props: any) => <ShipItemDetails {...props} />;

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export function MainNavigator() {
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen
        name="AddInventory"
        component={AddItem}
        options={{
          title: "Inventory",
          headerBackVisible: false,

          headerShown: true,
          headerTitleStyle: {
            fontWeight: "bold",
            color: "white",
          },
          headerStyle: {
            backgroundColor: "#12486B",
          },
        }}
      />
      <Stack.Screen
        name="QRDashboard"
        component={QRDashboard}
        options={{
          title: "QR Scanner",
          headerBackVisible: true,
          headerTitleAlign: "center",
          headerShown: true,
          headerTitleStyle: {
            fontWeight: "bold",
            color: "white",
          },
          headerStyle: {
            backgroundColor: "#12486B",
          },
        }}
      />
      <Stack.Screen
        name="Inventory Detail"
        component={RenderDetaiScreen}
        options={{
          title: "Inventory Details",
          headerBackVisible: true,
          headerTitleAlign: "center",
          headerShown: true,
          headerTitleStyle: {
            fontWeight: "bold",
            color: "white",
          },
          headerStyle: {
            backgroundColor: "#12486B",
          },
        }}
      />
      <Stack.Screen
        name="Report Screen"
        component={ReportScreen}
        options={{
          title: "Inventory Logs",
          headerBackVisible: true,
          headerTitleAlign: "center",
          headerShown: true,
          headerTitleStyle: {
            color: "white",
          },
          headerStyle: {
            backgroundColor: "#12486B",
          },
        }}
      />
      <Stack.Screen
        name="ScanSearch"
        component={ScantoSearch}
        options={{
          title: "Scan to Search",
          headerBackVisible: true,
          headerTitleAlign: "center",
          headerShown: true,
          headerTitleStyle: {
            fontWeight: "bold",
            color: "white",
          },
          headerStyle: {
            backgroundColor: "#12486B",
          },
        }}
      />
      <Stack.Screen
        name="ScanToAdd"
        component={ScanToAdd}
        options={{
          title: "Scan to Add Item",
          headerBackVisible: true,
          headerTitleAlign: "center",
          headerShown: true,
          headerTitleStyle: {
            fontWeight: "bold",
            color: "white",
          },
          headerStyle: {
            backgroundColor: "#12486B",
          },
        }}
      />
      <Stack.Screen
        name="ShipItem"
        component={ShipItems}
        options={{
          title: "Ship Items Dashboard",
          headerBackVisible: true,
          headerTitleAlign: "center",
          headerShown: true,
          headerTitleStyle: {
            fontWeight: "bold",
            color: "white",
          },
          headerStyle: {
            backgroundColor: "#12486B",
          },
        }}
      />
      <Stack.Screen
        name="ShipItemDetails"
        component={RenderShipScreen}
        options={{
          title: "Ship Item",
          headerBackVisible: true,
          headerTitleAlign: "center",
          headerShown: true,
          headerTitleStyle: {
            fontWeight: "bold",
            color: "white",
          },
          headerStyle: {
            backgroundColor: "#12486B",
          },
        }}
      />
      <Stack.Screen
        name="OutOfStock"
        component={OutofStockItems}
        options={{
          title: "Unavailable Items",
          headerBackVisible: true,
          headerTitleAlign: "center",
          headerShown: true,
          headerTitleStyle: {
            fontWeight: "bold",
            color: "white",
          },
          headerStyle: {
            backgroundColor: "#12486B",
          },
        }}
      />
      <Stack.Screen
        name="ShipLogs"
        component={ShipLogs}
        options={{
          title: "Shipping Logs",
          headerBackVisible: true,
          headerTitleAlign: "center",
          headerShown: true,
          headerTitleStyle: {
            fontWeight: "bold",
            color: "white",
          },
          headerStyle: {
            backgroundColor: "#12486B",
          },
        }}
      />
    </Stack.Navigator>
  );
}
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
