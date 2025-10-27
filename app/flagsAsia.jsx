import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, View } from 'react-native';
import BurgerMenuButton from '../components/ui/BurgerMenuButton';
import FlagsViewer from '../components/ui/FlagsViewer';
import { FLAGS_ENDPOINTS } from '../constants/api';
import Colors from "../utils/colors";

export default function FlagsAsia() {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCountries = async () => {
        try {
            const response = await fetch(FLAGS_ENDPOINTS.ASIAN_FLAGS);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            const sortedData = [...data].sort((a, b) => a.name.localeCompare(b.name));

            setCountries(sortedData);
        } catch (error) {
            console.error('Failed to fetch countries:', error);
            Alert.alert('Error', 'Failed to load flags. Please try again later.');
        } finally {
            setLoading(false);
        }
        };

        fetchCountries();
    }, []);

    return (
        !loading ? (
            <View style={styles.container}>
                <View style={styles.burgerArea}>
                    <BurgerMenuButton/>
                </View>

                <View style={styles.flagsViewer}>
                    <FlagsViewer countries={countries}/>
                </View>
            </View>
        ) : (
            <View style={styles.container}>
                <ActivityIndicator size="large" color={Colors.primaryDark} />
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        )
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

    flagsViewer: {
        marginTop: 80,  // starts below BurgerMenuButton
        height: '70%',
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    loadingText: {
        marginTop: 20,
        color: Colors.secondary,
        fontSize: 16,
    },
});