import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  Modal,
  TextInput

} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Slider } from '@miblanchard/react-native-slider';

export default function Accueil({ route, navigation }) {
  // const navigation = useNavigation();

  const { offr } = route.params;
  const { role } = route.params;
  const [modalVisible, setModalVisible] = useState(false);

  const Test = () => {
    if (offr.depart == "Salakta") {
      if (offr.arrivee == "Tunis") {
        return (
          <Image
            style={styles.image}
            source={require("../assets/Salakta-Tunis.jpg")}
          />
        );
      } else if (offr.arrivee == "Elguettar") {
        return (
          <Image
            style={styles.image}
            source={require("../assets/Salakta-Elguettar.jpg")}
          />
        );
      } else if (offr.arrivee == "Metlaoui") {
        return (
          <Image
            style={styles.image}
            source={require("../assets/Salakta-Metlaoui.jpg")}
          />
        );
      }
    }
    else if (offr.depart == "Metlaoui") {
      if (offr.arrivee == "Tunis") {
        return (
          <Image
            style={styles.image}
            source={require("../assets/Metlaoui-Tunis.jpg")}
          />
        );
      } else if (offr.arrivee == "Elguettar") {
        return (
          <Image
            style={styles.image}
            source={require("../assets/Metlaoui-ELguettar.jpg")}
          />
        );
      } else if (offr.arrivee == "Salakta") {
        return (
          <Image
            style={styles.image}
            source={require("../assets/Metlaoui-Salakta.jpg")}
          />
        );
      }
    }
    else if (offr.depart == "Elguettar") {
      if (offr.arrivee == "Tunis") {
        return (
          <Image

            style={styles.image}
            source={require("../assets/Elguettar-Tunis.jpg")}
          />
        );
      } else if (offr.arrivee == "Metlaoui") {
        return (
          <Image
            style={styles.image}
            source={require("../assets/Elguettar-Metlaoui.jpg")}
          />
        );
      } else if (offr.arrivee == "Salakta") {
        return (
          <Image
            style={styles.image}
            source={require("../assets/Elguettar-Salakta.jpg")}
          />
        );
      }
    }
    else if (offr.depart == "Tunis") {
      if (offr.arrivee == "Elguettar") {
        return (
          <Image
            style={styles.image}
            source={require("../assets/Tunis-Elguettar.jpg")}
          />
        );
      } else if (offr.arrivee == "Metlaoui") {
        return (
          <Image
            style={styles.image}
            source={require("../assets/Tunis-Metlaoui.jpg")}
          />
        );
      } else if (offr.arrivee == "Salakta") {
        return (
          <Image
            style={styles.image}
            source={require("../assets/Tunis-Salakta.jpg")}
          />
        );
      }
    }

    else {
      return (
        <MaterialIcons
          style={styles.icon}
          name="not-listed-location"
        ></MaterialIcons>

      );
    }
  };
  const [offreId, setOffreId] = useState("")

  useEffect(() => {
    db.collection("offres").where("depart", "==", offr.depart).where("chauffeur", "==", offr.chauffeur).where("arrivee", "==", offr.arrivee).where("date", "==", offr.date).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setOffreId(doc.id)
        console.log(doc.id)
      });
    });
  }, [])

  const handleSelect = () => {
    if (addresse.length < 5) {
      alert("Veuillez saisir votre addresse")
      return;
    }
    if (nbplaces < 1) {
      alert("Veuillez choisir le nombre de places")
      return;
    }
      db.collection("reservations").add({
        chauffeur: offr.chauffeurID,
        dateOffre: offr.date,
        heureOffre: offr.heure,
        depart: offr.depart,
        arrivee: offr.arrivee,
        nbplaces: nbplaces,
        addresse: addresse,
        clientPhone: auth.currentUser.photoURL,
        clientName: auth.currentUser.displayName,
        etat: 'En attente',
        offreId: offreId,
        dateReservation: new Date()

      }).then(() => {
        alert("Reservation effectuée avec succès");
        setModalVisible(!modalVisible);
        navigation.replace("AccueilStack"
        , {role: role}
        );
      }).catch((error) => {
        alert(error.message);
      }
      );
   




  };
  const s = require("../styles/Style");
  const [nbplaces, setNbplaces] = useState(0);
  const [addresse, setAddresse] = useState("");
  return (
    <View style={s.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={styles.buttonClose}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <MaterialIcons size={40} color='red' >
                close
              </MaterialIcons>
            </TouchableOpacity>
            <Text style={styles.modalText}>Réservation : </Text>
            <Text style={styles.modalText}>Votre address</Text>
            <TextInput
              multiline
              numberOfLines={4}
              type="text" name="address"
              value={addresse}
              onChangeText={text => setAddresse(text)}
              style={{
                width: "80%", height: 80, borderWidth: 1, borderColor: "black", borderRadius: 10
              }} />
            <View>
              <Text style={styles.modalText}>Nombre de places :</Text>
              <View style={styles.modalLigne}  >

                <Slider
                  minimumValue={1}
                  maximumValue={offr.places}
                  step={1}
                  trackStyle={{ width: 200, height: 10, borderRadius: 5 }}
                  minimumTrackTintColor="cyan"
                  maximumTrackTintColor="gray"
                  thumbTintColor="white"
                  thumbStyle={{ height: 30, width: 30, borderRadius: 15, borderColor: 'black', borderWidth: 1 }}
                  value={nbplaces}
                  onValueChange={value => setNbplaces(value)}
                />
                <Text> {nbplaces} </Text>
              </View>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSelect}>
              <Text style={styles.textStyle}>Réserver</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>


      <View style={styles.afficheMap}>

        {Test()}

      </View>
      <View style={styles.Details}>
        <View style={styles.offre}>
          <View style={styles.offreheader}>
            <MaterialIcons
              style={styles.iconCar}
              name="directions-car"
            ></MaterialIcons>
            <Text style={styles.textDate}>
              {new Date(offr.date.seconds * 1000).getDate()}/
              {new Date(offr.date.seconds * 1000).getMonth() + 1}/
              {new Date(offr.date.seconds * 1000).getFullYear()}
            </Text>
          </View>
          <View style={styles.offrefooter}>
            <View style={styles.ligne3}>
              <View style={styles.ChaufNom}>
                <MaterialIcons
                  style={styles.iconChauffeur}
                  name="account-circle"
                ></MaterialIcons>
                <Text style={styles.textChauffeur}>{offr.chauffeur}</Text>
              </View>
              <View style={styles.offreChauffeur}>
                <MaterialIcons
                  style={styles.iconChauffeur}
                  name="payments"
                ></MaterialIcons>
                <Text style={styles.textPrix}>{offr.prix}</Text>
                <Text> DT</Text>
              </View>
              <View style={styles.offreChauffeur}>
                <MaterialIcons
                  style={styles.iconChauffeur}
                  name="supervisor-account"
                ></MaterialIcons>
                <Text style={styles.textPrix}>{offr.places}</Text>
                <Text> /8</Text>
              </View>
            </View>

            <View style={styles.buttonContainer}>
              {parseInt(offr.places) > 0 ?
                role != 'chauffeur' ?
                  <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.button}>
                    <Text style={styles.buttonText}>Réserver</Text>
                  </TouchableOpacity>
                  : null

                : (
                  <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Complet</Text>
                  </TouchableOpacity>
                )}
            </View>
          </View>
          <View style={styles.offrebody}>
            <View style={styles.ligne}><Text>
              {new Date(offr.heure.seconds * 1000).getHours()}:
              {new Date(offr.heure.seconds * 1000).getMinutes()}
            </Text>
              <View
                style={{ flex: 0.75, height: 1.5, backgroundColor: "black" }}
              />
              <Text>

                {new Date(offr.heure.seconds * 1000).getHours()}:
                {new Date(offr.heure.seconds * 1000).getMinutes()}
              </Text>
            </View>

            <View style={styles.ligne2}>
              <Text style={styles.tempsDepart}>{offr.depart}</Text>
              <Text style={styles.tempsArrive}>{offr.arrivee}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalLigne: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "80%",
  },
  modalText: {
    marginBottom: 15,
    fontSize: 20,
    color:"#078282",
    fontWeight: "bold",
    textAlign: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: "60%",
    width: "85%",

  },
  btnBack: {
    fontSize: 25,
    marginTop: 15,
    marginLeft: 10,
    color: "#fff",
  },
  buttonBackText: {
    fontSize: 25,
    marginTop: 15,
    marginLeft: 10,
    color: "#fff",
  },

  barre: {
    alignContent: "center",
    flex: 1,
    width: "100%",
    height: 100,
    left: 0,
    top: -60,
  },
  nameuser: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
    left: 270,
    top: "80%",
  },

  identity: {
    fontSize: 50,
    left: "650%",
    top: "50%",
    color: "#fff",
  },
 
  user: {
    flexDirection: "row",
    //space between
    justifyContent: "space-between",
  },
 

  Details: {
    flex: 2,
    width: "90%",

    backgroundColor: "white",
    justifyContent: "center",
  },
  offre: {
    fontSize: 42,
    marginTop: 10,

    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#66D9D9",
    borderLeftWidth: 7,
  },
  offreheader: {
    flexDirection: "row",
    marginTop: 10,
  },
  iconCar: {
    fontSize: 30,
    marginLeft: 20,
    color: "#000",
  },
  textDate: {
    fontSize: 20,
    color: "black",
    alignItems: "center",
    justifyItems: "center",
    marginLeft: 100,
  },
  offrebody: {
    flexDirection: "column",
    marginTop: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  ligne2: {
    width: 200,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  ligne: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  textDepart: {
    fontSize: 15,
    color: "black",
    marginLeft: 10,
    marginRight: 10,
  },
  offrefooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    justifyItems: "center",
  },
  ligne3: {
    flexDirection: "column",
  },
  ChaufNom: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  iconChauffeur: {
    fontSize: 20,
    marginLeft: 10,
    marginRight: 10,
    color: "black",
  },
  offreChauffeur: {
    flexDirection: "row",
    marginTop: 10,
  },
  buttonContainer: {
    marginRight: 20,
  },
  buttonClose: {
    position: "absolute",
    left: 0,
    borderRadius: 20,
    padding: 10,
    width: 100,
    height: 50,
  },
  button: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    alignItems: "flex-end",

    height: "auto",
    borderStartWidth: 3,
    borderBottomWidth: 3,
    borderColor: "#2DBDBD",
  },
  buttonText: {
    fontSize: 15,
    color: "#078282",
    textAlign: "center",
    justifyContent: "center",
  },

  image: {
    width: "85%",
    height: "100%",
    borderRadius: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#66D9D9",
    borderEndtWidth: 7,
  },
  afficheMap: {
    flex: 3.5,
    width: "90%",
    height: "100%",

    backgroundColor: "#66D9D9",

    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    fontSize: 200,
    color: "#fff",
  },
});
