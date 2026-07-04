import { StyleSheet, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { appContext } from '@/contexts/appContext';
import HotSpotList from '../../components/HotSpotList';
import hotSpotListScreenStyles from '../../styles/screens/hotspotListScreen.styles';

export default function HotSpotListScreen() {
    const navigation = useNavigation();
    const { theme = [] } = useContext(appContext);
    const styles = hotSpotListScreenStyles(theme);

    // open het map scherm met de pin van de hotspot die is aangeklikt
    const handlePressItem = (hotSpot) => {
        navigation.navigate('Map', {
            hotSpotId: hotSpot.id,
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.titleBox}>
                <Text style={styles.title}>Date Spots</Text>
                <Text style={styles.subtitle}>These are all hotspots from Thomas Date idea google maps list</Text>
            </View>
            <HotSpotList onPressItem={handlePressItem} />
        </View>
    );
}
