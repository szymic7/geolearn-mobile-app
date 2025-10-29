import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import BurgerMenuButton from '../components/ui/BurgerMenuButton';
import ContinentsTileButton from "../components/ui/ContinentsTileButton";
import Header from '../components/ui/Header';
import Colors from "../utils/colors";

export default function RegionChoiceCapitals() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <View style={styles.burgerArea}>
                <BurgerMenuButton/>
            </View>

            <ScrollView contentContainerStyle={styles.mainContent}>
                <Header title="Which capital cities do you want to learn?" />

                <View style={styles.tilesContainer}>
                    <ContinentsTileButton
                        title="Europe"
                        imageSource={require('../assets/images/Europe_cc.png')}
                        onPress={() => router.push('/capitalsEurope')}
                    />
                    <ContinentsTileButton
                        title="Asia"
                        imageSource={require('../assets/images/Asia_cc.png')}
                        onPress={() => router.push('/capitalsAsia')}
                    />
                    <ContinentsTileButton
                        title="Africa"
                        imageSource={require('../assets/images/Africa_cc.png')}
                        onPress={() => router.push('/capitalsAfrica')}
                    />
                    <ContinentsTileButton
                        title="North America"
                        imageSource={require('../assets/images/NorthAmerica_cc.png')}
                        onPress={() => router.push('/capitalsNorthAmerica')}
                    />
                    <ContinentsTileButton
                        title="South America"
                        imageSource={require('../assets/images/SouthAmerica_cc.png')}
                        onPress={() => router.push('/capitalsSouthAmerica')}
                    />
                    <ContinentsTileButton
                        title="Australia"
                        imageSource={require('../assets/images/Australia_cc.png')}
                        onPress={() => router.push('/capitalsAustralia')}
                    />
                    <ContinentsTileButton
                        title="World"
                        imageSource={require('../assets/images/World_cc.png')}
                        onPress={() => router.push('/capitalsWorld')}
                    />
                </View>
            </ScrollView>

        </View>
    ) 
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
        width: '71%',
        height: '100%',
        justifyContent: 'space-between',
        paddingTop: '4%',
        paddingBottom: '11%',
    },

    tilesContainer: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        flexGrow: 1,
        paddingHorizontal: 5
    },
});