import { Text, View } from 'react-native';
import { useContext } from 'react';
import { appContext } from '@/contexts/appContext';
import { useNavigation } from '@react-navigation/native';
import HotSpotList from '../../components/HotSpotList';
import homeStyles from '../../styles/screens/favoritesScreen.styles';

export default function FavoriteScreen() {
    const navigation = useNavigation();
    const { theme, favoriteHotSpots = [] } = useContext(appContext);
    const styles = homeStyles(theme);

    // open het map scherm met de pin van de hotspot die is aangeklikt
    const handlePressItem = (hotSpot) => {
        navigation.navigate('Map', {
            hotSpotId: hotSpot.id,
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.titleBox}>
                <Text style={styles.title}>Favorites</Text>
                <Text style={styles.subtitle}>This is a list of your favorite Date Spots</Text>
            </View>
            <HotSpotList
                data={favoriteHotSpots}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>
                        No favorites yet. Tap the heart on a hotspot to save it.
                    </Text>
                }
                onPressItem={handlePressItem}
            />
        </View >
    );
}
