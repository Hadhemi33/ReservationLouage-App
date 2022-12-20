import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";

import { auth, db } from "../firebase";
export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user.emailVerified) {
        db.collection("users").doc(user.uid).get().then((doc) => {
          if (doc.data().role == "client") {
            navigation.replace("AccueilStack" , {role: "client"});
          } else  if (doc.data().role == "chauffeur") {
        navigation.replace("AccueilStack" , {role: "chauffeur"});
          }
          else {
            navigation.replace("AccueilStack" , {role: "Invité"});
          }
        });

      }
      else {
        navigation.replace("validationsuccess");
      }
    });
    return unsubscribe;
  }, []);

  const s = require("../styles/Style");

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Logged in with:", user.email);
      })
      .catch((error) => alert(error.message));
  };
  const handleSignup = () => {
    navigation.replace("SignupChoix");
  };
  const navigation = useNavigation();
 
  const handleRenitialiser = () => {
  
    auth.sendPasswordResetEmail(email)
    .then(() => {
      alert("Un email de réinitialisation vous a été envoyé");
    }
    )
    .catch((error) => {
      alert(error.message);
    }
    )

  };

  //aq
  return (
    <View style={s.container}>
      <StatusBar style="auto" />
     
      {/* <Image style={styles.logo} source={require("./assets/logo.png")} /> */}
      <View style={styles.inputView}>
        <Text style={styles.inputTextbienv}>Bienvenue!</Text>
        <Text style={styles.inputTextmerci}>Merci de vous connecter ! </Text>
      </View>

      <View style={styles.inputView}>
        <TextInput
          textContentType="emailAddress"
          style={styles.inputText}
          keyboardType="email-address"
          placeholder="Email..."
          placeholderTextColor="#003f5c"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          placeholder="Mot de passe..."
          style={styles.inputText}
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          textContentType="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <View style={styles.inputView1}>
        <TouchableOpacity onPress={handleRenitialiser}>
          <Text style={styles.textoublié}>Mot de passe oublié?</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Se connecter </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 20,
          width: "90%",
        }}
      >
        <View style={{ flex: 1, height: 1.5, backgroundColor: "black" }} />
        <View>
          <Text style={{ width: 50, textAlign: "center", fontSize: 16 }}>
            Or
          </Text>
        </View>
        <View style={{ flex: 1, height: 1.5, backgroundColor: "black" }} />
      </View>
      {/* <View style={styles.imageView}>
        <Image
          style={styles.logofb}
          source={require("./assets/icons8-facebook-circled-48.png")}
        />
        <Image
          style={styles.logogoogle}
          source={require("./assets/logogoogle.png")}
        />
      </View> */}

      <Text style={styles.textencore}>Vous n'avez pas encore un compte ?</Text>
      <TouchableOpacity onPress={handleSignup}>
        <Text style={s.TextconnecterInscrit}>inscrivez vous !</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  inputTextbienv: {
    color: "#078282",
    fontSize: 45,
    fontWeight: "bold",
    marginTop: 20,
  },
  inputTextmerci: {
    color: "black",
    fontSize: 20,
    marginBottom: 40,
    marginTop: 10,
  },
  inputTextor: {
    color: "black",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 10,
  },

  inputView: {
    width: "90%",
  },
  inputText: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 5,
    fontSize: 14,
  },
  inputView1: {
    width: "90%",
    alignItems: "flex-end",
  },

  textoublié: {
    color: "black",
    fontSize: 12,
    marginTop: 10,
  },
  //caracteristicas du bouton
  button: {
    backgroundColor: "#2DBDBD",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  //caracteristique du text du bouton
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 18,
  },
  //mise en forme le  bouton
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  textinscrit: {
    color: "red",
    fontSize: 14,
  },
  imageView: {
    width: "35%",
    display: "flex",
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 20,

    //make gap between images
    justifyContent: "space-between",
  },
  logofb: {
    width: 50,
    height: 50,
  },
});
