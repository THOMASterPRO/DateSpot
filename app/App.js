import { useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import FavoriteScreen from './screens/FavoriteScreen';
import HotSpotListScreen from './screens/hotSpotListScreen';
import MapScreen from './screens/mapScreen';
import { appContext } from '../contexts/appContext';
import AppColors from "../styles/theme/colors";
import appStyles from '../styles/screens/app.styles';
import { SafeAreaView } from "react-native-safe-area-context";




export default function App() {
    const Tab = createBottomTabNavigator();
    const { theme } = useContext(appContext);
    const styles = appStyles(theme);


    return (
        <SafeAreaView style={styles.screen} edges={['top', 'left', 'right']}>
            <Tab.Navigator
                initialRouteName="Map"
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarStyle: styles.bar,
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Favorites') {
                            iconName = focused ? 'heart' : 'heart-outline';
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
                <Tab.Screen name="Map" component={MapScreen} />
                <Tab.Screen name="Favorites" component={FavoriteScreen} />
            </Tab.Navigator>
            <StatusBar style={AppColors[theme].status} />
        </SafeAreaView>
    );
}
