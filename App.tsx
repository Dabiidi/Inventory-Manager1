import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./Screens/Login/LoginScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./Screens/Home/HomeScreen";
import InventoryList from "./Screens/Inventory/InventoryList";
import Profile from "./Screens/Profile/Profile";
import AddItem from "./Screens/AddItem/AddItemScreen";
import QRDashboard from "./Screens/QRScanner/QRDashboard";
import InventoryProviders from "./Screens/Context/InventoryContent";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import InventoryDetail from "./Screens/Inventory/InventoryDetail";
import ReportScreen from "./Screens/Report/ReportScreen";
import ScantoSearch from "./Screens/QRScanner/SearchQR";
import ScanToAdd from "./Screens/QRScanner/AddQR";
import ShipItems from "./Screens/ShipItems/ShipItems";

import ShipItemDetails from "./Screens/ShipItems/ShipItemDetails";
const Stack = createNativeStackNavigator();
import {
  AntDesign,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import OutofStockItems from "./Screens/ShipItems/OutofStockItems";
import ShipLogs from "./Screens/ShipItems/ShipLogs";
import LandingPage from "./Screens/LandingPage/LandingPage";
const Tab = createBottomTabNavigator();
const queryClient = new QueryClient();

const RenderDetaiScreen = (props: any) => <InventoryDetail {...props} />;
const RenderShipScreen = (props: any) => <ShipItemDetails {...props} />;
function StackNav() {
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen
        name="Landing"
        component={LandingPage}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />

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
          title: "Item Shipping Logs",
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
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function Home() {
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
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <InventoryProviders>
          <StackNav />
        </InventoryProviders>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
