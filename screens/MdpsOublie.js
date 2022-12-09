import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import { auth } from "../firebase";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
  SearchBar,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { LinearGradient } from "expo-linear-gradient";

export default function Accueil() {
  const [email, setEmail] = useState("");

  const handleSelect = () => {
    navigation.replace("validationsuccess");
  };
  const s = require("../styles/Style");
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.replace("Home");
  };
  const handleContinuer = () => {
    navigation.replace("codeVerif");
  };
  return (
    <View style={s.container}>
      {/* top barre  */}
      <View style={styles.barre}>
        <TouchableOpacity onPress={handleBack} style={s.buttonBack}>
          <Text style={s.buttonBackText}>{" < "} </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputView}>
        <Text style={styles.inputTextbienv}>mot de passe oublié ?</Text>
        <Text style={styles.inputTextmerci}>
          Un lien sera envoyé directement sur votre email. (Vérifiez votre
          dossier spam si vous ne voyez pas dans votre boîte de réception.)
        </Text>
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email..."
          placeholderTextColor="#003f5c"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View style={styles.Continuer}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleContinuer} style={styles.button}>
            <Text style={styles.buttonText}>Continuer </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  barre: {
    flex: 0.5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "95%",
  },

  inputView: {
    width: "95%",
    flex: 1,
  },
  Continuer: {
    width: "95%",
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },

  inputTextbienv: {
    color: "#078282",
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
  },

  inputTextmerci: {
    color: "black",
    fontSize: 20,
    marginBottom: 40,
    marginTop: 10,
    textAlign: "center",
  },
  inputText: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 30,
    fontSize: 14,
  },
  //caracteristicas du bouton
  button: {
    backgroundColor: "#2DBDBD",
    width: "80%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  //caracteristique du text du bouton
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 18,
  },
  buttonContainer: {
    width: "50%",
    alignItems: "center",
  },
});
