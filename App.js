import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './src/screens/Home.js';
import QuizScreen from './src/screens/Quiz.js';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Home'}}
        />
        <Stack.Screen
          name="QuizScreen"
          component={QuizScreen}
          options={{title: 'Quiz'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
