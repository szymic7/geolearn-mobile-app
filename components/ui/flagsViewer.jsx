import { useRef, useState } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../../utils/colors';

export default function FlagsViewer({ countries }) {
  const [index, setIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const nextFlag = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setIndex((prev) => (prev + 1) % countries.length);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  };

  const prevFlag = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setIndex((prev) => (prev - 1 + countries.length) % countries.length);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  };

  if (!countries || countries.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.infoText}>No countries available</Text>
      </View>
    );
  }

  const country = countries[index];
  const iso2 = country.iso_a2.toLowerCase();
  const flagUrl = `https://flagcdn.com/w160/${iso2}.png`;  // Need to check if w320 image will fit

    return (
        <View style={styles.container}>
            <Text style={styles.countryName}>{country.name}</Text>

            {/* Image with navigation buttons */}
            <View style={styles.imageWithArrows}>
                <TouchableOpacity style={styles.prevNextButton} onPress={prevFlag}>
                    <Text style={styles.prevNextButtonText}>❰</Text>
                </TouchableOpacity>

                <View style={styles.imageContainer}>
                    <Animated.Image
                        source={{ uri: flagUrl }}
                        resizeMode="contain"
                        style={[styles.flagImage, { opacity: fadeAnim }]}
                    />
                </View>

                <TouchableOpacity style={styles.prevNextButton} onPress={nextFlag}>
                    <Text style={styles.prevNextButtonText}>❱</Text>
                </TouchableOpacity>
            </View>

            {/* Index counter */}
            <Text style={styles.indexCounter}>
                {index + 1}/{countries.length}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
      flex: 1,
      backgroundColor: Colors.contrasting,
      alignItems: 'center',
      width: "100%",
      height: "100%",
      borderRadius: 10,
      padding: 20
    },

    countryName: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 15,
      color: Colors.secondary,
      textShadowColor: 'rgba(0, 0, 0, 0.3)',
      textShadowOffset: { width: 2, height: 2 },
      textShadowRadius: 3,
    },

    imageWithArrows: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 15
    },

    imageContainer: {
      width: 160,
      height: 120
    },

    flagImage: {
      flex: 1,
      width: undefined,
      height: undefined,
      resizeMode: 'contain',
      // shadow - iOS
      shadowColor: '#000',
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      // shadow - Android
      elevation: 5,
    },

    prevNextButton: {
      paddingHorizontal: 15,
    },

    prevNextButtonText: {
      fontSize: 32,
      color: Colors.secondary,
      textShadowColor: 'rgba(0, 0, 0, 0.3)',
      textShadowOffset: { width: 2, height: 2 },
      textShadowRadius: 3,
    },

    indexCounter: {
      fontSize: 16,
      color: Colors.secondary,
    },

    infoText: {
      color: Colors.secondary,
    },
});