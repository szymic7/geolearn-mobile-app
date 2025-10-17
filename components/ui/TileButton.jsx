import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Image } from 'react-native';
import Colors from "../../utils/colors";


export default function TileButton({ title, imageSource, onPress })
{
    return (
        <View style={styles.shadowWrapper}>

            <TouchableOpacity style={styles.container} onPress={onPress}>
                {imageSource && <Image
                    source={imageSource}
                    style={[styles.image, { transform: [{ translateY: '10.5%' }] }]}
                    resizeMode="cover"/>
                }
                <View style={styles.textContainer}>
                    <Text style={styles.text}>{title}</Text>
                </View>
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({

    shadowWrapper: {
        width: '100%',
        height: '22.5%',
        shadowColor: '#000',
        shadowOpacity: 0.27,
        shadowOffset: { width: 0.5, height: 3 },
        shadowRadius: 3,
        elevation: 6,
        borderRadius: 17,
        backgroundColor: '#fff', // iOS needs a solid background for shadow
    },

    container: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        justifyContent: 'flex-end',
        overflow: 'hidden',
    },

    image: {
        width: '100%',
        height: '100%',
    },

    textContainer: {
        backgroundColor: 'white',
        padding: 5,
    },

    text: {
        fontSize: 16,
        fontFamily: 'Montserrat',
        letterSpacing: 0.1,
        fontWeight: '500',
        textAlign: 'center',
        color: Colors.textPrimary,
    },

});