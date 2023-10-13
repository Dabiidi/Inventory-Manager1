import React from "react";
import { NavigationContainer } from "@react-navigation/native";


import InventoryProviders from "./Screens/Context/InventoryContent";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import { RootNavigator } from "./Screens/@core/hooks/navigations/base-navigator";

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
