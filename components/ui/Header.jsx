import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from "../../utils/colors";

export default function Header({ title }){
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({

    container: {
        paddingHorizontal: 5,
        paddingBottom: '2.75%',
    },

    text: {
        fontSize: 24,
        fontFamily: 'Montserrat',
        letterSpacing: 0.5,
        fontWeight: '500',
        textAlign: 'center',
        color: Colors.textPrimary,
    },

});