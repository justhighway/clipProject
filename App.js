import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Community from './frontend/screens/Community/Community';
import Board from './frontend/screens/Community/Board';
import Detail from './frontend/screens/Community/Detail'; // 추가

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Community" 
          component={Community} 
          options={{ headerShown: false }} // 헤더 숨기기
        />
        <Stack.Screen 
          name="Board" 
          component={Board} 
          options={{ headerShown: false }} // 헤더 숨기기
        />
        <Stack.Screen 
          name="Detail" // 추가
          component={Detail} // 추가
          options={{ headerShown: true, title: '게시글 상세', headerTitleAlign: 'center' }} // 추가
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
