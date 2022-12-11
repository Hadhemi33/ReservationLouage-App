import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { db, auth } from "../firebase";

import DateTimePicker from "@react-native-community/datetimepicker";

export default function ModifierOffre({ route, navigation }) {
  const { offr } = route.params;

  const [datePicker, setDatePicker] = useState(false);
  const [date, setDate] = useState(new Date(offr.data().date.seconds * 1000));
  const [timePicker, setTimePicker] = useState(false);
  // à corriger
  const [time, setTime] = useState(new Date(offr.data().heure.seconds * 1000));

  function showDatePicker() {
    setDatePicker(true);
  }
  function showTimePicker() {
    setTimePicker(true);
  }

  function onDateSelected(event, value) {
    setDate(value);
    setDatePicker(false);
  }
  function onTimeSelected(event, value) {
    setTime(value);
    setTimePicker(false);
  }

  const [depart, setDepart] = useState(offr.data().depart);
  const [arrivee, setArrivee] = useState(offr.data().arrivee);
  const [prix, setPrix] = useState(offr.data().prix);
  const [places, setPlaces] = useState(offr.data().places);

  const handleModifier = () => {
    db.collection("offres")
      .doc(offr.id)
      .update({
        date: date,
        heure: time,
        depart: depart,
        arrivee: arrivee,
        prix: prix,
        places: places,
      })
      .then(() => {
        alert("Offre modifiée avec succès");
        navigation.replace("Accueil");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSupprimer = () => {
    db.collection("offres")
      .doc(offr.id)
      .delete()
      .then(() => {
        alert("Offre supprimée avec succès");
        navigation.replace("Accueil");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const s = require("../styles/Style");

  return (
    <View style={styles.container}>
      <View style={styles.inputView}>
        <View style={styles.inputlabel}>
          <Text style={styles.TextLabel}>Depart: </Text>
          <TextInput
            style={styles.inputText}
            placeholder="Depart..."
            placeholderTextColor="#003f5c"
            value={depart}
            onChangeText={(text) => setDepart(text)}
          />
        </View>
        <View style={styles.inputlabel}>
          <Text style={styles.TextLabel}>Destination : </Text>
          <TextInput
            style={styles.inputText}
            placeholder="Destination..."
            placeholderTextColor="#003f5c"
            value={arrivee}
            onChangeText={(text) => setArrivee(text)}
          />
        </View>
        {/* date */}

        {datePicker && (
          <DateTimePicker
            value={date}
            mode={"date"}
            display= {"default"}
            is24Hour={true}
            onChange={onDateSelected}
            minimumDate={new Date()}
            maximumDate={new Date(2023, 11, 31)}

            style={styles.datePicker}
          />
        )}
        {!datePicker && (
          <View style={{ margin: 5 }}>
            <TouchableOpacity
              title="Show Date Picker"
              conPress={showDatePicker}
            />
          </View>
        )}
        <View style={styles.inputlabel}>
          <Text style={styles.TextLabel}>Date : </Text>
          <TouchableOpacity onPress={showDatePicker}>
            <Text
              style={styles.inputText}
              placeholder="Date..."
              placeholderTextColor="#003f5c"
            >
              {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Heure */}
        {timePicker && (
          <DateTimePicker
            value={time}
            mode={"time"}
            display={ "default"}
            is24Hour={false}
            onChange={onTimeSelected}
              minuteInterval={5}
            style={styles.datePicker}
          />
        )}
        {!timePicker && (
          <View style={{ margin: 5 }}>
            <TouchableOpacity
              title="Show Time Picker"
              color="green"
              onPress={showTimePicker}
            />
          </View>
        )}
        <View style={styles.inputlabel}>
          <Text style={styles.TextLabel}>Heure: </Text>
          <TouchableOpacity onPress={showTimePicker}>
            <Text
              style={styles.inputText}
              placeholder="Heure..."
              placeholderTextColor="#003f5c"
            >
              {time.getHours()}:{time.getMinutes()}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.inputlabel}>
          <Text style={styles.TextLabel}>Prix : </Text>

          <TextInput
            style={styles.inputText}
            placeholder="Prix..."
            placeholderTextColor="#003f5c"
            value={prix}
            onChangeText={(text) => setPrix(text)}
          />
        </View>
        <View style={styles.inputlabel}>
          <Text style={styles.TextLabel}>Nombre des places : </Text>

          <TextInput
            style={styles.inputText}
            placeholder="Nombre des places"
            placeholderTextColor="#003f5c"
            value={places}
            onChangeText={(text) => setPlaces(text)}
          />
        </View>
      </View>

      <TouchableOpacity onPress={handleModifier} style={styles.buttonInscrit}>
        <Text style={s.buttonTextInscrit}>Modifer </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSupprimer} style={styles.buttonInscrit}>
        <Text style={s.buttonTextInscrit}>supprimer </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  TextLabel: {
    color: "#178A8A",
    fontSize: 14,
    marginRight: 10,
  },
  inputlabel: {
    flexDirection: "row",
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 5,
    marginBottom: 15,
    alignItems: "center",
  },
  inputView: {
    width: "90%",
  },
  inputText: {
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
  buttonInscrit: {
    backgroundColor: "#2DBDBD",
    width: "80%",
    padding: 15,
    borderRadius: 10,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 10,
  },
});
