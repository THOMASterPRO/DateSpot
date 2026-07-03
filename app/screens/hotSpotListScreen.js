import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native';
import { useContext } from 'react';
import { appContext } from '@/contexts/appContext';
import HotSpotList from '../../components/HotSpotList';


export default function MapScreen() {
        const { hotSpots } = useContext(appContext);

    return (
        <View style={styles.container}>
            <HotSpotList/>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'stretch',
        justifyContent: 'center',
        padding: 10
    },
    listItem: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 3,
    },
});
