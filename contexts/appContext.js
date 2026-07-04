import { createContext } from "react";

export const appContext = createContext({
	hotSpots: [],
	favoriteHotSpots: [],
	theme: 'light',
	setTheme: () => {},
	isFavorite: () => false,
	toggleFavorite: () => {},
});