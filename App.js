import 'react-native-gesture-handler';
import React from 'react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import rootReducer from './src/reducer';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './src/screens/Home.js';
import QuizScreen from './src/screens/Quiz.js';
import ResultScreen from './src/screens/Result.js';

const store = createStore(rootReducer);

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          mode="modal"
          screenOptions={{
            headerShown: false,
          }}>
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
          <Stack.Screen
            name="ResultScreen"
            component={ResultScreen}
            options={{title: 'Score'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
