import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, View } from 'react-native';
import BurgerMenuButton from '../components/ui/BurgerMenuButton';
import CapitalsViewer from '../components/ui/CapitalsViewer';
import { CAPITALS_ENDPOINTS } from '../constants/api';
import Colors from "../utils/colors";

export default function CapitalsNorthAmerica() {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCountries = async () => {
        try {
            const response = await fetch(CAPITALS_ENDPOINTS.NORTH_AMERICAN_CAPITALS);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            const sortedData = [...data].sort((a, b) => a.name.localeCompare(b.name));

            setCountries(sortedData);
        } catch (error) {
            console.error('Failed to fetch countries:', error);
            Alert.alert('Error', 'Failed to load data. Please try again later.');
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

                <View style={styles.capitalsViewer}>
                    <CapitalsViewer countries={countries} />
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

    capitalsViewer: {
        marginTop: 100,  // starts below BurgerMenuButton
        height: '60%',
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