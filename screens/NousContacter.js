import { Picker } from '@react-native-picker/picker'
import React from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { db , auth} from '../firebase';
export default function NousContacter() {
  const [type, setType] = React.useState("Réclamation")
  const [message, setMessage] = React.useState("")  
  const handleEnvoyer = () => {
    db.collection('contactUs').add({
      nom : auth.currentUser.displayName, 
      type: type,
      message: message,
      dateDeCreation: new Date(),
    }).then(() => {
      alert('Message envoyé !')
    }
    ).catch((error) => {
      console.log(error);
    }
    )

  }


  return (
    <View style={style.container}>
      <Text style={style.header}> Nous Contacter </Text>
      <Picker
        selectedValue={type}
        onValueChange={(itemValue, itemIndex) => setType(itemValue)}
        mode="dialog"
        style={{marginVertical: 15, width: '90%', padding: 10 , borderRadius: 15,backgroundColor: '#fff',borderRadius: 15,}}
      >
        <Picker.Item label="Réclamation" value="Réclamation" />
        <Picker.Item label="Demande" value="Demande" />
        <Picker.Item label="Autre" value="Autre" />
      </Picker>
      <TextInput
        placeholder="Votre message"
        multiline
        numberOfLines={6}
        value={message}
        onChangeText={setMessage}
        style={{ borderWidth: 1, borderColor: '#078282', padding: 10, borderRadius: 15 , width: '90%', height: 150,}}
      />
      <TouchableOpacity onPress={handleEnvoyer} style={{ backgroundColor: '#078282', padding: 10, borderRadius: 15, marginTop: 15, width: '90%',}}>
        <Text style={{ color: '#fff', textAlign: 'center', fontSize: 20, fontWeight: 'bold',}}>Envoyer</Text>
      </TouchableOpacity>

      <View style={style.socialMedia} >

        <MaterialIcons name="facebook" size={30} color="#078282" />
        <MaterialIcons name="language" size={30} color="#078282" />
      </View>
   


    </View>
  )
}
const style = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  header: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#078282',
    marginTop: 20,
  },
  socialMedia: {
    height: 150,
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '90%',
    marginTop: 120,
  },
})
