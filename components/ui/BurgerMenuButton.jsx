import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import Colors from "../../utils/colors";

export default function BurgerMenuButton ({ onPress })
{
    return (

        <TouchableOpacity onPress={onPress} style={styles.container}>
            <View style={styles.line} />
            <View style={styles.line} />
            <View style={styles.line} />
        </TouchableOpacity>

    );
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 4,
    },

    line: {
        width: 26,
        height: 3.2,
        backgroundColor: Colors.textPrimary,
        marginVertical: 2.5,
        borderRadius: 2,
    },

});
