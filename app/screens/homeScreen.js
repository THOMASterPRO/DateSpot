import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native';
import { useContext } from 'react';
import { appContext } from '@/contexts/appContext';
import homeStyles from '../../styles/screens/home.styles';

export default function HomeScreen() {
    const { theme } = useContext(appContext);
    const styles = homeStyles(theme);

    return (
        <View style={styles.container}>
            <View style={styles.titleBox}>
                <Text style={styles.title}>Date Spot Finder</Text>
            </View>
        </View >
    );
}
