import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native';
import { useContext } from 'react';


export default function HomeScreen() {

    return (
        <View style={styles.container}>
             <View style={styles.titleBox}>
                    <Text style={styles.title}>Date Spot Finder</Text>
                </View>
            <View style={styles.listItem}>
                <Text style={styles.product}>hallo</Text>
                <Text style={styles.price}>test</Text>
            </View>
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
