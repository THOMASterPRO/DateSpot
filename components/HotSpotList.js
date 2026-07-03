import { useContext } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { HotspotContext } from '../contexts/hotspotContext';

export default function HotSpotList({ data, onPressItem, ListEmptyComponent }) {
	const { hotSpots = [] } = useContext(HotspotContext);
	const listData = data ?? hotSpots;

	return (
		<FlatList
			data={listData}
			keyExtractor={(item) => String(item.id)}
			contentContainerStyle={styles.listContent}
			renderItem={({ item }) => (
				<Pressable
					style={styles.item}
					onPress={() => onPressItem?.(item)}
				>
					<View style={styles.textContainer}>
						<Text style={styles.title}>{item.title}</Text>
						<Text style={styles.description}>{item.description}</Text>
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

const styles = StyleSheet.create({
	listContent: {
		padding: 12,
		gap: 10,
	},
	item: {
		backgroundColor: '#fff',
		borderRadius: 14,
		padding: 14,
		borderWidth: 1,
		borderColor: '#e5e5e5',
		gap: 8,
	},
	textContainer: {
		gap: 4,
	},
	title: {
		fontSize: 18,
		fontWeight: '700',
	},
	description: {
		fontSize: 14,
		color: '#555',
	},
	coordinates: {
		fontSize: 12,
		color: '#777',
	},
	emptyText: {
		textAlign: 'center',
		color: '#777',
		marginTop: 24,
	},
});
