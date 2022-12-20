import React from "react";
import { useNavigation ,useEffect } from "@react-navigation/core";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  s,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { auth, db } from "../firebase";
export default function Home() {
  const navigation = useNavigation();
  const s = require("../styles/Style");
  const handleSignup = () => {
    navigation.navigate("SignupChoix");
  };
  const handleLogin = () => {
    navigation.navigate("Signin");
  };

  const handleConnecterFacebook = () => {
    alert("ConnecterFacebook");
  };
  const handleConnecterGoogle = () => {
    alert("ConnecterGoogle");
  };
  const handlePasser = () => {
    navigation.replace("AccueilStack" , {role: "invité"} );
  };
 
  return (
    <View style={s.container}>
      <LinearGradient
        colors={["#66D9D9", "#FFF6F8"]}
        style={s.linearGradient}
      ></LinearGradient>
      <View style={s.logoView}>
        <Image style={s.logo} source={require("../assets/logo.png")}></Image>
        <Text style={s.logoblasti}>BLASTI</Text>
        <Text style={s.logoDesc}>Travailler, Voyager, Répéter</Text>
      </View>

      <View style={s.buttonBlanc}>
        <TouchableOpacity onPress={handleSignup} style={s.buttonsinscrire}>
          <Text style={s.buttonBlancText}>S'inscrire gratuitement </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleConnecterGoogle}
          style={s.buttonsinscrire}
        >
          <Text style={s.buttonBlancText}> Continuer avec Google </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleConnecterFacebook}
          style={s.buttonsinscrire}
        >
          <Text style={s.buttonBlancText}>Continuer avec Facebook </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogin} style={s.buttonLogin}>
          <Text style={s.loginButtonText}>Se connecter </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonPasser}>
        <TouchableOpacity onPress={handlePasser}>
          <Text style={styles.PasserText}>{"Passer  >"} </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  PasserText: {
    color: "#078282",
    fontSize: 14,
  },
  buttonPasser: {
    marginLeft: 300,
    marginTop: 50,
  },
});
