import React, { useEffect, useState } from 'react'
import { View, Text , ActivityIndicator} from 'react-native'

import { db, auth } from '../firebase';
export default function ListReservation({ route, navigation }) {
    const { role } = route.params;
    const [loading, setLoading] = useState(true)
    const [reservations, setReservations] = useState([]);
    const s = require("../styles/Style");

    useEffect(() => {
        reservations.length = 0;
        role == "chauffeur" ?

            db.collection("reservations").where("chauffeur", "==", auth.currentUser.displayName).get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    reservations.push(doc.data())
                });
                setLoading(false)
            })
            :
            db.collection("reservations").where("clientName", "==", auth.currentUser.displayName).get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    reservations.push(doc.data())

                });
                setLoading(false)
            });

    }, [])


    return (
        <View>

            {loading ?
                <ActivityIndicator size="large"  style={s.loading} color="#078282" />
                :
                reservations.map((reservation) => {
                    return (
                        <View style={styles}>
                            <Text>{reservation.clientName}</Text>
                            <Text>{reservation.chauffeur}</Text>
                            {/* <Text>{reservation.date}</Text>
                <Text>{reservation.heure}</Text>
                <Text>{reservation.heureArrivee}</Text> */}
                            <Text>{reservation.depart}</Text>
                            <Text>{reservation.arrivee}</Text>
                            <Text>{reservation.prix} ss</Text>
                            <Text>{reservation.places}</Text>
                        </View>
                    )
                })
            }
        </View>
    )
}
const styles = {

}