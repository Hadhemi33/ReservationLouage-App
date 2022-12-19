import React, { useEffect, useState } from 'react'
import { View, Text, ActivityIndicator, Modal, ScrollView, TouchableOpacity } from 'react-native'
import { auth, db } from '../firebase';


import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function ListReservationChauffeur({ route, navigation }) {
    const { offr } = route.params;
    const s = require("../styles/Style");
    const [offreSelected, setOffreSelected] = useState();
    const [offrePrincipale, setOffrePrincipale] = useState();
    const [offres, setOffres] = useState([]);
    const [etat, setEtat] = useState("en attente")
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        db.collection("offres").doc(offr).get().then((doc) => {
            setOffrePrincipale(doc)
        })
    }, [])
    useEffect(() => {
        // db.collection("reservations").where("chauffeur", "==", auth.currentUser.displayName).get().then((querySnapshot) => {

        db.collection("reservations").where("chauffeur", "==", auth.currentUser.displayName).get().then((querySnapshot) => {
            offres.length = 0;
            querySnapshot.forEach((doc) => {
                offres.push(doc)
            });
        }).then(() => {
            setLoading(false)
        })

    }, [])
    const [modalVisible, setModalVisible] = useState(false);
    const handleConfirmer = () => {
        let nbplaces;
        db.collection("reservations").doc(offreSelected).get().then((doc) => {
            nbplaces = doc.data().nbplaces[0]
        }).then(() => {
            let places = offrePrincipale.data().places
            if (places - nbplaces >= 0) {
                db.collection("reservations").doc(offreSelected).update({
                    etat: "confirmé"
                }).then(() => {
                    db.collection("offres").doc(offrePrincipale.id).update({
                        places: places - nbplaces
                    })
                    setModalVisible(!modalVisible)
                    navigation.replace("ListReservationChauffeur", { offr: offrePrincipale.id })
                })
            } else {
                alert("Il n'y a pas assez de places")
            }
        })





    }
    const handleAnnuler = () => {
        db.collection("reservations").doc(offreSelected).update({
            etat: "annulé"
        }).then(() => {
            let nbplaces;
            db.collection("reservations").doc(offreSelected).get().then((doc) => {
                nbplaces = doc.data().nbplaces[0]
            }).then(() => {
                let places = offrePrincipale.data().places
                console.log(places)
                console.log(nbplaces)
                db.collection("offres").doc(offrePrincipale.id).update({
                    places: places + nbplaces
                })
                setModalVisible(!modalVisible)
                navigation.replace("ListReservationChauffeur", { offr: offrePrincipale.id })

            })


        }
        )

    }



    return (
        <View>
            {loading ?
                <ActivityIndicator size="large" style={s.loading} color="#078282" />

                :

                <ScrollView >
                    <View style={s.reservations}>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => {
                                Alert.alert("Modal has been closed.");
                                setModalVisible(!modalVisible);
                            }}
                        >
                            <View style={s.centeredView}>
                                <View style={[s.modalView, { height: "40%" }]} >
                                    <TouchableOpacity
                                        style={s.buttonClose}
                                        onPress={() => setModalVisible(!modalVisible)}
                                    >
                                        <MaterialIcons size={40} color='red' >
                                            close
                                        </MaterialIcons>
                                    </TouchableOpacity>
                                    <Text > Voulez vous  {etat == "confirmé" ? "Annuler" : etat == "annulé" ? "Confirmer" : "Confirmer ou annuler"} ?</Text>
                                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                                        {etat != "confirmé" &&
                                            <TouchableOpacity
                                                style={style.buttonConfirmer}
                                                onPress={() => handleConfirmer()}
                                            >
                                                <Text style={style.textStyle}>Confirmer</Text>
                                            </TouchableOpacity>
                                        }
                                        {etat != "annulé" &&
                                            <TouchableOpacity
                                                style={style.buttonAnnuler}
                                                onPress={() => handleAnnuler()}
                                            >
                                                <Text style={style.textStyle}>Annuler</Text>
                                            </TouchableOpacity>
                                        }


                                    </View>

                                </View>
                            </View>
                        </Modal>
                        <View style={[style.header]}>
                            <Text style={style.headerText}>
                                {new Date(offrePrincipale.data().date.seconds * 1000).getDate()}/
                                {new Date(offrePrincipale.data().date.seconds * 1000).getMonth() + 1}/
                                {new Date(offrePrincipale.data().date.seconds * 1000).getFullYear()}
                            </Text>
                            <View style={style.headerText}>
                                <Text style={style.headerText}>
                                    {offrePrincipale.data().depart}&nbsp;
                                </Text>
                                <Text style={style.headerText}>
                                    <MaterialIcons
                                        style={style.iconArrow}
                                        name="arrow-forward"
                                    ></MaterialIcons>
                                </Text>
                                <Text style={style.headerText}>
                                    &nbsp;{offrePrincipale.data().arrivee}
                                </Text>
                            </View>
                            <Text style={style.headerText}>
                                {offrePrincipale.data().places} places restantes !
                            </Text>
                        </View>

                        {offres.length != 0 ?
                            offres.map((offre) => {
                                return (
                                    <View style={s.reservation} key={offre.id}>

                                        <Text style={s.offreClientNom}>
                                            {offre.data().clientName}
                                        </Text>
                                        <Text style={s.offreTextDetails}>
                                            <MaterialIcons style={s.offreTextDetailsIcon}>
                                                phone
                                            </MaterialIcons>&nbsp;
                                            {offre.data().clientPhone}
                                        </Text>
                                        <Text style={s.offreTextDetails}>
                                            <MaterialIcons style={s.offreTextDetailsIcon}>
                                                location_on
                                            </MaterialIcons> &nbsp;
                                            {offre.data().addresse}
                                        </Text>

                                        <Text style={s.offreTextDetails}>
                                            <MaterialIcons style={s.offreTextDetailsIcon}>
                                                date_range
                                            </MaterialIcons>&nbsp;
                                            {new Date(offre.data().dateReservation.seconds * 1000).toLocaleString()}
                                        </Text>
                                        <Text style={s.offreNbPlaces}>
                                            <MaterialIcons size={20}>
                                                airline_seat_recline_normal
                                            </MaterialIcons>
                                            {offre.data().nbplaces[0]}
                                        </Text>
                                        {offre.data().etat == "confirmé" ?
                                            <TouchableOpacity
                                                style={s.buttonEtatConfirmer}
                                                onPress={() => { setOffreSelected(offre.id); setModalVisible(true); setEtat(offre.data().etat) }} >
                                                <Text>{offre.data().etat}</Text>
                                            </TouchableOpacity>
                                            :
                                            offre.data().etat == "annulé" ?
                                                <TouchableOpacity
                                                    style={s.buttonEtatAnnuler}
                                                    onPress={() => { setOffreSelected(offre.id); setModalVisible(true); setEtat(offre.data().etat) }} >
                                                    <Text>{offre.data().etat}</Text>
                                                </TouchableOpacity>
                                                :
                                                <TouchableOpacity
                                                    style={s.buttonEtatEnAttente}
                                                    onPress={() => { setOffreSelected(offre.id); setModalVisible(true) }} >
                                                    <Text>{offre.data().etat}</Text>
                                                </TouchableOpacity>

                                        }

                                    </View>
                                )
                            }
                            )
                            :
                            <View style={{ alignItems: "center", justifyContent: "center", marginTop: 20 }}>
                                <Text style={{ fontSize: 20, fontWeight: "bold", color: "#078282" }}>Aucune réservation pour le moment !</Text>
                            </View>

                        }
                    </View>
                </ScrollView>

               

            }
        </View>
    )
}

const style = {

    header: {
        backgroundColor: "#078282",
        padding: 10,
        margin: 10,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    headerText: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
        flexDirection: "row",
        alignItems: "flex-end",

    },
    iconArrow: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",

    },
    buttonConfirmer: {
        backgroundColor: "#4df24d",
        paddingHorizontal: 20,
        paddingVertical: 15,
        margin: 10,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    buttonAnnuler: {
        backgroundColor: "red",
        paddingHorizontal: 20,
        paddingVertical: 15,
        margin: 10,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },



}
