import React from 'react'
import { Alert, View } from 'react-native'
import { auth } from '../firebase'
import { useNavigation } from '@react-navigation/core'

export default function Logout() {
    const navigation = useNavigation();
    Alert.alert(
        "Déconnexion",
        "Voulez-vous vraiment vous déconnecter ?",
        [
            {
                text: "Annuler",
                onPress: () => navigation.goBack(),
                
            },
            {
                text: "OK", onPress: () =>

                    auth
                        .signOut()
                        .then(() => {
                            navigation.replace("Home");
                            console.log("user logged out");
                        })
                        .catch((error) => {
                            console.log(error.message);
                        })
            }

        ]
        ,
        { cancelable: false }
    );


    return (
        <View>

        </View>
    )
}
