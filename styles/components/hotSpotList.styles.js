import { StyleSheet } from "react-native";
import AppColors from "../theme/colors.js";


const hotSpotListStyles = (theme) => {
  const appColor =  AppColors[theme];

  return StyleSheet.create({
	listContent: {
		padding: 12,
		gap: 10,
	},
	item: {
		backgroundColor: appColor.li.bg,
		borderRadius: 14,
		padding: 14,
		borderWidth: 1,
		borderColor: appColor.li.border,
		gap: 8,
	},
	itemPressed: {
		opacity: 0.92,
	},
	itemHeader: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		justifyContent: 'space-between',
		gap: 12,
	},
	textContainer: {
		gap: 4,
		flex: 1,
	},
	title: {
		fontSize: 18,
		fontWeight: '700',
        color: appColor.text.default
	},
	description: {
		fontSize: 14,
		color: appColor.li.description,
	},
	coordinates: {
		fontSize: 12,
		color: appColor.li.coords,
	},
	favoriteButton: {
		padding: 8,
		borderRadius: 999,
		backgroundColor: appColor.li.favoriteBgMuted,
	},
	favoriteButtonActive: {
		backgroundColor: appColor.li.favoriteBg,
	},
	favoriteButtonPressed: {
		opacity: 0.8,
	},
	emptyText: {
		textAlign: 'center',
		color: appColor.li.empty,
		marginTop: 24,
	},
  })
};

export default hotSpotListStyles;