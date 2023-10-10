import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import InventoryProviders from "./Screens/Context/InventoryContent";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import { RootNavigator } from "./Screens/@core/hooks/navigations/base-navigator";
const Tab = createBottomTabNavigator();
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <InventoryProviders>
          <RootNavigator />
        </InventoryProviders>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
