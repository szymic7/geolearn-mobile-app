import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../utils/colors';
import QuizProgressBar from './QuizProgressBar';

export default function TileLabel({ title, showProgress, progress})
{
    const percentage = Math.round(progress * 100);

    let percentColor;
    if (progress < 0.5) {
        // from red → yellow
        const ratio = progress / 0.5;
        const r = 255;
        const g = Math.round(255 * ratio);
        const b = 0;
        percentColor = `rgb(${r}, ${g}, ${b})`;
    } else {
        // from yellow → green
        const ratio = (progress - 0.5) / 0.5;
        const r = Math.round(255 * (1 - ratio));
        const g = 255;
        const b = 0;
        percentColor = `rgb(${r}, ${g}, ${b})`;
    }

    return (
        <View style={styles.container}>
            {showProgress ? (
                <>
                    <QuizProgressBar progress={progress}/>
                    <View style={styles.row}>
                        <Text style={styles.text}>{title}</Text>
                        <Text style={[styles.text, styles.percent, { color: percentColor }]}>{percentage}%</Text>
                    </View>
                </>
            ):(
                <Text style={styles.text}>{title}</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        backgroundColor: Colors.background,
        alignItems: 'center',
    },

    row: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 12,
    },

    text: {
        paddingVertical: 6,
        fontSize: 16,
        fontFamily: 'Montserrat',
        letterSpacing: 0.1,
        fontWeight: '500',
        textAlign: 'center',
        color: Colors.textPrimary,
    },

    percent: {
        fontWeight: '600',
    },

});