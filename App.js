import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import FeedScreen from './screens/FeedScreen';
import ProfileScreen from './screens/ProfileScreen';


const stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <stack.Navigator>   
        <stack.Screen
          name= 'Home' options={{headerShown: false}}
          component={HomeScreen}
        />
        <stack.Screen
          name= 'Register' options={{headerShown: false}}
          component={RegisterScreen}
        />
        <stack.Screen
          name= 'Feed' options={{headerShown: false}}
          component={FeedScreen}
        />
        <stack.Screen
          name= 'Profile' options={{headerShown: false}}
          component={ProfileScreen}
        />
      
        
      </stack.Navigator>
    </NavigationContainer>
  );
}
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
