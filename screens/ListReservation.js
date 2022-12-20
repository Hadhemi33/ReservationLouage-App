import React, { useEffect, useState } from 'react'
import { View, Text, ActivityIndicator, ScrollView ,TouchableOpacity ,Alert} from 'react-native'
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { db, auth } from '../firebase';
export default function ListReservation({ route, navigation }) {
    const { role } = route.params;
    const [loading, setLoading] = useState(true)
    const [reservations, setReservations] = useState([]);
    const s = require("../styles/Style");

    useEffect(() => {
        reservations.length = 0;
        db.collection("reservations").where("clientName", "==", auth.currentUser.displayName).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                reservations.push(doc)

            });
            setLoading(false)
        });

    }, [])

    const handleSupprimer = (id) => {
        Alert.alert(
            "Supprimer",
            "Voulez-vous vraiment supprimer cette réservation ?",
            [
                {
                    text: "Annuler",
                },
                { text: "OK", onPress: () => 
        
                    db.collection("reservations").doc(id).delete().then(() => {
                        alert("Réservation supprimé !");
                        navigation.replace("ListReservation" ,{ role: "client"});
                    }).catch((error) => {
                        console.error("Error removing document: ", error);
                    })}
            
                ]
            ,
            { cancelable: false }
        );


    }


    return (
        <View>

            {loading ?
                <ActivityIndicator size="large" style={s.loading} color="#078282" />
                :

                <ScrollView >
                    <View style={s.reservations}>
                        {reservations.map((reservation) => {

                            return (
                                <View style={s.reservation} key={reservation.id}>
                                {reservation.data().etat == "En attente" && 
                                    <TouchableOpacity
                                        style={s.buttonSupprimer}
                                        onPress={() => handleSupprimer(reservation.id)} >
                                            <MaterialIcons size={25} color={"red"}>
                                                delete
                                            </MaterialIcons>
                                        </TouchableOpacity>
                                }
                                    <Text style={s.offreClientNom}>
                                        {new Date(reservation.data().dateOffre.seconds * 1000).toLocaleDateString()} &nbsp;
                                        {new Date(reservation.data().heureOffre?.seconds * 1000).toLocaleTimeString()}
                                    </Text>
                                    <View style={{ flexDirection: "row" }}>

                                        <Text style={styles.headerText}>{reservation.data().depart} &nbsp;</Text>

                                        <MaterialIcons
                                            style={styles.iconArrow}
                                            name="arrow-forward"
                                        ></MaterialIcons>
                                        <Text style={styles.headerText}> &nbsp; {reservation.data().arrivee}</Text>
                                    </View>
                                    <Text style={styles.headerText} >
                                        <MaterialIcons size={19}>
                                            airport_shuttle
                                        </MaterialIcons>
                                        &nbsp;
                                        {reservation.data().chauffeur} </Text>
                                    <Text style={s.offreNbPlaces}>
                                        <MaterialIcons size={20}>
                                            airline_seat_recline_normal
                                        </MaterialIcons>
                                        {reservation.data().nbplaces[0]}
                                    </Text>


                                    {reservation.data().etat == "confirmé" ?
                                        <TouchableOpacity
                                            style={s.buttonEtatConfirmer}
                                            >
                                            <Text>{reservation.data().etat}</Text>
                                        </TouchableOpacity>
                                        :
                                        reservation.data().etat == "annulé" ?
                                            <TouchableOpacity
                                                style={s.buttonEtatAnnuler}
                                            >
                                                <Text>{reservation.data().etat}</Text>
                                            </TouchableOpacity>
                                            :
                                            <TouchableOpacity
                                                style={s.buttonEtatEnAttente}
                                                >
                                                <Text>{reservation.data().etat}</Text>
                                            </TouchableOpacity>

                                    }

                                </View>
                            )
                        })
                        }
                    </View>
                </ScrollView>
            }
        </View>
    )
}
const styles = {
    headerText: {
        color: "black",
        fontSize: 17,
        flexDirection: "row",
        alignItems: "flex-end",

    },
    iconArrow: {
        color: "#078282",
        fontSize: 20,
        fontWeight: "bold",

    },
}