//import { StyleSheet, Text, View,Image,TextInput,Button,TouchableOpacity } from 'react-native';

import React from "react";
import { View, Text, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Signin from "./screens/Signin";
import TabBarNavigation from "./screens/TabBarNavigation";
import { LinearGradient } from "expo-linear-gradient";

import Home from "./screens/Home";
import SignupClient from "./screens/SignupClient";
import SignupChauffeur from "./screens/SignupChauffeur";
import Accueil from "./screens/Accueil";
import SignupChoix from "./screens/SignupChoix";
import validationsuccess from "./screens/validationsuccess";
import Done from "./screens/Done";
import AjouterOffre from "./screens/AjouterOffre";
import ChangeInfo from "./screens/ChangeInfo";
import detailOffre from "./screens/detailOffre";
import MdpsOublie from "./screens/MdpsOublie";
import codeVerif from "./screens/codeVerif";
import ModifierOffre from "./screens/ModifierOffre";
import { useNavigation } from "@react-navigation/core";
import { TouchableOpacity } from "react-native-gesture-handler";
import ListReservation from "./screens/ListReservation";
const Stack = createNativeStackNavigator();



export default function App() {
  const s = require("./styles/Style");

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerBackground: () => (
            <LinearGradient
              colors={["#2DBDBD", "#078282"]}
              style={s.linearGradient}
            />
          ),


          headerRight: () => (
            <View>
              <TouchableOpacity>
              </TouchableOpacity>
            </View>
          ),
        }}
      >
      
        <Stack.Screen
          name="Home"
          component={Home}
        />
        <Stack.Screen
          name="AjouterOffre"
          component={AjouterOffre}
        />


        <Stack.Screen
          name="Accueil"
          component={Accueil}
        />

        <Stack.Screen
          name="codeVerif"
          component={codeVerif}
        />
        <Stack.Screen
          name="MdpsOublie"
          component={MdpsOublie}
        />
        <Stack.Screen
          name="detailOffre"
          component={detailOffre}
          options={{ title: "Détails" }}
        />

        <Stack.Screen
          name="ChangeInfo"
          component={ChangeInfo}
        />

        <Stack.Screen
          name="TabBarNavigation"
          component={TabBarNavigation}
        />

        <Stack.Screen
          name="SignupChoix"
          component={SignupChoix}
        />
        <Stack.Screen
          name="SignupChauffeur"
          component={SignupChauffeur}
        />
        <Stack.Screen
          name="SignupClient"
          component={SignupClient}
        />
        <Stack.Screen
          name="Signin"
          component={Signin}
        />

        <Stack.Screen
          name="Done"
          component={Done}
        />

        <Stack.Screen
          name="validationsuccess"
          component={validationsuccess}
        />
        <Stack.Screen
          name="ModifierOffre"
          component={ModifierOffre}
        />
        <Stack.Screen
          name="ListReservation"
          component={ListReservation}
        />
      </Stack.Navigator>

    </NavigationContainer>


  );
}
