import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import { auth, db } from "../firebase";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Input,
  Alert,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import "react-native-gesture-handler";
import Checkbox from "expo-checkbox";
import Menu from "./Menu";
import { lastChild } from "@react-native-material/core";

export default function Accueil() {
  const s = require("../styles/Style");
  const navigation = useNavigation();
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const handleMenu = () => {

    navigation.navigate("ChangeInfo");

  };

  const [loading, setLoading] = useState(true);
  const [offres, setOffres] = useState([]);

  useEffect(() => {

    auth?.currentUser?.reload();

  }, []);
  useEffect(() => {
    setOffres([]);
    db.collection("offres")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setOffres((offres) => [...offres, doc]);
          setLoading(false);
        });
      });
  }, []);

  const [user, setUser] = useState(null);
  useEffect(() => {
    db.collection("users")
      .doc(auth?.currentUser?.uid)
      .get()
      .then((doc) => {
        setUser(doc.data());
      });
  }, []);

  const [searchText, setSearchText] = useState("");

  const handleAlertConnecter = () => {
    return Alert.alert("Vous devez connecter  d'abords ", " Voulez vous connecter? ", [
      // The "Yes" button
      {
        text: "Oui",
        onPress: () => {
          navigation.replace("Home");
        },
      },
      // The "No" button
      // Does nothing but dismiss the dialog when tapped
      {
        text: "Non",
      },
    ]);
  };

  React.useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <Text></Text>,
      headerRight: () =>
        auth?.currentUser?.email ? (
          <TouchableOpacity
            style={styles.headerRight}
            onPress={handleMenu}
            title="Menu"
          >
            <Text style={styles.buttonBackText}>
              {auth?.currentUser?.displayName
                ? auth?.currentUser?.displayName
                : "Unknown"}
            </Text>
            <Text>
              <MaterialIcons
                style={styles.identity}
                name="account-circle"
              ></MaterialIcons>{" "}
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.headerRight}
            onPress={handleAlertConnecter}
            title="Alert connecter"
          >
            <Text>
              <MaterialIcons
                style={styles.identity}
                name="account-circle"
              ></MaterialIcons>{" "}
            </Text>
          </TouchableOpacity>
        ),
    });
  }, [navigation]);
  const [isChecked, setChecked] = useState(false);

  return (
    <View style={[s.container]}>
      {/* chercher et filtrer  */}
      <View style={styles.chercher}>
        <View style={styles.search}>
          <MaterialIcons style={styles.icon} name="search" />
          <TextInput
            style={styles.input}
            placeholder="Chercher"
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
          />
        </View>
        <View style={styles.filtre}>
          {user?.role == "chauffeur" && (
            <View style={styles.filtreOffre}>
              <Checkbox
                style={styles.checkbox}
                value={isChecked}
                onValueChange={setChecked}
                color={isChecked ? "#4630EB" : undefined}
              />
              <Text style={styles.textFiltre}> Mes offres </Text>
            </View>
          )}


        </View>
      </View>

      {/* Liste  des offres  */}
      <View style={styles.bloc1}>
        {/* ////////////////////////////////////////////////////////// */}
        <ScrollView style={styles.scrollView}>

          {!loading ? (
            offres
              .filter((offre) => {
                {
                  /* pour filter les offres chaque fois offre ->  */
                }
                return (
                  offre
                    .data()
                    .depart.toLowerCase()
                    .includes(searchText.toLowerCase()) ||
                  offre
                    .data()
                    .arrivee.toLowerCase()
                    .includes(searchText.toLowerCase())
                );
              })
              .filter((offre) => {
                return isChecked
                  ? offre.data().chauffeurID == user?.Identifiantunique
                  : true;
              })
              .map((off) =>
              (
                <View style={styles.offre} key={off.id}>
                  <View style={styles.offreheader}>
                    <MaterialIcons
                      style={styles.iconCar}
                      name="directions-car"
                    ></MaterialIcons>
                    {/* date ili 7atha chauffeur  */}
                    <Text style={styles.textDate}>

                      {new Date(off.data().date.seconds * 1000).getDate()}/
                      {new Date(off.data().date.seconds * 1000).getMonth() + 1}/
                      {new Date(off.data().date.seconds * 1000).getFullYear()}

                    </Text>
                    <View style={styles.offreChauffeur}>
                      <MaterialIcons
                        style={styles.iconCar}
                        name="supervisor-account"
                      ></MaterialIcons>
                      <Text style={styles.textPrix}>{off.data().places}</Text>
                    </View>
                  </View>
                  <View style={styles.offrebody}>
                    <View style={styles.ligne}>
                      <Text style={styles.textDepart}>

                        {new Date(off.data().heure.seconds * 1000).getHours()}:
                        {new Date(off.data().heure.seconds * 1000).getMinutes()}


                      </Text>
                      <View
                        style={{
                          flex: 0.75,
                          height: 1.5,
                          backgroundColor: "black",
                        }}
                      />

                      <Text style={styles.textDepart}>

                        {new Date(off.data().heureArrivee?.seconds * 1000).getHours()}:
                        {new Date(off.data().heureArrivee?.seconds * 1000).getMinutes()}


                      </Text>
                    </View>

                    <View style={styles.ligne2}>
                      <Text style={styles.tempsDepart}>
                        {off.data().depart}
                      </Text>
                      <Text style={styles.tempsArrive}>
                        {off.data().arrivee}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.offrefooter}>
                    <View style={styles.ligne3}>
                      <View style={styles.ChaufNom}>
                        <MaterialIcons
                          style={styles.iconChauffeur}
                          name="account-circle"
                        ></MaterialIcons>
                        <Text style={styles.textChauffeur}>
                          {off.data().chauffeur}
                        </Text>
                      </View>

                      <View style={styles.offreChauffeur}>
                        <MaterialIcons
                          style={styles.iconChauffeur}
                          name="payments"
                        ></MaterialIcons>
                        <Text style={styles.textPrix}>{off.data().prix}</Text>
                        <Text> DT</Text>
                      </View>
                    </View>

                    <View style={styles.buttonContainer}>
                      {user?.role == "chauffeur" &&
                        user?.Identifiantunique === off?.data().chauffeurID && (
                          <View style={{flexDirection:'row'}}>
                            <TouchableOpacity
                              onPress={() =>
                                navigation.navigate("ModifierOffre", {
                                  offr: off,
                                })
                              }
                              style={styles.button}
                            >
                              <Text style={styles.buttonText}>Modifier</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              onPress={() =>
                                navigation.navigate("ListReservationChauffeur", {
                                  offr: off.id,
                                })
                              }
                              style={[styles.button,{marginLeft:5}]}
                            >
                              <Text style={styles.buttonText}>Réservations </Text>
                            </TouchableOpacity>
                          </View>



                        )}
                      {user?.role == "chauffeur" &&
                        user?.Identifiantunique !== off.data().chauffeurID && (
                          <TouchableOpacity
                            onPress={() =>
                              navigation.navigate("detailOffre", {
                                offr: off.data(),
                                role : user?.role
                              })
                            }
                            style={styles.button}
                          >
                            <Text style={styles.buttonText}>Consulter</Text>
                          </TouchableOpacity>

                        )}
                      {user?.role == "client" && (
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate("detailOffre", {
                              offr: off.data(),
                            })
                          }
                          style={styles.button}
                        >
                          <Text style={styles.buttonText}>Réserver</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                </View>
              ))
          ) : (
            <ActivityIndicator size="large" style={s.loading} color="#078282" />
          )}

          <View style={styles.blankView}>

          </View>
        </ScrollView>
      </View>
      <Menu role={user?.role} />

    </View>
  );
}
const styles = StyleSheet.create({
  blankView: {
    height: 40,
  },
  connect: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  iconBack: {
    fontSize: 15,
    marginRight: 10,
    color: "#078282",
  },
  filtre: {
    flexDirection: "column",
  },
  checkbox: {
    marginRight: 10,
  },
  addIcon: {
    marginRight: 10,
    fontSize: 20,
  },
  Textconnect: {
    color: "#078282",
    fontSize: 15,
    fontWeight: "bold",
  },
  filtreOffre: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  textFiltre: {
    fontSize: 15,
  },
  search: {
    flexDirection: "row",
    alignItems: "center",
    width: "60%",
  },
  //barre de menu

  btnBack: {
    fontSize: 25,
    marginTop: 15,
    marginLeft: 10,
    color: "#fff",
  },
  buttonBackText: {
    fontSize: 20,
    marginTop: 15,
    marginLeft: 10,
    color: "#fff",
  },

  nameuser: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
    left: 270,
    top: "80%",
  },
  user: {
    backgroundColor: "red",
  },

  identity: {
    fontSize: 50,
    left: "650%",
    top: "50%",
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
  //chercher et filtrer
  chercher: {
    flexDirection: "row",
    width: "100%",
    height: 60,
    marginTop: 10,
    left: 0,
    top: -50,
    alignItems: "center",
    justifyContent: "flex-start",
  },

  icon: {
    position: "absolute",
    fontSize: 30,
    left: 180,
    top: 7,
    zIndex: 1,
    color: "#000",
    justifyContent: "center",
  },
  iconCar: {
    fontSize: 30,
    marginLeft: 20,
    color: "#000",
  },
  input: {
    width: 210,
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#000",
    marginLeft: 20,
    paddingLeft: 10,
  },

  //liste d'offre
  bloc1: {
    
    flex: 5,
    width: "100%",
    height: "100%",
  },
  scrollView: {
    marginHorizontal: 20,
  },

  offre: {
    fontSize: 42,

    borderRadius: 20,
    marginBottom: 30,
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#66D9D9",
    borderLeftWidth: 7,
  },
  textOffre: {
    fontSize: 20,
    color: "black",
    padding: 20,
  },
  buttonText: {
    fontSize: 15,
    color: "#078282",
    textAlign: "center",
    justifyContent: "center",
  },
  offreheader: {
    paddingRight: 10,
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  //space-between

  textDate: {
    fontSize: 20,
    marginLeft: 10,
    color: "black",
    alignItems: "center",
    justifyItems: "center",
  },
  ligne: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  iconLigne: {
    fontSize: 10,
    marginLeft: 10,
    marginRight: 10,
    color: "black",
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
  textDepart: {
    fontSize: 15,
    color: "black",
    marginLeft: 10,
    marginRight: 10,
  },
  ligne3: {
    flexDirection: "column",
  },
  offreChauffeur: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center",

  },
  offrefooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    justifyItems: "center",
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
  },

  button: {
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 7,
    borderRadius: 10,
    alignItems: "flex-end",
    height: "auto",
    borderEndWidth: 3,
    borderBottomWidth: 3,
    borderColor: "#2DBDBD",
  },
  buttonContainer: {
    marginRight: 20,
  },
  headerRight: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
  },
});
