import { DrawerActions, NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import Accueil from './Accueil';
import AjouterOffre from './AjouterOffre';
import detailOffre from './detailOffre';
import ModifierOffre from './ModifierOffre';
import ChangeInfo from './ChangeInfo';
import ListReservation from './ListReservation';
import ListReservationChauffeur from './ListReservationChauffeur';

const Drawer = createDrawerNavigator();

import { LinearGradient } from "expo-linear-gradient";
import Logout from './Logout';
import QuiSommesNous from './QuiSommesNous';
import NousContacter from './NousContacter';

export default function AccueilStack({ route, navigation }) {
    const { role } = route.params;
    const s = require("../styles/Style");
    return (

        <Drawer.Navigator initialRouteName="Accueil"

            screenOptions={{

                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                headerBackground: () => (
                    <LinearGradient
                        colors={["#2DBDBD", "#078282"]}
                        style={s.linearGradient}
                    />
                ),


                headerRight: () => (
                    <View>
                        <TouchableOpacity>
                        </TouchableOpacity>
                    </View>
                ),
            }}>
            <Drawer.Screen name="Accueil" component={Accueil}


            />
            <Drawer.Screen name="ChangeInfo" component={ChangeInfo} options={{ title: "Informations personnelles" }} />
            {role == "chauffeur" &&
                <Drawer.Screen name="AjouterOffre" component={AjouterOffre} options={{ title: "Ajouter un offre" }} />
            }
            {role == "chauffeur" &&
                <Drawer.Screen name="ListReservationChauffeur" component={ListReservationChauffeur} options={{ title: "Les réservations" }} />
            }
            {role == "client" &&
                <Drawer.Screen name="ListReservation" component={ListReservation} options={{ title: "Mes réservations" }} />
            }
            <Drawer.Screen name="QuiSommesNous ?" component={QuiSommesNous} options={{ title: "Qui sommes nous ?" }} />
            <Drawer.Screen name="NousContacter" component={NousContacter} options={{ title: "Nous Contacter" }} />
            <Drawer.Screen name="Logout" component={Logout} options={{
                title: "Se déconnecter"
            }} />
            <Drawer.Screen name="detailOffre" component={detailOffre} options={{
                drawerItemStyle: { height: 0 }
            }} />


        </Drawer.Navigator>


    )
}
