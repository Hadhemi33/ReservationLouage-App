import React from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'

export default function QuiSommesNous() {
    return (
        <View style={style.container}>
            <View style={style.header}>
                <Text style={style.text_header}>Qui sommes nous ?</Text>
            </View>
            <Image source={require('../assets/logo.png')} style={{ width: 200, height: 200, marginTop: 20 }} />

                <Text style={{  fontSize: 20, fontWeight: 'bold', color: '#078282' }}>Blasti : </Text>
                <Text style={{ paddingHorizontal:15, fontSize: 20, fontWeight: 'bold' }}>Est une application mobile qui relie entre les chauffeurs et les client à fin de faciliter la réservation des louages et de rendre le service plus accessible</Text>

            <View style = {style.footer}>
                <Text style={{  fontSize: 20, fontWeight: 'bold', color: '#078282' , textAlign:"center" }}>Notre équipe : </Text>
                <Text style={{ paddingHorizontal:15, fontSize: 20, fontWeight: 'bold' }}>Nous sommes une équipe de 4 étudiants en 2ème année cycle d'ingénieur à Tek-up :</Text>
               {/* lister les 4 noms  */}
               <Text style={{ paddingHorizontal:15, fontSize: 20, fontWeight: 'bold' }}>- Afi Hadil </Text>
                <Text style={{ paddingHorizontal:15, fontSize: 20, fontWeight: 'bold' }}>- Ben Mansour Hadhemi </Text>
                <Text style={{ paddingHorizontal:15, fontSize: 20, fontWeight: 'bold' }}>- Dieng Ibrahima </Text>
                <Text style={{ paddingHorizontal:15, fontSize: 20, fontWeight: 'bold' }}>- Souey Ihab </Text>
            </View>


        </View>
    )
}
const style = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    header: {
        justifyContent: 'flex-end',
        marginTop: 30,
    },
    text_header: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 30,
    },
    footer: {
        marginTop: 30,
    },

})

