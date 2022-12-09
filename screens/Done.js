import React from "react";
import { useNavigation } from "@react-navigation/core";

import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
} from "react-native";
export default function Accueil() {
  const s = require("../styles/Style");
  const navigation = useNavigation();
  const handleBack = () => {
    {
      navigation.replace("Home");
    }
  };
  const handleContinuer = () => {
    {
      navigation.replace("codeVerif");
    }
  };
  return (
    <View style={s.container}>
      <TouchableOpacity onPress={handleBack} style={s.buttonBack}>
        <Text style={s.buttonBackText}>{"< "} </Text>
      </TouchableOpacity>
      <View>
        <Image
          style={styles.logo}
          source={require("../assets/cbon.png")}
        ></Image>
      </View>
      <View style={styles.Textinfo}>
        <Text style={styles.Textinfo1}>
          Vos informations ont été validées avec succès{" "}
        </Text>
      </View>
      <View style={styles.buttonContinuer0}>
        <TouchableOpacity
          onPress={handleContinuer}
          style={styles.buttonContinuer}
        >
          <Text style={styles.buttonTextContinuer}>Continuer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    position: "relative",
    alignItems: "center",
    justifyContent: "flex-start",
    height: "50%",
    marginBottom: 10,
    top: -120,
    height: 320,
    width: 400,
    fontWeight: "bold",
  },
  Textinfo: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    top: -90,
    marginBottom: 5,
  },
  Textinfo1: {
    fontSize: 20,
    color: "black",
    marginBottom: 5,
  },
  buttonContinuer0: {
    backgroundColor: "#2DBDBD",
    width: "40%",
    padding: 10,
    borderRadius: 10,
    height: 50,
    justifyContent: "flex-start",
    alignItems: "center",
    left: 90,
    marginTop: 40,
  },
  buttonTextContinuer: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
