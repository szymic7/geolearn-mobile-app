import { ScrollView, StyleSheet, View } from 'react-native';
import BurgerMenuButton from '../components/ui/BurgerMenuButton';
import ContinentsTileButton from "../components/ui/ContinentsTileButton";
import Header from '../components/ui/Header';
import Colors from "../utils/colors";

export default function ContinentsChoiceQuiz() {
    return <View style={styles.container}>

        <View style={styles.burgerArea}>
            <BurgerMenuButton/>
        </View>

        <ScrollView contentContainerStyle={styles.mainContent}>
            <Header style={styles.head} title="Select a region" />

            <View style={styles.tilesContainer}>
                <ContinentsTileButton
                    title="Europe"
                    imageSource={require('../assets/images/Europe_cc.png')}
                    showProgress={true}
                    progress={0.72}
                />
                <ContinentsTileButton
                    title="Asia"
                    imageSource={require('../assets/images/Asia_cc.png')}
                    showProgress={true}
                    progress={0.56}
                />
                <ContinentsTileButton
                    title="Africa"
                    imageSource={require('../assets/images/Africa_cc.png')}
                    showProgress={true}
                    progress={0.04}
                />
                <ContinentsTileButton
                    title="North America"
                    imageSource={require('../assets/images/NorthAmerica_cc.png')}
                    showProgress={true}
                    progress={0.94}
                />
                <ContinentsTileButton
                    title="South America"
                    imageSource={require('../assets/images/SouthAmerica_cc.png')}
                    showProgress={true}
                    progress={0.68}
                />
                <ContinentsTileButton
                    title="Australia"
                    imageSource={require('../assets/images/Australia_cc.png')}
                    showProgress={true}
                    progress={0.1}
                />
                <ContinentsTileButton
                    title="World"
                    imageSource={require('../assets/images/World_cc.png')}
                    showProgress={true}
                    progress={0.13}
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