import { View, Text, TouchableOpacity } from 'react-native';
import { useContext } from 'react';
import { appContext } from '@/contexts/appContext';
import AppColors from '../styles/theme/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import settingsScreenStyles from '../styles/screens/settingsScreen.styles';


export default function SettingsScreen() {
    const { theme, setTheme } = useContext(appContext);
    const styles = settingsScreenStyles(theme);
    const colors = AppColors[theme];

    // verander waarde van theme naar dark of light wanneer op de knop wordt gedrukt
    const switchTheme = async () => {
        if (theme === 'light') {
            setTheme('dark');
            await AsyncStorage.setItem('theme', 'dark');
        } else if (theme === 'dark') {
            setTheme('light');
            await AsyncStorage.setItem('theme', 'light');
        }
    };


    return (
        <View style={[styles.container, { backgroundColor: colors.app.bg }]}>
            <View style={styles.content}>
                <TouchableOpacity
                    style={styles.option}
                    onPress={switchTheme}
                >
                    <Text style={styles.optionText}>Switch Theme</Text>
                    <View style={styles.themeBlock}>
                        <Text style={styles.themeText}>{theme}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}