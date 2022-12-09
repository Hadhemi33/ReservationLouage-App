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
  const [nb1, setnb1] = useState("");
  const [nb2, setnb2] = useState("");
  const [nb3, setnb3] = useState("");
  const [nb4, setnb4] = useState("");

  const handleSelect = () => {
    navigation.replace("validationsuccess");
  };
  const s = require("../styles/Style");
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.replace("Home");
  };
  const handleVerifier = () => {
    navigation.replace("Signin");
  };
  return (
    <View style={s.container}>
      {/* top barre  */}
      <View style={styles.barre}>
        <TouchableOpacity onPress={handleBack} style={s.buttonBack}>
          <Text style={s.buttonBackText}>{" < "} </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.contenu}>
        <Text style={styles.inputText}>
          Un code de réinitialisation a été envoyé à votre e-mail.
        </Text>
        <View style={styles.code}>
          <View style={styles.inputCode}>
            <TextInput
              style={styles.inputcodenum}
              placeholder=""
              placeholderTextColor="#003f5c"
              value={nb1}
              onChangeText={(text) => setnb1(text)}
            />
          </View>
          <View style={styles.inputCode}>
            <TextInput
              style={styles.inputcodenum}
              placeholder=""
              placeholderTextColor="#003f5c"
              value={nb2}
              onChangeText={(text) => setnb2(text)}
            />
          </View>
          <View style={styles.inputCode}>
            <TextInput
              style={styles.inputcodenum}
              placeholder=""
              placeholderTextColor="#003f5c"
              value={nb3}
              onChangeText={(text) => setnb3(text)}
            />
          </View>
          <View style={styles.inputCode}>
            <TextInput
              style={styles.inputcodenum}
              placeholder=""
              placeholderTextColor="#003f5c"
              value={nb4}
              onChangeText={(text) => setnb4(text)}
            />
          </View>
        </View>
      </View>
      <View style={styles.Verifier}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleVerifier} style={styles.button}>
            <Text style={styles.buttonText}>Verifier </Text>
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
    width: "100%",
    height: 50,
    backgroundColor: "#2DBDBD",
    position: "absolute",
    top: 0,
    left: 0,
  },
  contenu: {
    flex: 2,
    alignItems: "center",
    width: "90%",
    justifyContent: "center",
  },
  inputText: {
    color: "black",
    fontSize: 20,
    textAlign: "center",
    paddingTop: 130,
    paddingBottom: 50,
  },
  Verifier: {
    width: "95%",
    flex: 0.75,
    justifyContent: "flex-start",
    alignItems: "center",
  },
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
  inputcodenum: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 10,
    borderEndWidth: 3,
    borderBottomWidth: 3,
    borderColor: "#b3b3b3",
    backgroundColor: "#f2f2f2",
    marginTop: 30,
    fontSize: 14,
  },
  inputCode: {
    width: "45%",
    flex: 1,
    alignItems: "center",
  },
  code: {
    flexDirection: "row",
  },
});
