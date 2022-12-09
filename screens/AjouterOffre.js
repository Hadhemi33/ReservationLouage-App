import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
} from "react-native";

import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import { db, auth } from "../firebase";

import { NavigationContainer } from "@react-navigation/native";

import DateTimePicker from "@react-native-community/datetimepicker";

export default function AjouterOffre() {
  const [datePicker, setDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());

  const [timePicker, setTimePicker] = useState(false);
  const [time, setTime] = useState(new Date(Date.now()));

  const [timeArriveePicker, setTimeArriveePicker] = useState(false);
  const [timeArrivee, setTimeArrivee] = useState(new Date(Date.now()));

  function showDatePicker() {
    setDatePicker(true);
  }
  function showTimePicker() {
    setTimePicker(true);
  }
  function showTimeArriveePicker() {
    setTimeArriveePicker(true);
  }

  function onDateSelected(event, value) {
    setDate(value);
    setDatePicker(false);
  }
  function onTimeSelected(event, value) {
    setTime(value);
    setTimePicker(false);
  }
  function onTimeArriveeSelected(event, value) {
    setTimeArrivee(value);
    setTimeArriveePicker(false);
  }

  const navigation = useNavigation();

  const [heure, setHeure] = useState("");
  const [depart, setDepart] = useState("");
  const [arrivee, setArrivee] = useState("");
  const [prix, setPrix] = useState("");
  const [places, setPlaces] = useState();
  const [chauffeurID, setChauffeurID] = useState("");
  const [chauffeurNom, setChauffeurNom] = useState("");

  useEffect(() => {
    db.collection("users")
      .doc(auth?.currentUser.uid)
      .get()
      .then((doc) => {
        setChauffeurID(doc.data().Identifiantunique);
      });
  }, []);
  useEffect(() => {
    db.collection("users")
      .doc(auth?.currentUser.uid)
      .get()
      .then((doc) => {
        setChauffeurNom(doc.data().nom);
      });
  }, []);

  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    db.collection("offres")
      .add({
        chauffeurID,
        chauffeur: chauffeurNom,
        date:
          date.getDate() +
          "/" +
          (date.getMonth() + 1) +
          "/" +
          date.getFullYear(),
        heure:
          time.getHours() +
          ":" +
          time.getMinutes() +
          ":" +
          time.getSeconds() +
          ":" +
          time.getMilliseconds(),
        heureArrivee:
          timeArrivee.getHours() +
          ":" +
          timeArrivee.getMinutes() +
          ":" +
          timeArrivee.getSeconds() +
          ":" +
          timeArrivee.getMilliseconds(),
        depart,
        arrivee,
        prix,
        places,
      })
      .then(() => {
        setAdded(!added);
        navigation.replace("Accueil");
        alert("Offre ajoutée avec succès");
      })
      .catch((error) => {
        alert(error);
      });
  };

  const s = require("../styles/Style");
  return (
    <NavigationContainer independent={true}>
      <View style={styles.container}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Depart..."
            placeholderTextColor="#003f5c"
            value={depart}
            onChangeText={(text) => setDepart(text)}
          />

          <TextInput
            style={styles.inputText}
            placeholder="Destination..."
            placeholderTextColor="#003f5c"
            value={arrivee}
            onChangeText={(text) => setArrivee(text)}
          />

          {/* date */}
          {datePicker && (
            <DateTimePicker
              value={date}
              mode={"date"}
              display={Platform.OS === "ios" ? "spinner" : "default"}
              is24Hour={true}
              onChange={onDateSelected}
              style={styles.datePicker}
            />
          )}
          {!datePicker && (
            <View style={{ margin: 10 }}>
              <TouchableOpacity
                title="Show Date Picker"
                conPress={showDatePicker}
              />
            </View>
          )}
          <TouchableOpacity onPress={showDatePicker}>
            <Text
              style={styles.inputText}
              placeholder="Date..."
              placeholderTextColor="#003f5c"
            >
              {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}
            </Text>
          </TouchableOpacity>

          {/* Heure */}
          {timePicker && (
            <DateTimePicker
              value={time}
              mode={"time"}
              display={Platform.OS === "ios" ? "spinner" : "default"}
              is24Hour={false}
              onChange={onTimeSelected}
              style={styles.datePicker}
            />
          )}
          {!timePicker && (
            <View style={{ margin: 10 }}>
              <TouchableOpacity
                title="Show Time Picker"
                color="green"
                onPress={showTimePicker}
              />
            </View>
          )}
          <TouchableOpacity onPress={showTimePicker}>
            <Text
              style={styles.inputText}
              placeholder="Heure..."
              placeholderTextColor="#003f5c"
            >
              {time.getHours()}:{time.getMinutes()}
            </Text>
          </TouchableOpacity>

          {/* ///////// */}
          {/* Heure */}
          {timeArriveePicker && (
            <DateTimePicker
              value={timeArrivee}
              mode={"time"}
              display={Platform.OS === "ios" ? "spinner" : "default"}
              is24Hour={false}
              onChange={onTimeArriveeSelected}
              style={styles.datePicker}
            />
          )}
          {!timeArriveePicker && (
            <View style={{ margin: 10 }}>
              <TouchableOpacity
                title="Show Time Picker"
                color="green"
                onPress={showTimeArriveePicker}
              />
            </View>
          )}
          <TouchableOpacity onPress={showTimeArriveePicker}>
            <Text
              style={styles.inputText}
              placeholder="Heure Depart"
              placeholderTextColor="#003f5c"
            >
              {timeArrivee.getHours()}:{timeArrivee.getMinutes()}
            </Text>
          </TouchableOpacity>

          <TextInput
            style={styles.inputText}
            placeholder="Prix..."
            placeholderTextColor="#003f5c"
            value={prix}
            onChangeText={(text) => setPrix(text)}
          />

          <TextInput
            style={styles.inputText}
            placeholder="Nombre des places"
            placeholderTextColor="#003f5c"
            value={places}
            onChangeText={(text) => setPlaces(text)}
          />
        </View>

        <TouchableOpacity onPress={handleAdd} style={s.buttonInscrit}>
          <Text style={s.buttonTextInscrit}>Publier </Text>
        </TouchableOpacity>
      </View>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
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
    marginBottom: 15,
    fontSize: 14,
  },
  buttonBack: {
    backgroundColor: "transparent",
    padding: 10,
    color: "white",
    fontWeight: "bold",
    position: "absolute",
    left: 10,
    top: 30,
  },
  buttonBackText: {
    color: "black",
    fontSize: 30,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  identity: {
    fontSize: 50,
    left: "650%",
    top: "5%",
    color: "black",
  },
  barre: {
    width: "100%",
    height: 100,
    top: -86,
  },
  UserMenu: {
    justifyContent: "center",
  },

  nameuser: {
    color: "red",
  },
  MainContainer: {
    flex: 1,
    padding: 6,
    alignItems: "center",
    backgroundColor: "white",
  },

  text: {
    fontSize: 25,
    color: "red",
    padding: 3,
    marginBottom: 10,
    textAlign: "center",
  },

  // Style for iOS ONLY...
  datePicker: {
    justifyContent: "center",
    alignItems: "flex-start",
    width: 320,
    height: 260,
    display: "flex",
  },
});
