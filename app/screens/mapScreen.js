import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native';
import { useContext } from 'react';
import { HotspotContext } from '@/contexts/hotspotContext';
import HotSpotList from '../../components/HotSpotList';
import MapView, { Marker } from 'react-native-maps';



export default function MapScreen() {
  const { hotSpots = [] } = useContext(HotspotContext);
  const firstHotSpot = hotSpots[0];

    return (
        <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: firstHotSpot ? firstHotSpot.lat : 48.8584,
          longitude: firstHotSpot ? firstHotSpot.lon : 2.2945,
          latitudeDelta: 0.08,
          longitudeDelta: 0.08,
        }}
      >
        {hotSpots.map((hotSpot) => (
          <Marker
            key={hotSpot.id}
            coordinate={{
              latitude: hotSpot.lat,
              longitude: hotSpot.lon,
            }}
            title={hotSpot.title}
            description={hotSpot.description}
          />
        ))}
      </MapView>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
