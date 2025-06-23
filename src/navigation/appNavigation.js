import React from 'react';
import {LogBox, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screen/homeScreen';
import {themeColors} from '../theme';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AddUser from '../components/addUser';
import UserDetails from '../components/userDetails';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={props => ({
          contentStyle: {backgroundColor: 'white'},
        })}>
        <Stack.Screen
          name="Home"
          options={{headerShown: false}}
          component={HomeTabs}
        />
        <Stack.Screen
          name="AddUser"
          // options={{headerShown: false}}
          component={AddUser}
          options={({navigation, route}) => ({
            headerLeft: null,
            headerTitle: () => <></>,
            headerRight: () => <></>,
            headerTitleAlign: 'center',
            headerShadowVisible: false,
            headerTintColor: themeColors.bgLight,
          })}
        />
        <Stack.Screen
          name="UserDetails"
          component={UserDetails}
          options={{
            headerTitle: () => (
              <Text
                style={{
                  fontSize: 18,
                  color: themeColors.bgLight,
                  fontWeight: '600',
                }}>
                User Details
              </Text>
            ),
            headerTitleAlign: 'center',
            headerBackTitleVisible: false,
            headerShadowVisible: false,
            headerTintColor: themeColors.bgLight,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        // headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({focused, color, size}) => menuIcons(route, focused),
        tabBarStyle: {
          marginBottom: 20,
          borderRadius: 50,
          marginHorizontal: 20,
          backgroundColor: themeColors.bgLight,
        },
      })}>
      <Tab.Screen
        name="home"
        component={HomeScreen}
        screenOptions={{headerShown: false}}
        options={{
          headerLeft: null,
          headerTitle: () => (
            <Text
              style={{
                fontSize: 18,
                color: themeColors.bgLight,
                fontWeight: '600',
              }}>
              User List
            </Text>
          ),
          headerRight: () => <></>,
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerTintColor: themeColors.bgLight,
        }}
      />
      <Tab.Screen
        name="add"
        component={AddUser}
        options={({navigation, route}) => ({
          headerLeft: null,
          headerTitle: () => (
            <Text
              style={{
                fontSize: 18,
                color: themeColors.bgLight,
                fontWeight: '600',
              }}>
              Add User
            </Text>
          ),
          headerRight: () => <></>,
          headerShadowVisible: false,
          headerTintColor: themeColors.bgLight,
        })}
      />
    </Tab.Navigator>
  );
}

const menuIcons = (route, focused) => {
  let icon;

  if (route.name === 'home') {
    icon = focused ? (
      <Icon name="account-box" size={30} color={themeColors.bgLight} />
    ) : (
      <Icon name="account-box" size={30} strokeWidth={2} color="white" />
    );
  } else if (route.name === 'add') {
    icon = focused ? (
      <Icon name="plus-thick" size={30} color={themeColors.bgLight} />
    ) : (
      <Icon name="plus-thick" size={30} strokeWidth={2} color="white" />
    );
  }

  let buttonClass = focused ? 'white' : '';
  return (
    <View style={{backgroundColor: buttonClass, borderRadius: 50, padding: 7}}>
      {icon}
    </View>
  );
};
