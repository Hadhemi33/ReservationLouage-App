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
    paddingTop: 50,
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

    color: "white",
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
});
