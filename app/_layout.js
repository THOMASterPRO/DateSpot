import { Stack } from "expo-router";
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { appContext } from '../contexts/appContext';
import AppColors from '../styles/theme/colors';

// definieer keys voor storage
const FAVORITES_STORAGE_KEY = 'datespot:favorites';
const THEME_STORAGE_KEY = 'datespot:theme';

export default function RootLayout() {
  const [hotSpots, setHotspots] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [favoritesLoaded, setFavoritesLoaded] = useState(false);
  const [theme, setTheme] = useState('light');

  // haal hotspots op van webservice d.m.v. fetch
  useEffect(() => {
    const loadHotspots = async () => {
      try {
        const response = await fetch('https://thomasterpro.github.io/DateHotSpots/hotspots.json');
        const data = await response.json();
        setHotspots(data);
      } catch (error) {
        console.log(error);
      }
    };

    loadHotspots();
  }, []);

  // haal favorieten lijst uit localstorage op
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem(FAVORITES_STORAGE_KEY);

        if (storedFavorites) {
          const parsedFavorites = JSON.parse(storedFavorites);

          if (Array.isArray(parsedFavorites)) {
            setFavoriteIds(parsedFavorites.map(String));
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setFavoritesLoaded(true);
      }
    };

    loadFavorites();
  }, []);

  // haal thema uit localstorage op
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);

        if (storedTheme === 'light' || storedTheme === 'dark') {
          setTheme(storedTheme);
        }
      } catch (error) {
        console.log(error);
      }
    };

    loadTheme();
  }, []);

  // sla favorieten op in localstorage
  useEffect(() => {
    if (!favoritesLoaded) {
      return;
    }

    const saveFavorites = async () => {
      try {
        await AsyncStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoriteIds));
      } catch (error) {
        console.log(error);
      }
    };

    saveFavorites();
  }, [favoriteIds, favoritesLoaded]);

  // update favorieten lijst als een item niet meer favoriet is
  const toggleFavorite = (hotSpotId) => {
    const favoriteId = String(hotSpotId);

    setFavoriteIds((currentFavoriteIds) => {
      if (currentFavoriteIds.includes(favoriteId)) {
        return currentFavoriteIds.filter((id) => id !== favoriteId);
      }

      return [...currentFavoriteIds, favoriteId];
    });
  };

  const isFavorite = (hotSpotId) => favoriteIds.includes(String(hotSpotId));

  const favoriteHotSpots = hotSpots.filter((hotSpot) => isFavorite(hotSpot.id));
  const setAppTheme = async (nextTheme) => {
    setTheme(nextTheme);
    await AsyncStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  };
  const colors = AppColors[theme];

  return (
    <appContext.Provider value={{ hotSpots, favoriteHotSpots, theme, setTheme: setAppTheme, isFavorite, toggleFavorite }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="settingsScreen"
          options={{
            headerShown: true,
            title: 'Settings',
            headerStyle: {
              backgroundColor: colors.app.bg,
            },
            headerTintColor: colors.text.default,
            headerTitleStyle: {
              fontWeight: '700',
            },
            headerShadowVisible: false,
            headerTitleAlign: 'center',
          }}
        />
      </Stack>
    </appContext.Provider>
  );
}
