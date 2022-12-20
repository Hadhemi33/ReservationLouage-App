//import { StyleSheet, Text, View,Image,TextInput,Button,TouchableOpacity } from 'react-native';

import React from "react";
import { View, Text, Button ,TouchableOpacity} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Signin from "./screens/Signin";
import { LinearGradient } from "expo-linear-gradient";

import Home from "./screens/Home";
import SignupClient from "./screens/SignupClient";
import SignupChauffeur from "./screens/SignupChauffeur";
import Accueil from "./screens/Accueil";
import SignupChoix from "./screens/SignupChoix";
import validationsuccess from "./screens/validationsuccess";
import AjouterOffre from "./screens/AjouterOffre";
import ChangeInfo from "./screens/ChangeInfo";
import detailOffre from "./screens/detailOffre";
import ModifierOffre from "./screens/ModifierOffre";
import ListReservation from "./screens/ListReservation";
import ListReservationChauffeur from "./screens/ListReservationChauffeur";
import AccueilStack from "./screens/AccueilStack";
const Stack = createNativeStackNavigator();



export default function App() {
  const s = require("./styles/Style");

  return (
    <NavigationContainer>
      <Stack.Navigator
     
      >

        <Stack.Screen
          options={{ headerShown: false, indpendent: true }}
          name="Home"
          component={Home}
        />

        <Stack.Screen
          options={{ headerShown: false, indpendent: true }}

          name="SignupChoix"
          component={SignupChoix}
        />
        <Stack.Screen
          options={{ headerShown: false, indpendent: true }}

          name="SignupChauffeur"
          component={SignupChauffeur}
        />
        <Stack.Screen
          options={{ headerShown: false, indpendent: true }}

          name="SignupClient"
          component={SignupClient}
        />
        <Stack.Screen
          options={{ headerShown: false, indpendent: true }}
          name="Signin"
          component={Signin}
        />
        <Stack.Screen
          options={{ headerShown: false }}

          name="validationsuccess"
          component={validationsuccess}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="AccueilStack"
          component={AccueilStack}>

        </Stack.Screen>


        <Stack.Screen
          name="AjouterOffre"
          component={AjouterOffre}
        />


        <Stack.Screen
          name="Accueil"
          component={Accueil}
        />

        <Stack.Screen

          name="detailOffre"
          component={detailOffre}
          options={{ title: "Détails" ,headerShown: false }}
        />

        <Stack.Screen
          options={{ headerShown: false }}

          name="ChangeInfo"
          component={ChangeInfo}
        />







        <Stack.Screen
          name="ModifierOffre"
          options={{ title: "Modfication d'offre " }}
          component={ModifierOffre}
        />
        <Stack.Screen
          name="ListReservation"
          options={{ title: "Liste des réservations "}}
         

          component={ListReservation}
        />
        <Stack.Screen
          name="ListReservationChauffeur"
          options={{ title: "Liste des réservations "  }}
          component={ListReservationChauffeur}
        />
      </Stack.Navigator>

    </NavigationContainer>


  );
}
