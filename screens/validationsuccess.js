
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/core'

import { View, StyleSheet, Image, TouchableOpacity, Text, TextInput } from 'react-native'
import { auth } from '../firebase'
export default function Accueil() {
  const s = require('../styles/Style')
  const navigation = useNavigation()


  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((user) => {
  //     if (user.emailVerified) {

  //       navigation.replace("Accueil");
  //     }
  //     else {
  //       navigation.replace("validationsuccess");
  //     }
  //   });
  //   return unsubscribe;
  // }, [reload]);
  // const[ reload, setReleoad] = React.useState(false)
  const handleEnv = () => {
    auth.currentUser.reload().then(() => {
      if (auth.currentUser.emailVerified) {

        alert("votre compte est vérifié")
        navigation.replace("Accueil");

      }
      else {
        alert("votre compte n'est pas encore vérifié")
        navigation.replace("validationsuccess");
      }
    })

  }
  return (
    <View style={s.container}>



      <View >
        <Image style={style.logo} source={require("../assets/codeverification.png")} ></Image>

      </View>
      <View style={style.TextConf}>
        <Text style={style.TextConfirmation}>Confirmation d’identité  </Text>
      </View>
      <View style={style.Textinfo}>
        <Text style={style.Textinfo1}>Vous avez reçu un mail sur : {"\n"} {auth.currentUser.email} </Text>
      </View>

      <View style={style.buttonEnvoyer0}>
        <TouchableOpacity onPress={handleEnv} style={style.buttonEnvoyer}>
          <Text style={style.buttonTextEnvoyer}>Passer</Text>
        </TouchableOpacity>
      </View>


    </View>
  );
}

const style = StyleSheet.create({
  buttonEnvoyer0: {
    backgroundColor: '#2DBDBD',
    width: "40%",
    padding: 10,
    borderRadius: 10,
    height: 50,
    justifyContent: 'flex-end',
    alignItems: 'center',
    left: 90,
    marginTop: 40,
  },
  buttonTextEnvoyer: {

    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },





  logo: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: "50%",
    marginBottom: 10,
    top: -90,
    height: 272,
    width: 320,
    fontWeight: "bold",
  },
  TextConf: {
    position: 'relative',
    justifyContent: 'flex-start',

    top: -90,
  },

  TextConfirmation: {

    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    color: "#078282",
  },
  Textinfo: {
    position: 'relative',
    justifyContent: 'center',
    top: -90,
    marginBottom: 5,
  },
  Textinfo1: {
    textAlign: "center",
    fontSize: 18,
    color: "black",
    marginBottom: 5,
  },

  inputView: {
    width: '90%'

  },
  inputText: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 14,
  },
})
