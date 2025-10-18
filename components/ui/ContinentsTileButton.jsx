import React from 'react';
import {TouchableOpacity, View, StyleSheet, ImageBackground, Text} from 'react-native';
import Colors from "../../utils/colors";
import QuizProgressBar from "./QuizProgressBar";
import {getProgressColor} from "../../utils/progress";


export default function ContinentsTileButton({ title, imageSource, showProgress = false, progress = 0, onPress })
{
    const percentage = Math.round(progress * 100);
    const percentColor = getProgressColor(progress);

    return (
        <View style={styles.shadowWrapper}>

            <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.75}>

                <ImageBackground
                    source={imageSource}
                    style={styles.image}
                    resizeMode="cover">

                    <View style={[StyleSheet.absoluteFillObject, { backgroundColor: 'rgba(255,255,255,0.25)' }]} />
                    <View style={styles.overlay}>
                        <Text style={styles.text}>{title}</Text>
                    </View>

                    {showProgress && (
                        <View style={styles.progressContainer}>
                            <Text style={[styles.percent, { color: percentColor }]}>{percentage}%</Text>
                            <QuizProgressBar progress={progress} />
                        </View>
                    )}

                </ImageBackground>

            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({

    shadowWrapper: {
        width: '100%',
        height: '12%',
        shadowColor: Colors.shadowColor,
        shadowOpacity: 0.27,
        shadowOffset: { width: 0.5, height: 3 },
        shadowRadius: 3,
        elevation: 6,
        borderRadius: 17,
        backgroundColor: Colors.background, // iOS needs a solid background for shadow
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
        justifyContent: 'center',
        alignItems: 'center',
    },

    text:{
        alignSelf: 'center',
        justifySelf: 'center',
        paddingVertical: 6,
        fontSize: 16,
        fontFamily: 'Montserrat',
        letterSpacing: 0.1,
        fontWeight: '500',
        textAlign: 'center',
        color: Colors.textPrimary,
    },

    progressContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'flex-end',
    },

    percent:{
        paddingHorizontal: 5,
        fontWeight: '600',
    }
});