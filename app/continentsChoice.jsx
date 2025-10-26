import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import BurgerMenuButton from '../components/ui/BurgerMenuButton';
import Header from '../components/ui/Header';
import Colors from "../utils/colors";
import ContinentsTileButton from "../components/ui/ContinentsTileButton";

export default function ContinentsChoice() {
    return <View style={styles.container}>

        <View style={styles.burgerArea}>
            <BurgerMenuButton/>
        </View>

        <ScrollView contentContainerStyle={styles.mainContent}>
            <Header style={styles.head} title="Which flags do you want to learn?" />

            <View style={styles.tilesContainer}>
                <ContinentsTileButton
                    title="Europe"
                    imageSource={require('../assets/images/Europe_cc.png')}
                />
                <ContinentsTileButton
                    title="Asia"
                    imageSource={require('../assets/images/Asia_cc.png')}
                />
                <ContinentsTileButton
                    title="Africa"
                    imageSource={require('../assets/images/Africa_cc.png')}
                />
                <ContinentsTileButton
                    title="North America"
                    imageSource={require('../assets/images/NorthAmerica_cc.png')}
                />
                <ContinentsTileButton
                    title="South America"
                    imageSource={require('../assets/images/SouthAmerica_cc.png')}
                />
                <ContinentsTileButton
                    title="Australia"
                    imageSource={require('../assets/images/Australia_cc.png')}
                />
                <ContinentsTileButton
                    title="World"
                    imageSource={require('../assets/images/World_cc.png')}
                />
            </View>
        </ScrollView>

    </View>
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: Colors.primaryLight,
        alignItems: 'center',
    },

    burgerArea: {
        position: 'absolute',
        top: 12,
        left: 13.5,
        zIndex: 10,
    },

    mainContent: {
        flex: 1,
        width: 280,
        height: '100%',
        justifyContent: 'space-between',
        paddingTop: '4%',
        paddingBottom: '11%',
    },

    tilesContainer: {
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'space-around',
        flexGrow: 1,
        paddingHorizontal: 5
    },
});