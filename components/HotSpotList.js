import { useContext } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { appContext } from '../contexts/appContext';
import hotSpotListStyles from '../styles/components/hotSpotList.styles';

export default function HotSpotList({ data, onPressItem, ListEmptyComponent }) {
	const { theme = [] } = useContext(appContext);
	const styles = hotSpotListStyles(theme);
	const { hotSpots = [], isFavorite = () => false, toggleFavorite } = useContext(appContext);
	const listData = data ?? hotSpots;

	return (
		<FlatList
			data={listData}
			keyExtractor={(item) => String(item.id)}
			contentContainerStyle={styles.listContent}
			renderItem={({ item }) => (
				<Pressable
					style={({ pressed }) => [styles.item, pressed && styles.itemPressed]}
					onPress={() => onPressItem?.(item)}
				>
					<View style={styles.itemHeader}>
						<View style={styles.textContainer}>
							<Text style={styles.title}>{item.title}</Text>
							<Text style={styles.description}>{item.description}</Text>
						</View>
						<Pressable
							hitSlop={8}
							accessibilityRole="button"
							accessibilityLabel={isFavorite(item.id) ? 'Remove from favorites' : 'Add to favorites'}
							onPress={(event) => {
								event.stopPropagation?.();
								toggleFavorite?.(item.id);
							}}
							style={({ pressed }) => [
								styles.favoriteButton,
								isFavorite(item.id) && styles.favoriteButtonActive,
								pressed && styles.favoriteButtonPressed,
							]}
						>
							<Ionicons
								name={isFavorite(item.id) ? 'heart' : 'heart-outline'}
								size={20}
								color={isFavorite(item.id) ? '#ff2222' : '#ff9797'}
							/>
						</Pressable>
					</View>
					<Text style={styles.coordinates}>
						{item.lat}, {item.lon}
					</Text>
				</Pressable>
			)}
			ListEmptyComponent={
				ListEmptyComponent ?? (
					<Text style={styles.emptyText}>No hot spots available.</Text>
				)
			}
		/>
	);
}