import { StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './screens/homeScreen';
import HotSpotListScreen from './screens/hotSpotListScreen';
import MapScreen from './screens/mapScreen';
import { HotspotContext } from '../contexts/hotspotContext';
import AppColors from "../styles/theme/colors";
import appStyles from '../styles/screens/app.styles';
import { SafeAreaView } from "react-native-safe-area-context";





export default function App() {
    const Tab = createBottomTabNavigator();
    const [hotSpots, setHotspots] = useState([]);
    const [theme, setTheme] = useState("light");
    const styles = appStyles(theme);

    const getHotspots = async () => {
        try {
            const response = await fetch(
                "https://thomasterpro.github.io/DateHotSpots/hotspots.json"
            );

            const data = await response.json();

            setHotspots(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getHotspots();
    }, []);


    return (
        <SafeAreaView style={styles.screen} edges={['top', 'left', 'right']}>
            <HotspotContext.Provider value={{ hotSpots }}>
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        headerShown: false,
                        tabBarIcon: ({ focused, color, size }) => {
                            let iconName;

                            if (route.name === 'Home') {
                                iconName = focused ? 'home' : 'home-outline';
                            } else if (route.name === 'Map') {
                                iconName = focused ? 'map' : 'map-outline';
                            } else if (route.name === 'HotSpots') {
                                iconName = focused ? 'location' : 'location-outline';
                            }

                            return <Ionicons name={iconName} size={size} color={color} />;
                        },
                    })}
                >
                    <Tab.Screen name="HotSpots" component={HotSpotListScreen} />
                    <Tab.Screen name="Home" component={HomeScreen} />
                    <Tab.Screen name="Map" component={MapScreen} />
                </Tab.Navigator>
                <StatusBar style={AppColors[theme].status} />
            </HotspotContext.Provider>
        </SafeAreaView>
    );
}
