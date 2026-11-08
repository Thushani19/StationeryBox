import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ItemsProvider } from './src/context/ItemsContext';
import HomeScreen from './src/screens/HomeScreen';
import AllItemsScreen from './src/screens/AllItemsScreen';
import AddItemScreen from './src/screens/AddItemScreen';
import CategoriesScreen from './src/screens/CategoriesScreen';
import ItemDetailsScreen from './src/screens/ItemDetailsScreen';
import LowStockScreen from './src/screens/LowStockScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ItemsProvider>
      <NavigationContainer>
        <StatusBar style="dark" />
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: { backgroundColor: '#FFFFFF' },
            headerTintColor: '#17233C',
            headerTitleStyle: { fontWeight: '800', fontSize: 18 },
            headerShadowVisible: false,
            contentStyle: { backgroundColor: '#F5F7FB' },
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'StationeryBox', headerLargeTitle: false }} />
          <Stack.Screen name="AllItems" component={AllItemsScreen} options={{ title: 'All Items' }} />
          <Stack.Screen name="AddItem" component={AddItemScreen} options={({ route }) => ({ title: route.params?.item ? 'Edit Item' : 'Add New Item' })} />
          <Stack.Screen name="Categories" component={CategoriesScreen} options={{ title: 'Categories' }} />
          <Stack.Screen name="ItemDetails" component={ItemDetailsScreen} options={{ title: 'Item Details' }} />
          <Stack.Screen name="LowStock" component={LowStockScreen} options={{ title: 'Low Stock' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </ItemsProvider>
  );
}
