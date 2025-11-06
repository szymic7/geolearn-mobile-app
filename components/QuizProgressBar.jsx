import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function QuizProgressBar({ progress})
{
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#ff0000', '#ffff00', '#00ff00']} // red -> yellow -> green
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradient}
            />
            <View
                style={[
                    styles.greyCover,
                    { width: `${(1 - progress) * 100}%` },
                ]}
            />
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        height: 5,
        width: '100%',
        overflow: 'hidden',
    },

    gradient: {
        height: '100%',
        width: '100%',
    },

    greyCover:{
        position: 'absolute',
        height: '100%',
        backgroundColor: '#ddd',
        right: 0,
        top: 0,
    }

});