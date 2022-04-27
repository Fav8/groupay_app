import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import GroupPage from './screens/GroupPage';
import CreateExpense from './screens/CreateExpense';
import Calculate from './screens/Calculate';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{headerShown: false}} name="Login" component={LoginScreen} />
        <Stack.Screen
        name="Your Groups" 
        options={{
          headerStyle: {
            backgroundColor: '#20232A',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}  component={HomeScreen} />
        <Stack.Screen name="Group" options={{
          headerStyle: {
            backgroundColor: '#20232A',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} component={GroupPage} />
        <Stack.Screen name="CreateExpense" options={{
          headerStyle: {
            backgroundColor: '#20232A',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} component={CreateExpense} />
        <Stack.Screen name="Calculate" options={{
          headerStyle: {
            backgroundColor: '#20232A',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} component={Calculate} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
