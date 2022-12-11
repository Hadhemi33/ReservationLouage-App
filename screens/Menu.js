import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity, View, StyleSheet, Text, Image } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const Menu = (props) => {
    console.log(props.role);
    const navigation = useNavigation();
    return (
        <View style={styles.menuContainer}>

            {props.role === "chaufeur" &&
                <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={() => navigation.navigate("MesReservation")}>
                    <MaterialIcons style={styles.iconStytle} name="receipt-long" size={24} color="black" />
                </TouchableOpacity>
             }
            {props.role === "client" &&

              <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={() => navigation.navigate("Meservation")}>
                    <MaterialIcons style={styles.iconStytle} name="receipt-long" size={24} color="yellow" />
                </TouchableOpacity>
            }

            <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => navigation.navigate("About")}>
                <MaterialIcons style={styles.iconStytle} name="receipt-long" size={24} color="black" />
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => navigation.navigate("Accueil")}>
                <MaterialIcons style={[styles.iconStytle, styles.iconHome]} name="home" size={24} color="black" />
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => navigation.navigate("ChangeInfo")}>
                <MaterialIcons style={styles.iconStytle} name="account-circle" size={24} color="black" />
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    menuContainer: {
        position: "absolute",
        bottom: 0,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-end",
        backgroundColor: "white",
        borderWidth: 3,
        borderBottomWidth: 0,
        borderColor: "#2DBDED",
        borderRadius: 30,
        paddingHorizontal: 10,
    },

    iconStytle: {
        fontSize: 50,
        color: "#2DBDED",
    },
    iconHome: {
        fontSize: 70,
    },
});

export default Menu;