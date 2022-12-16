import React, { useState } from "react";

import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,

} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { icon } from "@fortawesome/fontawesome-svg-core";

export default function Accueil({ route, navigation }) {
  // const navigation = useNavigation();

  const { offr } = route.params;

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

  console.log(`../assets/${offr.depart}-${offr.arrivee}.jpg`);

  const handleSelect = () => {
    alert("Pas encore implementé");
  };
  const s = require("../styles/Style");

  return (
    <View style={s.container}>
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
            {/* date ili 7atha chauffeur  */}
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
            </View>

            <View style={styles.buttonContainer}>
              {parseInt(offr.places) > 0 ? (
                <TouchableOpacity onPress={handleSelect} style={styles.button}>
                  <Text style={styles.buttonText}>Réserver</Text>
                </TouchableOpacity>
              ) : (
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
  // identity: {
  //   fontSize: 50,

  //   left: "650%",
  //   top: "10%",
  //   color: "#fff",
  // },
  user: {
    flexDirection: "row",
    //space between
    justifyContent: "space-between",
  },
  // nameuser: {
  //   color: "#fff",
  //   fontSize: 15,
  //   fontWeight: "bold",
  //   left: 100,
  //   top: "60%",
  // },

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
    marginTop: 20,
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
    marginTop: 30,
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
