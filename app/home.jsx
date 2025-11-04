import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, View } from 'react-native';
import BurgerMenuButton from '../components/ui/BurgerMenuButton';
import Header from '../components/ui/Header';
import HomeTileButton from '../components/ui/HomeTileButton';
import Colors from "../utils/colors";

export default function Home() {
    const router = useRouter();

    return <View style={styles.container}>

        <View style={styles.burgerArea}>
            <BurgerMenuButton/>
        </View>

        <ScrollView contentContainerStyle={styles.mainContent}>
            <Header title="What do you feel like learning today?" />

            <View style={styles.tilesContainer}>
                <HomeTileButton
                    title="Flags"
                    imageSource={require('../assets/images/img_flags.png')}
                    onPress={() => router.push("/regionChoiceFlags")}
                />
                <HomeTileButton
                    title="Maps"
                    imageSource={require('../assets/images/img_maps.png')}
                />
                <HomeTileButton
                    title="Capitals"
                    imageSource={require('../assets/images/img_capitals.png')}
                    onPress={() => router.push("/regionChoiceCapitals")}
                />
                <HomeTileButton
                    title="Try yourself in quizzes"
                    imageSource={require('../assets/images/img_quizzes.png')}
                    onPress={() => router.push("/quizChoice")}
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
        flexDirection: 'column',
        justifyContent: 'space-around',
        flexGrow: 1,
        paddingHorizontal: 5
    },
});