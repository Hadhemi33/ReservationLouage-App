import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/core";
import Menu from "./Menu";

export default function App() {
  const [user, setUser] = useState(null);
  const navigation = useNavigation();
  const s = require("../styles/Style");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [cin, setCin] = useState("");
  const [numTel, setNumTel] = useState("");
  const [IdentifiantUnique, setIdentifiantUnique] = useState("");

  useEffect(() => {
    db.collection("users").doc(auth.currentUser.uid).get().then((doc) => {
      console.log("Document data:", doc.data());
      setUser(doc)
      setNom(doc.data().nom);
      setPrenom(doc.data().prenom);
      setCin(doc.data().cin);
      setNumTel(doc.data().numerodetelephone);
      setIdentifiantUnique(doc.data().Identifiantunique ? doc.data().Identifiantunique : "");
    });
  }, []);

  useEffect(() => {
    auth.currentUser.updateProfile({
      photoURL: numTel,
    });

  }, [numTel]);

  useEffect(() => {
    auth.currentUser.updateProfile({
      displayName: nom,
    });
  }, [nom]);


  const handleMetreAJour = () => {
    if (user.data().role == "chauffeur") {
      db.collection("users")
        .doc(user.id)
        .update({
          nom: nom,
          prenom: prenom,
          cin: cin,
          numerodetelephone: numTel,
          Identifiantunique: IdentifiantUnique,
        })
        .then(() => {
          alert("Vos informations ont été mises à jour avec succès");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      db.collection("users")
        .doc(user.id)
        .update({
          nom: nom,
          prenom: prenom,
          cin: cin,
          numerodetelephone: numTel,
        })
        .then(() => {
          auth.currentUser.updateProfile({
            phoneNumber: numTel,
          });

          alert("Vos informations ont été mises à jour avec succès");
        })
        .catch((error) => {
          console.log(error);
        });
    }
    navigation.replace("Accueil");
  };

  const handleSupprimer = () => {
    auth.currentUser
      .delete()
      .then(() => {
        alert("Votre compte a été supprimé avec succès");
        navigation.replace("Home");
        console.log("user deleted");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Home");
        console.log("user logged out");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const handleResetpassword = () => {
    auth
      .sendPasswordResetEmail(auth.currentUser.email)
      .then(() => {
        alert(
          "Vous avez récu un mail sur " +
          auth.currentUser.email +
          " pour reintialiser le mot de passe"
        );
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  const [showBox, setShowBox] = useState(true);
  const showConfirmDialog = (ss) => {
    return Alert.alert("Vous êtes sûr? ", "Vous êtes sûr de " + ss, [
      // The "Yes" button
      {
        text: "Oui",
        onPress: () => {
          if (ss == "supprimer le compte") {
            handleSupprimer();
          } else if (ss == "Reintiliaser le mot de passe") {
            handleResetpassword();
          }

          setShowBox(false);
        },
      },
      // The "No" button
      // Does nothing but dismiss the dialog when tapped
      {
        text: "Non",
      },
    ]);
  };
  return (
    <View style={styles.container}>
      <View style={styles.blok}>
        <Text style={styles.textchange}> Changer vos informations ! </Text>
      </View>

      {/* Pour que lorsque on click sur l'icon de edit tt7alena l input edhika 
      :
      1/ na7ou  touchableopacity 3la l icon 
      2/ w ba3ed n7oto licon fo9 l input
      3/ ba3ed f css na3toha position absolute w right 0 bch tched limin blkol 

       */}
      <View style={styles.inputlabel}>
        <Text style={styles.TextLabel}>Nom: </Text>
        <View style={styles.inputView}>
          <Icon style={styles.inputIcon} name="edit" size={24} color="red" />

          <TextInput
            style={styles.TextInput}
            placeholder="Nom"
            placeholderTextColor="#003f5c"
            value={nom}
            onChangeText={(nom) => setNom(nom)}
          />
        </View>
      </View>
      <View style={styles.inputlabel}>
        <Text style={styles.TextLabel}>Prénom: </Text>
        <View style={styles.inputView}>
          <Icon style={styles.inputIcon} name="edit" size={24} color="red" />
          <TextInput
            style={styles.TextInput}
            placeholder="Prénom"
            placeholderTextColor="#000f00"
            value={prenom}
            onChangeText={(text) => setPrenom(text)}
          />

        </View>
      </View>
      <View style={styles.inputlabel}>
        <Text style={styles.TextLabel}>CIN: </Text>
        <Icon style={styles.inputIcon} name="edit" size={24} color="red" />

        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="CIN"
            placeholderTextColor="#000f00"
            value={cin}
            onChangeText={(text) => setCin(text)}
          />

        </View>
      </View>
      <View style={styles.inputlabel}>
        <Text style={styles.TextLabel}>Num: </Text>
        <View style={styles.inputView}>
          <Icon style={styles.inputIcon} name="edit" size={24} color="red" />
          <TextInput
            style={styles.TextInput}
            placeholder="Numéro de téléphone"
            placeholderTextColor="#000f00"
            value={numTel}
            onChangeText={(text) => setNumTel(text)}
          />
        </View>
      </View>
      {user?.data().role === "chauffeur" && (
        <View style={styles.inputlabel}>
          <Text style={styles.TextLabel}>Id: </Text>
          <View style={styles.inputView}>
            <Icon style={styles.inputIcon} name="edit" size={24} color="red" />

            <TextInput
              style={styles.TextInput}
              placeholder="Identifiant unique"
              placeholderTextColor="#000f00"
              value={IdentifiantUnique}
              onChangeText={(text) => setIdentifiantUnique(text)}
            />
          </View>
        </View>
      )}

      <View style={styles.bott}>
        <TouchableOpacity
          onPress={handleMetreAJour}
          style={styles.buttonupdate}
        >
          <Text style={styles.buttonTextupdate}>Mettre à jour </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => showConfirmDialog("Reintiliaser le mot de passe")}
        >
          <Text style={styles.buttonTextInscrit}>
            Reintiliaser le mot de passe{" "}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.buttonTextInscrit}>Déconnexion </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => showConfirmDialog("supprimer le compte")}
        >
          <Text style={styles.buttonTextInscrit}>supprimer le compte </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bott: {
    width: "100%",
    flexDirection: "column",
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    width: "90%",
    flexWrap: "wrap",

    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  blok: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  textchange: {
    color: "#078282",
    fontSize: 30,
    fontWeight: "bold",
    alignItems: "flex-start",
  },
  inputView: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "75%",
  },
  inputlabel: {
    flexDirection: "row",
    backgroundColor: "#E9F1F1",
    borderRadius: 10,
    alignItems: "center",
    width: "90%",
    marginBottom: 10,
  },
  TextLabel: {
    color: "#178A8A",
    fontSize: 15,
    marginRight: 10,
    marginLeft: 10,
    width: "20%",
  },
  TextInput: {
    fontSize: 15,
    height: 50,
    color: "black",
    width: "100%",
  },
  inputIcon: {
    width: 40,
    position: "absolute",
    right: 0,

    fontSize: 30,
    color: "#71A3A3",
    opacity: 0.5,
  },
  buttonInscrit: {
    width: "90%",
    maxWidth: "45%",
    height: 50,
    backgroundColor: "#2DBDBD",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  buttonTextInscrit: {
    color: "#71A3A3",
    fontSize: 18,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  buttonupdate: {
    width: "90%",
    maxWidth: "45%",
    height: 50,
    backgroundColor: "#2DBDBD",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    marginBottom: 25,
  },
  buttonTextupdate: {
    color: "white",
    fontSize: 18,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
});
