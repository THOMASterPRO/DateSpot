import { Pressable, Text, View } from 'react-native';
import { useContext, useState, useEffect, useRef, useCallback } from 'react';
import { appContext } from '@/contexts/appContext';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import AppColors from '../../styles/theme/colors';
import mapScreenStyles from '../../styles/screens/mapScreen.styles'
import { useRouter } from 'expo-router';

//defineer de legenda van de map
const Legend = [
  { label: 'Activity', type: 'activiteit' },
  { label: 'Walk', type: 'wandeling' },
  { label: 'Museum', type: 'museum' },
  { label: 'Food / Drinks', type: 'food/drinks' },
];

// definieer de pin kleuren
const getPinColor = (hotSpot) => {
  switch ((hotSpot.type ?? '').toLowerCase()) {
    case 'activiteit':
      return '#2563eb';
    case 'wandeling':
      return '#51b251';
    case 'museum':
      return '#9066d8';
    case 'food/drinks':
      return '#dec450';
  }
};

const getLegendColor = (type) => {
  return getPinColor({ type });
};



export default function MapScreen({ route }) {
  const { theme } = useContext(appContext);
  const styles = mapScreenStyles(theme);
  const router = useRouter();

  const { hotSpots = [] } = useContext(appContext);
  const [currentRegion, setCurrentRegion] = useState(null);
  const [mapReady, setMapReady] = useState(false);
  const mapRef = useRef(null);
  const selectedHotSpotId = route?.params?.hotSpotId;
  const selectedHotSpot = hotSpots.find((hotSpot) => String(hotSpot.id) === String(selectedHotSpotId));

  const defaultRegion = {
    latitude: 48.8584,
    longitude: 2.2945,
    latitudeDelta: 0.08,
    longitudeDelta: 0.08,
  };
  const iconColor = AppColors[theme].text.default;

  // focus de map bij op de locatie van de gebruiker
  const animateToRegion = useCallback((region) => {
    if (!region || !mapReady) {
      return;
    }

    mapRef.current?.animateToRegion(region, 1000);
  }, [mapReady]);

  // haal huidige locatie op
  const getCurrentLocationRegion = useCallback(async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      return null;
    }

    const location = await Location.getCurrentPositionAsync({});

    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.3,
      longitudeDelta: 0.3,
    };
  }, []);

  // focus de map op de locatie van de gebruiker nadat op de knop gedrukt is
  const handleLocateMePress = async () => {
    const region = await getCurrentLocationRegion();

    if (!region) {
      return;
    }

    setCurrentRegion(region);
    animateToRegion(region);
  };

  // open het settings scherm
  const handleSettingsPress = () => {
    router.push('/settingsScreen');
  };

  // bij openen van de app, voor de functies uit die de map focussen op de gebruiker
  useEffect(() => {
    const loadCurrentLocation = async () => {
      const region = await getCurrentLocationRegion();

      if (!region) {
        return;
      }

      setCurrentRegion(region);
      animateToRegion(region);
    };

    loadCurrentLocation();
  }, [animateToRegion, getCurrentLocationRegion]);

  useEffect(() => {
    if (!mapReady) {
      return;
    }

    if (selectedHotSpot) {
      mapRef.current?.animateToRegion({
        latitude: selectedHotSpot.lat,
        longitude: selectedHotSpot.lon,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      }, 1000);
      return;
    }

    if (currentRegion) {
      mapRef.current?.animateToRegion(currentRegion, 1000);
    }
  }, [currentRegion, mapReady, selectedHotSpot]);


  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        onMapReady={() => setMapReady(true)}
        showsUserLocation={true}
        initialRegion={defaultRegion}
      >
        {hotSpots.map((hotSpot) => (
          <Marker
            key={hotSpot.id}
            pinColor={getPinColor(hotSpot)}
            coordinate={{
              latitude: hotSpot.lat,
              longitude: hotSpot.lon,
            }}
            title={hotSpot.title}
            description={hotSpot.description}
          />
        ))}
      </MapView>
      <View style={styles.legend}>
        <Text style={styles.legendTitle}>Legend</Text>
        {Legend.map((item) => (
          <View key={item.type} style={styles.legendRow}>
            <View style={[styles.legendDot, { backgroundColor: getLegendColor(item.type) }]} />
            <Text style={styles.legendText}>{item.label}</Text>
          </View>
        ))}
      </View>
      <Pressable style={styles.settingsButton} onPress={handleSettingsPress} accessibilityRole="button" accessibilityLabel="Open settings">
        <Ionicons name="settings-outline" size={24} color={iconColor} />
      </Pressable>
      <Pressable style={styles.locateButton} onPress={handleLocateMePress} accessibilityRole="button" accessibilityLabel="Center map on my location">
        <Ionicons name="locate" size={24} color={iconColor} />
      </Pressable>
    </View >
  );
}