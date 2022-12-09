import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Ionic from "react-native-vector-icons/Ionicons"
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Accueil from './Accueil';
import Done from './Done'
import Home from './Home';

// const TabBarNavigation = () => {
//   return (
//     <View>
//       <Text>TabBarNavigation</Text>
//     </View>
//   )
//}

export default function TabBarNavigation () {

    const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator 
      screenOptions={({route}) => ({
        tabBarIcon: ({focused,size, color}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ?"ios-home" : "ios-home-outline";
            size= focused ? size +8: size+5;
          } else if (route.name === 'Accueil') {
            iconName = focused ?"person" : "person-outline";
            size= focused ? size +8: size+5;

          }
          else if  (route.name === 'Done') {
            iconName = focused ?"add-circle" : "add-circle-outline";
            size= focused ? size +8: size+5;
          
          }
          return <Ionic name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'black',
        inactiveTintColor: 'black',
        showLabel:false,
        backgroundColor:'#ffc125',
        height:60,
      }}
      >
        
        <Tab.Screen name="Done" component={Done} />
        <Tab.Screen name="Accueil" component={Accueil} />
        <Tab.Screen name="Home" component={Home} />

        </Tab.Navigator>

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
