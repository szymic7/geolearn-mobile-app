import React from 'react';
import { TouchableOpacity, View, StyleSheet, Image } from 'react-native';
import Colors from "../../utils/colors";
import TileLabel from "./TileLabel";


export default function HomeTileButton({ title, imageSource, showProgress = false, progress = 0, onPress })
{
    return (
        <View style={styles.shadowWrapper}>

            <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.85}>
                {imageSource && <Image
                    source={imageSource}
                    style={[styles.image, { transform: [{ translateY: '10.5%' }] }]}
                    resizeMode="cover"/>
                }
                <View>
                    <TileLabel title={title} showProgress={showProgress} progress={progress} />
                </View>
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({

    shadowWrapper: {
        width: '100%',
        height: '22.5%',
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
    },
});