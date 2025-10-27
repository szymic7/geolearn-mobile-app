import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Animated, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../../utils/colors';

export default function CapitalsViewer({ countries }) {
  const [index, setIndex] = useState(0);
  const [capitalImage, setCapitalImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const country = countries[index];
  const iso2 = country.iso_a2.toLowerCase();

  const fetchCapitalImage = async (capital) => {
    setLoading(true);
    setCapitalImage(null);

    try {
      const wikiApiUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(
        capital
      )}&prop=pageimages&format=json&pithumbsize=600&origin=*`;

      const wikiRes = await fetch(wikiApiUrl);
      const wikiData = await wikiRes.json();
      const page = Object.values(wikiData.query.pages)[0];

      let imageSrc = null;

      if (page?.thumbnail?.source) {
        imageSrc = page.thumbnail.source;
      } else {
        const summaryUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
          capital
        )}`;
        const summaryRes = await fetch(summaryUrl);
        const summaryData = await summaryRes.json();
        imageSrc = summaryData?.thumbnail?.source || null;
        // setCapitalImage(summaryData?.thumbnail?.source || null);
      }

      setCapitalImage(imageSrc);

      // 👇 Fade in only after we have the new image
      Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }).start();
    } catch (error) {
      console.error('Error fetching image for capital:', error);
      setCapitalImage(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fadeAnim.setValue(0); // reset opacity for new image
    fetchCapitalImage(country.capital);
  }, [index, country.capital]);

  const nextCapital = () => {
    Animated.timing(fadeAnim, { toValue: 0, duration: 200, useNativeDriver: true }).start(() => {
      setIndex((prev) => (prev + 1) % countries.length);
    });
  };

  const prevCapital = () => {
    Animated.timing(fadeAnim, { toValue: 0, duration: 200, useNativeDriver: true }).start(() => {
      setIndex((prev) => (prev - 1 + countries.length) % countries.length);
    });
  };

  const getCroppedCapital = (capital) => {
    if (!capital) return '';
    const commaIndex = capital.indexOf(',');
    return commaIndex !== -1 ? capital.slice(0, commaIndex).trim() : capital.trim();
  };

  return (
    <View style={styles.container}>
      {/* Country name with small flag */}
      <View style={styles.countryHeader}>
        <Text style={styles.countryName}>
            {country.name}
        </Text>
        <View style={styles.smallFlagContainer}>
            <Image
                source={{ uri: `https://flagcdn.com/w80/${iso2}.png` }}
                style={styles.smallFlag}
            />
        </View>
      </View>

      {/* Capital name */}
      <Text style={styles.capitalName}>{getCroppedCapital(country.capital)}</Text>

      {/* Image with navigation */}
      <View style={styles.imageWithArrows}>
        <TouchableOpacity style={styles.prevNextButton} onPress={prevCapital}>
          <Text style={styles.prevNextButtonText}>❰</Text>
        </TouchableOpacity>

        <View style={styles.capitalImageContainer}>
          {loading ? (
            <ActivityIndicator size="large" color={Colors.primaryDark} />
          ) : capitalImage ? (
            <Animated.Image
              source={{ uri: capitalImage }}
              style={[styles.capitalImage, { opacity: fadeAnim }]}
              resizeMode="contain"
            />
          ) : (
            <Text style={styles.noImageText}>No image available</Text>
          )}
        </View>

        <TouchableOpacity style={styles.prevNextButton} onPress={nextCapital}>
          <Text style={styles.prevNextButtonText}>❱</Text>
        </TouchableOpacity>
      </View>

      {/* Index counter */}
      <Text style={styles.indexCounter}>
        {index + 1}/{countries.length}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: Colors.contrasting,
    justifyContent: 'center',
    alignItems: 'center',
    width: "100%",
    height: "100%",
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },

  countryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },

  countryName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.secondary,
    marginRight: 10,
    textAlign: 'center',      // ✅ center multiline text
    flexShrink: 1,            // ✅ allow text to shrink when needed
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
  },

  smallFlagContainer: {
    width: 80,
    height: 60
  },

  smallFlag: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: 'contain',
    padding: 3,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },

  capitalName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.secondary,
    marginBottom: 10,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
  },

  imageWithArrows: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },

  prevNextButton: {
    paddingHorizontal: 15,
  },

  prevNextButtonText: {
    fontSize: 32,
    color: Colors.secondary,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
  },

  capitalImageContainer: {
    width: 200,
    height: 150,
    justifyContent: 'center',
  },

  capitalImage: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: 'contain',
    padding: 3,
    // shadow - iOS
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    // shadow - Android
    elevation: 2,
  },

  noImageText: {
    color: '#888',
  },

  indexCounter: {
    fontSize: 16,
    color: Colors.secondary,
  },

});