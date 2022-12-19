"use strict";
import { StyleSheet } from "react-native";

module.exports = StyleSheet.create({
  loading: {
    transform: [{ scale: 4 }],
    height: 200,
    fontSize: 50,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 40,
    height: "100%",
    paddingBottom: 0,
  },
  //button style
  //login
  buttonLogin: {
    alignItems: "center",
    backgroundColor: "#078282",
    padding: 15,
    marginTop: 10,
    width: "60%",
    borderRadius: 15,
    borderColor: "red",
  },
  loginButtonText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
  buttonBlanc: {
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
  },
  buttonsinscrire: {
    alignItems: "center",
    backgroundColor: "white",
    color: "red",
    marginBottom: 20,
    padding: 20,
    width: "90%",
    borderRadius: 15,
  },
  buttonBlancText: {
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
  },
  buttonPasser: {
    position: "absolute",
    right: -5,
    bottom: -100,
  },
  PasserText: {
    fontSize: 13,
    color: "white",
    fontWeight: "bold",
  },
  //button back
  buttonBack: {
    backgroundColor: "transparent",
    padding: 10,
    color: "078282",
    fontWeight: "bold",
    position: "absolute",
    left: 10,
    top: 30,
  },
  buttonBackText: {
    color: "#078282",
    fontSize: 33,
  },

  //logo blasti
  logoView: {
    position: "relative",
    alignItems: "center",
    justifyContent: "flex-start",
    height: "30%",
    top: -90,
    fontWeight: "bold",
    marginBottom: 50,
  },
  logo: {
    height: 250,
    width: 250,
    resizeMode: "contain",
  },
  logoblasti: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#C7C0C0",
    //drop shadow
    textShadowColor: "#078282",
    textShadowOffset: { width: -2, height: 3 },
    textShadowRadius: 5,
    marginBottom: 10,
    marginTop: 0,
  },
  logoDesc: {
    fontSize: 20,
    color: "#213502",
    marginBottom: 10,
    marginTop: 0,
  },

  //baground image

  linearGradient: {
    height: "114.5%",
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  //chauffeur client inscrit
  headerView: {
    // flex: 0.15,
    top: -15,
    fontWeight: "bold",
  },

  TextInscrit: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    color: "#078282",
  },
  TextbienvInscrit: {
    fontSize: 17,
  },

  NomPrenomViewInscrit: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
  },
  NomPrenomTextInputInscrit: {
    backgroundColor: "white",
    width: "47%",
    height: 57,
    marginBottom: 10,

    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 14,
  },

  inputViewInscrit: {
    width: "90%",
    height: 480,
    paddingBottom: 0,
    justifyContent: "flex-start",
    margin: 0,
    // flex: 1,
  },

  //caracteristique du text du bouton
  buttonTextInscrit: {
    textAlign: "center",

    color: "black",

    fontWeight: "700",
    fontSize: 18,
  },
  //mise en forme le  bouton
  buttonContainerInscrit: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
  },

  imageViewInscrit: {
    width: "35%",
    display: "flex",
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-between",
  },
  TextconnecterInscrit: {
    color: "#178A8A",
    fontSize: 14,
    fontWeight: "bold",
  },
  reservations: {
    marginHorizontal: 20,
    marginBottom: 200,


  },
  reservation: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#66D9D9",
    borderLeftWidth: 7,
  },
  modalLigne: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "80%",
  },
  modalText: {
    marginBottom: 15,
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
    height: "80%",
    width: "90%",

  },
  buttonClose: {
    position: "absolute",
    left: 0,
    borderRadius: 20,
    padding: 10,
    width: 100,
    height: 50,
  },
  offreClientNom: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#078282",
    textShadowColor: "#078282",
    textShadowOffset: { width: -2, height: 3 },
    textShadowRadius: 40,
    marginBottom: 10,
    textAlign: "center",
    marginTop: 0,
  },
  offreNbPlaces: {
    position: "absolute",
    right: 0,
    top: 0,
    fontSize: 20,
    borderStyle: "solid",
    borderWidth: 3,
    borderColor: "#078282",
    flexDirection: "row",

    color: "#078282",
    borderRadius: 10,
    padding: 10,
    margin: 5,
    width: "auto",
    height: 45,
  },
  offreTextDetails : {
    alignItems: "center",
    fontSize: 15,
    maxWidth: "70%",
  },
  offreTextDetailsIcon :{
    fontSize: 20,
    color: "#078282",
    marginRight: 7,
  }

});

