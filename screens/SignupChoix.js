import React from "react";
import { useNavigation } from "@react-navigation/core";
import { View, StyleSheet, Image, TouchableOpacity, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MaterialsIcon from "react-native-vector-icons/MaterialIcons";

export default function SignupChoix() {
  const navigation = useNavigation();
  const s = require("../styles/Style");

  const handleSignupChauffeur = () => {
    navigation.navigate("SignupChauffeur");
  };
  const handleSignupClient = () => {
    navigation.navigate("SignupClient");
  };

  return (
    <View style={s.container}>
      <LinearGradient
        colors={["#66D9D9", "#FFF6F8"]}
        style={s.linearGradient}
      ></LinearGradient>

      <View style={styles.logoView}>
        <Image style={s.logo} source={require("../assets/logo.png")}></Image>
        <Text style={s.logoblasti}>BLASTI</Text>
        <Text style={s.logoDesc}>Travailler, Voyager, Répéter</Text>
      </View>

      <TouchableOpacity
        onPress={handleSignupChauffeur}
        style={styles.buttonLogin}
      >
        <MaterialsIcon
          style={{ marginRight: 10, fontSize: 30, color: "white" }}
          name="directions-car"
        />
        <Text style={styles.loginButtonText}>Chauffeur </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSignupClient} style={styles.buttonLogin}>
        <MaterialsIcon
          style={{ marginRight: 10, fontSize: 30, color: "white" }}
          name="airline-seat-recline-normal"
        />
        <Text style={styles.loginButtonText}>Client </Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
    height: "100%",
    paddingBottom: 50,
  },
  logoView: {
    position: "relative",
    alignItems: "center",
    justifyContent: "flex-start",
    top: -40,
    fontWeight: "bold",
    marginBottom: 50,
  },
  logo: {
    height: 200,
    width: 200,
    resizeMode: "contain",
  },
  logoblasti: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
    marginTop: 0,
  },
  logoDesc: {
    fontSize: 20,
    color: "white",
    marginBottom: 10,
    marginTop: 0,
  },

  buttonLogin: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#078282",
    padding: 20,
    marginTop: 10,
    width: "60%",
    borderRadius: 15,
    borderColor: "red",
  },
  loginButtonText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
});
