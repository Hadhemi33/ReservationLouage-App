import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert
} from "react-native";

import { db } from "../firebase";

import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from '@react-native-picker/picker';

export default function ModifierOffre({ route, navigation }) {
  const { offr } = route.params;

  const [datePicker, setDatePicker] = useState(false);
  const [date, setDate] = useState(new Date(offr.data().date.seconds * 1000));

  const [timePicker, setTimePicker] = useState(false);
  const [time, setTime] = useState(new Date(offr.data().heure.seconds * 1000));


  const [timeArriveePicker, setTimeArriveePicker] = useState(false);
  const [timeArrivee, setTimeArrivee] = useState(new Date(offr.data().heureArrivee.seconds * 1000));

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
        heureArrive: timeArrivee,
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
    Alert.alert(
      "Supprimer l'offre",
      "Voulez-vous vraiment supprimer cette offre ?",
      [
        {
          text: "Annuler",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Supprimer", onPress: () =>

            db.collection("offres")
              .doc(offr.id)
              .delete()
              .then(() => {
                alert("Offre supprimée avec succès");
                navigation.replace("Accueil");
              })
              .catch((error) => {
                console.log(error);
              })
        },
      ],
      { cancelable: false }
    );
  };



  const s = require("../styles/Style");

  const region = [
    { label: "Elguettar", value: "Elguettar" },
    { label: "Metlaoui", value: "Metlaoui" },
    { label: "Salakta", value: "Salakta" },
    { label: "Tunis", value: "Tunis" },
  ];
  return (
    <View style={styles.container}>
      <View style={styles.inputView}>


        <Picker
          style={styles.inputText}
          selectedValue={depart}
          mode="dropdown"
          onValueChange={(itemValue, itemIndex) =>
            setDepart(itemValue)
          }>
          {region.filter((item) => item.value !== arrivee).
            map((item, index) => {
              return (
                <Picker.Item label={item.label} value={item.value} key={index} />
              )
            }
            )}

        </Picker>

        <Picker
          style={styles.inputText}
          selectedValue={arrivee}
          mode="dropdown"
          onValueChange={(itemValue, itemIndex) =>
            setArrivee(itemValue)
          }>
          {region.filter((item) => item.value !== depart).map((item, index) => {
            return (
              <Picker.Item label={item.label} value={item.value} key={index} />
            )
          }
          )}
        </Picker>


        {/* date */}

        {datePicker && (
          <DateTimePicker
            value={date}
            mode={"date"}
            display={"default"}
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
            display={"default"}
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
              placeholder="Heure..."
              placeholderTextColor="#003f5c"
            >
              {time.getHours()}:{time.getMinutes()}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Heure d'arrivée */}

        {timeArriveePicker && (
          <DateTimePicker
            value={timeArrivee}
            mode={"time"}
            display={"default"}
            is24Hour={false}
            minuteInterval={5}
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
        <View style={styles.inputlabel}>
          <Text style={styles.TextLabel}>Heure d'arrivée: </Text>
          <TouchableOpacity onPress={showTimeArriveePicker}>
            <Text
              placeholder="Heure Depart"
              placeholderTextColor="#003f5c"
            >
              {timeArrivee.getHours()}:{timeArrivee.getMinutes()}
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
            keyboardType="numeric"

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
            keyboardType="numeric"

            onChangeText={(text) => setPlaces(text)}
          />
        </View>
      </View>

      <TouchableOpacity onPress={handleModifier} style={styles.buttonModifier}>
        <Text style={styles.buttonModifier}>Modifer </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSupprimer} style={styles.buttonSupprimer}>
        <Text style={styles.buttonSupprimer}>supprimer </Text>
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
  buttonModifier: {
    backgroundColor: "#2DBDBD",
    width: "70%",
    padding: 10,
    borderRadius: 10,
    color: "white",
    alignItems: "center",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 10,
  },
  buttonSupprimer: {
    width: "70%",
    borderRadius: 10,
    alignItems: "center",

    padding: 10,
    backgroundColor: "#FF0000",
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
});
